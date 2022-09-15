from django.urls import path
from .views import CommentCreate, CommentDetail, PostCreate, PostDetail, PostList, UserPostsList, UserCommentsList, CategorySearchListView

app_name = 'posts'

urlpatterns = [
        # 게시글 생성
        path('create/', PostCreate.as_view(), name='post-create'),
        # 게시글(pk에 해당하는 게시글) 보기
        path('<int:pk>/', PostDetail.as_view(), name='post-detail'),
        # pk에 해당하는 댓글보기 ,수정, 삭제
        path('<int:pk>/comments/', CommentDetail.as_view(), name='post-comment'),
        # 게시글(pk에 해당하는 게시글)에 댓글 하나 생성
        path('<int:pk>/comments/create/', CommentCreate.as_view(), name='post-comment-create'),
        # 게시글들 목록
        path('', PostList.as_view(), name='post-list'),
        # 내가 쓴글 확인
        path('user/', UserPostsList.as_view(), name='user-posts'),
        # 내가 쓴 댓글 확인
        path('user/comments/', UserCommentsList.as_view(), name='user-comments'),
        # 카테고리별 검색
        path('search/category/', CategorySearchListView.as_view(), name='search-category'),
]