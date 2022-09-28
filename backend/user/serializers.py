from django.contrib.auth.models import update_last_login
from django.contrib.auth import authenticate, get_user_model

from rest_framework import serializers
from rest_framework_jwt.settings import api_settings
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.token_blacklist.models import OutstandingToken
from rest_framework_simplejwt.utils import datetime_from_epoch

from post.models import Comment, Post


JWT_PAYLOAD_HANDLER = api_settings.JWT_PAYLOAD_HANDLER
JWT_ENCODE_HANDLER = api_settings.JWT_ENCODE_HANDLER
User = get_user_model()


class UserSignUpSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    class Meta:
        model = User
        fields = ['email', 'nickname', 'address', 'password']
        extra_kwargs = {
            'email': {'required': True},
            'nickname': {'required': True},
            'address': {'required': True},
            'password': {'required': True},
        }

    def create(self, validated_data):
        user = User.objects.create(
            email=validated_data['email'],
            nickname=validated_data['nickname'],
            address=validated_data['address'],
        )
        user.set_password(validated_data['password'])
        user.save()
        return user


class UserSignInSerializer(serializers.Serializer):
    email = serializers.CharField(max_length=64)
    password = serializers.CharField(max_length=128, write_only=True)
    token = serializers.CharField(max_length=255, read_only=True)

    def validate(self, data):
        email = data.get('email', None)
        password = data.get('password', None)

        user = authenticate(email=email, password=password)
        if user is None:
            results = {
                'email': 'None'
            }
            return results

        try:
            token = TokenObtainPairSerializer.get_token(user)
            refresh_token = str(token)
            access_token = str(token.access_token)
            update_last_login(None, user)

        except User.DoesNotExist:
            raise serializers.ValidationError(
                'User with given email and password does not exists'
            )

        results = {
            'id': user.id,
            'email': user.email,
            'refresh_token': refresh_token,
            'access_token': access_token
        }


        return results

class MypageListSerializer(serializers.ModelSerializer):
    len_comments = serializers.SerializerMethodField()
    len_posts = serializers.SerializerMethodField()

    def get_len_comments(self, user):
        comments = len(Comment.objects.filter(user_id=user.id))
        return comments

    def get_len_posts(self, user):
        posts = len(Post.objects.filter(user_id=user.id))
        return posts
    class Meta:
        model = User
        fields = ['email', 'nickname', 'len_comments', 'len_posts', 'address']


class MypageCommentsSerializer(serializers.ModelSerializer):
    user = serializers.ReadOnlyField(source='user.nickname')

    class Meta:
        model = Comment
        fields = ['id', 'user', 'content', 'created_at', 'updated_at']
class MypagePostsSerializer(serializers.ModelSerializer):
    writer = serializers.ReadOnlyField(source='user.nickname')

    class Meta:
        model = Post
        fields = ['id', 'title', 'writer', 'category', 'created_at', 'updated_at']