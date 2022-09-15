from django.contrib import admin
from django.contrib.auth import get_user_model
from django.contrib.auth.admin import UserAdmin

from post.models import Post, Comment
from .models import User


@admin.register(User)
class UserAdminConfig(UserAdmin):
    model = User
    list_display = ('email', 'id', 'nickname', 'address', 'is_active', 'is_staff', 'is_superuser')
    ordering = ('-date_joined',)

