from rest_framework import serializers
from user.models import User
from .models import Post, Comment

class PostCreateSerializer(serializers.ModelSerializer):
    writer = serializers.ReadOnlyField(source='user.nickname')

    class Meta:
        model   = Post
        fields  = ['title', 'writer', 'content', 'category']

class PostListSerializer(serializers.ModelSerializer):
    writer = serializers.ReadOnlyField(source='user.nickname')
    comments_count = serializers.SerializerMethodField()
    addressname= serializers.CharField(source='address.addressname')

    class Meta:
        model = Post
        fields = ['id', 'title', 'writer', 'category', 'created_at', 'updated_at', 'comments_count', 'addressname']

    def get_comments_count(self, obj):
        comments = Comment.objects.filter(post_id=obj.id)
        # comments_count = {
          #      'comments_count':len(comments)
           #     }
        comments_count = len(comments)
        return comments_count



class PostDetailSerializer(serializers.ModelSerializer):
    writer = serializers.ReadOnlyField(source='user.nickname')
    comments = serializers.SerializerMethodField()

    def get_comments(self, obj):
        comments = [{
                    'user':User.objects.get(id=comment.user_id).nickname,
                    'content':comment.content,
                    'created_at':comment.created_at,
                    'updated_at':comment.updated_at,
                } for comment in Comment.objects.filter(post_id=obj.id)]
        return comments

    class Meta:
        model = Post
        fields = ['id', 'title', 'writer', 'category', 'content', 'updated_at', 'comments']


class CommentSerializer(serializers.ModelSerializer):
    writer = serializers.ReadOnlyField(source='user.nickname')

    class Meta:
        model = Comment
        fields = ['id', 'writer', 'content', 'created_at', 'updated_at']