from rest_framework import generics, status, filters
from rest_framework.permissions import AllowAny, IsAuthenticated, IsAuthenticatedOrReadOnly
from rest_framework.response import Response

from map.models import Address

from .serializers import CommentSerializer, PostCreateSerializer, PostDetailSerializer, PostListSerializer

from .models import Post, Comment
from django.http import JsonResponse

from .permissions import IsOwnerOrReadOnly
from haversine import haversine

class PostCreate(generics.CreateAPIView):
    queryset = Post.objects.all()
    serializer_class = PostCreateSerializer
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        serializer = PostCreateSerializer(data=request.data)
        address = Address.objects.filter(addressname=request.data['address'])

        if serializer.is_valid():
            post = Post.objects.create(
                user_id=request.user.id,
                title=request.data['title'],
                content=request.data['content'],
                category=request.data['category'],
                address=address[0]
            )

            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class PostDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Post.objects.all()
    serializer_class = PostDetailSerializer
    permission_classes = [IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly]

class PostList(generics.ListAPIView):
    queryset = Post.objects.all()
    serializer_class = PostListSerializer
    permission_classes = [AllowAny]
    ordering = ['-updated_at']


class CommentCreate(generics.CreateAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

    def post(self, request, *args, **kwargs):
        serializer = CommentSerializer(data=request.data)

        if serializer.is_valid():
            comment = Comment.objects.create(
                user_id=request.user.id,
                post_id=self.kwargs['pk'],
                content=request.data['content']
            )
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class CommentDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    permission_classes = [IsAuthenticated, IsOwnerOrReadOnly]

class UserPostsList(generics.ListAPIView):
    serializer_class = PostListSerializer
    permission_classes = [IsAuthenticated, IsOwnerOrReadOnly]

    def get_queryset(self):
        user = self.request.user
        if user.is_authenticated:
            return Post.objects.filter(user=user)
        else:
            return Post.objects.none()

class CategorySearchListView(generics.ListAPIView):
    # serializer_class = PostListSerializer
    # queryset = Post.objects.all()
    permission_classes = [AllowAny]
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    # SearchFilter
    search_fields = ['category']
    ordering_fields = ['-updated_at']

    def get(self, request):
        if self.request.user.is_authenticated:
            user = self.request.user
            address = Address.objects.get(addressname=user.address)
            user_lat = address.lat
            user_long = address.long
            result = [{
                'id': post.id,
                'writer': post.user.nickname,
                'title': post.title,
                'category': post.category,
                'content': post.content,
                'created_at': post.created_at,
                'updated_at': post.updated_at,
                'distance': str(round(haversine((user_lat, user_long), (post.address.lat, post.address.long), unit='km'), 2)) + 'km'

            } for post in Post.objects.filter(category=request.GET.get('search'))]
        else:
            result = [{
                'id': post.id,
                'writer': post.user.nickname,
                'title': post.title,
                'category': post.category,
                'content': post.content,
                'created_at': post.created_at,
                'updated_at': post.updated_at,
                'distance': '',
            } for post in Post.objects.filter(category=request.GET.get('search'))]
        result.sort(reverse=True, key=lambda x : x['updated_at'])
        result_2km = []
        for i in range(len(result)):
            if result[i]['distance'] == '':
                return JsonResponse({'result': result}, status=status.HTTP_200_OK)
            else:
                dist = result[i]['distance']
                dist = float(dist[ : len(dist) - 2])
                if dist <= 2:   
                    result_2km.append(result[i])
                
        return JsonResponse({'result': result_2km}, status=status.HTTP_200_OK)
class UserCommentsList(generics.ListAPIView):
    serializer_class = CommentSerializer
    permission_classes = [IsAuthenticated, IsOwnerOrReadOnly]

    def get_queryset(self):
        user = self.request.user
        if user.is_authenticated:
            return Comment.objects.filter(user=user)
        else:
            return Comment.objects.none()

class NearTheUserPosts(generics.ListAPIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        try:
            user = self.request.user
            # 유저의 주소
            user_address = user.address
            # 유저의 주소를 경도, 위도로 변환한 값
            address = Address.objects.get(addressname=user_address)
            user_lat, user_long = address.lat, address.long
            LATMOD = 109.958489129649955
            LONGMOD = 88.74
            addresses = Address.objects.all()
            result = []
            for address in addresses:
                if user_lat - 1/LATMOD <= address.lat <= user_lat + 1/LATMOD and \
                        user_long - 1/LONGMOD <= address.long <= user_long + 1/LONGMOD :
                    user_pos = (user_lat, user_long)
                    user_opp = (address.lat, address.long)
                    dis = str(int(haversine(user_pos, user_opp, unit = 'm'))) + "m"
                    for post in Post.objects.filter(address_id=address.id):
                        if int(dis[:len(dis)-1]) < 1000:
                            result.append({
                                'id': post.id,
                                'writer': post.user.nickname,
                                'title': post.title,
                                'category': post.category,
                                'content': post.content,
                                'created_at': post.created_at,
                                'updated_at': post.updated_at,
                                'distance': dis,

                                })
            if len(result) == 0:
                return JsonResponse({'result':"NoPost"}, status=status.HTTP_200_OK)
            else:
                result.sort(reverse=True, key=lambda x: x["updated_at"])
                return JsonResponse({'result': result}, status=status.HTTP_200_OK)
        except KeyError:
            return JsonResponse({'err_msg': 'KEY_ERROR'}, stauts=status.HTTP_400_BAD_REQUEST)
