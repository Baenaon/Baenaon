from django.contrib import admin

from user.models import User
from .models import Comment, Post



@admin.register(Post)
class PostAdminConfig(admin.ModelAdmin):
    model = Post
    list_display = ('address', 'category', 'title', 'nickname', 'created_at')
    list_display_links = ['title']

    def nickname(self, post):
        qs = User.objects.get(email=post.user).nickname
        return f'{qs}({post.user})'
    ordering = ('-address',)

@admin.register(Comment)
class CommentAdminConfig(admin.ModelAdmin):
    model = Comment
    list_display = ('postname', 'nickname', 'content', 'created_at')
    list_display_links = ['content']

    def nickname(self, post):
        qs = User.objects.get(email=post.user).nickname
        return f'{qs}({post.user})'
    def postname(self, comment):
        qs = Post.objects.get(id=comment.post.id)
        return qs.title
    ordering = ('-post',)
