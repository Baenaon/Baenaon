from django.contrib.auth import get_user_model

from rest_framework import generics, status
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.token_blacklist.models import OutstandingToken, BlacklistedToken
from rest_framework_simplejwt.tokens import RefreshToken

from .serializers import UserSignInSerializer, UserSignUpSerializer, MypageListSerializer, MypageCommentsSerializer, MypagePostsSerializer

from user.models import User
from post.models import Post, Comment

from .permissions import IsOwner


class UserSignIn(generics.GenericAPIView):
    queryset = User.objects.all()
    serializer_class = UserSignInSerializer
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = UserSignInSerializer(data=request.data)

        if not serializer.is_valid(raise_exception=True):
            return Response({"message": "Request Body Error."}, status=status.HTTP_409_CONFLICT)

        if serializer.validated_data['email'] == 'None':
            return Response({"message": "fail"}, status=status.HTTP_200_OK)

        return Response(serializer.validated_data, status=status.HTTP_200_OK)

class UserSignUp(generics.CreateAPIView):
    model = get_user_model()
    serializer_class = UserSignUpSerializer
    permission_classes = [AllowAny,]

class BlacklistTokenView(APIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request, *args, **kwargs):
        if self.request.data.get('all'):
            token: OutstandingToken
            for token in OutstandingToken.objects.filter(user=request.user):
                _, _ = BlacklistedToken.objects.get_or_create(token=token)
            return Response({"status": "OK, goodbye, all refresh tokens blacklisted"})
        refresh_token = self.request.data.get('refresh_token')
        token = RefreshToken(token=refresh_token)
        token.blacklist()
        return Response({"status": "OK, goodbye"})

class MypageList(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = MypageListSerializer
    permission_classes = [IsAuthenticated, IsOwner]
    def get_queryset(self):
        queryset = User.objects.filter(id=self.request.user.id)
        return queryset

class MypageComment(generics.ListAPIView):
    serializer_class = MypageCommentsSerializer
    permission_classes = [IsOwner]
    queryset = Comment.objects.all()
    def get_queryset(self):
        queryset = Comment.objects.filter(user_id=self.request.user.id)
        return queryset

class MypagePost(generics.ListAPIView):
    serializer_class = MypagePostsSerializer
    permission_classes = [IsOwner]
    queryset = Post.objects.all()
    def get_queryset(self):
        queryset = Post.objects.filter(user_id=self.request.user.id)
        return queryset
