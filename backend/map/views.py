from django.http import JsonResponse

from rest_framework import status
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework.views import APIView

from post.models import Post, Comment
from user.models import User
from .models import Address


class AddressSpreadFBV(APIView):
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get(self, request):
        try:
            useraddress = User.objects.get(pk=request.user.id).address
            addresses = Address.objects.all()

            result = [
                {
                    'id' : address.id,
                    'addressname' : address.addressname,
                    'locationname': address.locationName,
                    'lat':address.lat,
                    'long':address.long,
                    'post_count': len(Post.objects.filter(address_id=address.id))
                } for address in addresses
            ]

            return JsonResponse({'address': result, 'useraddress':useraddress}, status=status.HTTP_200_OK)
        except KeyError:
            return JsonResponse({'message': 'KEY_ERROR'}, stauts=status.HTTP_400_BAD_REQUEST)


class AddressPostsView(APIView):
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get(self, request, pk):
        try:
            address_instance = Address.objects.get(id=pk)
            post_queryset = Post.objects.filter(address=address_instance)

            address = [
                {
                    'addressname' : address_instance.addressname,
                    'locationname' : address_instance.locationName,
                }
            ]

            posts = [
                {
                    'id' : post.id,
                    'title' : post.title,
                    'writer' : post.user.nickname,
                    'category' : post.category,
                    'created_at' : post.created_at,
                    'updated_at' : post.updated_at,
                    'comments_count':len(Comment.objects.filter(post_id=post.id))
                } for post in post_queryset
            ]

            return JsonResponse({'address': address, 'posts':posts}, status=status.HTTP_200_OK)
        except KeyError:
            return JsonResponse({'message': 'KEY_ERROR'}, stauts=status.HTTP_400_BAD_REQUEST)