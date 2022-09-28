from django.urls import path

from .views import UserSignIn, UserSignUp, MypageList, BlacklistTokenView, MypageComment, MypagePost, kakao_login, kakao_callback

from rest_framework_simplejwt import views as jwt_views

app_name = 'users'

urlpatterns = [
        # 로그인
        path('signin/', UserSignIn.as_view(), name='user-signin'),
        # 회원가입
        path('signup/', UserSignUp.as_view(), name='user-signup'),
        # 마이페이지
        path('mypage/', MypageList.as_view(), name='user-mypage'),
        # 로그아웃
        path('logout/', BlacklistTokenView.as_view()),
        path('refresh/', jwt_views.TokenRefreshView.as_view()),
        path('mypage/comments/', MypageComment.as_view()),
        path('mypage/posts/', MypagePost.as_view()),
        path('login/kakao/', kakao_login, name='kakao_login'),
        path('login/kakao/callback/', kakao_callback),
]