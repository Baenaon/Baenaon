from django.contrib.auth import get_user_model
import requests
from django.contrib.auth.models import update_last_login
from django.http import JsonResponse
from django.shortcuts import redirect
from django.views import View

from rest_framework import generics, status
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.token_blacklist.models import OutstandingToken, BlacklistedToken
from rest_framework_simplejwt.tokens import RefreshToken

import my_settings
from .serializers import UserSignInSerializer, UserSignUpSerializer, MypageListSerializer, MypageCommentsSerializer, MypagePostsSerializer

from user.models import User
from post.models import Post, Comment

from .permissions import IsOwner

from my_settings import KAKAO_REST_API_KEY, KAKAO_REDIRECT_URI, KAKAO_API



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

def kakao_login(request):
    client_id = my_settings.KAKAO_REST_API_KEY
    redirect_uri = "http://127.0.0.1:8000/api/user/login/kakao/callback/"
    return redirect(
        f"https://kauth.kakao.com/oauth/authorize?client_id={client_id}&redirect_uri={redirect_uri}&response_type=code&scope=account_email"
    )

def kakao_callback(request):
    client_id = my_settings.KAKAO_REST_API_KEY
    code = request.GET.get("code")
    redirect_uri = "http://127.0.0.1:8000/api/user/login/kakao/callback/"
    token_request = requests.get(
        f"https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id={client_id}&redirect_uri={redirect_uri}&code={code}"
    )
    token_json = token_request.json()

    kakao_access_token = token_json.get("access_token")
    # refresh_token = token_json.get("refresh_token")

    profile_request = requests.post(
        "https://kapi.kakao.com/v2/user/me",
        headers={"Authorization": f"Bearer {kakao_access_token}"},
    )
    profile_json = profile_request.json()
    kakao_account = profile_json.get("kakao_account")
    email = kakao_account.get("email", None)

    if email is None:
        return JsonResponse({'err_msg': 'failed to get email'}, status=status.HTTP_400_BAD_REQUEST)
    nickname = kakao_account.get("profile").get("nickname")
    profile_image = kakao_account.get("profile").get("thumbnail_image_url")

    try:
        user = get_user_model().objects.get(email=email)
        if user.login_method == 'kakao':
            token = TokenObtainPairSerializer.get_token(user)
            refresh_token = str(token)
            access_token = str(token.access_token)
            update_last_login(None, user)
            results = {
                'id': user.id,
                'email': email,
                'refresh_token': refresh_token,
                'access_token': access_token
            }
            return JsonResponse(results, status = status.HTTP_200_OK)
    except get_user_model().DoesNotExist:
        user = get_user_model().objects.create(
            email=email,
            nickname=nickname,
            address='',
            login_method='kakao',
        )
        user.set_unusable_password()
        user.save()

        token = TokenObtainPairSerializer.get_token(user)
        refresh_token = str(token)
        access_token = str(token.access_token)
        update_last_login(None, user)

        results = {
            'id': user.id,
            'email': email,
            'refresh_token': refresh_token,
            'access_token': access_token
        }
        return JsonResponse(results, status=status.HTTP_201_CREATED)
    else:
        return JsonResponse({'message':'user already exist'}, status=status.HTTP_400_BAD_REQUEST)

