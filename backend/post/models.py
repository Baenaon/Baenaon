from django.db import models
from map.models import Address
from django.conf import settings

class Post(models.Model):

    user    = models.ForeignKey(
                settings.AUTH_USER_MODEL,
                related_name = 'users',
                on_delete    = models.CASCADE,
            )
    title   = models.CharField(
                verbose_name = 'title',
                max_length   = 200,
            )
    category = models.CharField(
        verbose_name='category',
        max_length = 20,
        default='음식'
    )
    address = models.ForeignKey(
        Address,
        related_name='addresses',
        on_delete=models.CASCADE,
        default=1,
    )
    content = models.CharField(
                verbose_name = 'content',
                max_length   = 2000,
            )

    created_at = models.DateTimeField(
                verbose_name = 'created at',
                auto_now_add = True,
            )
    updated_at = models.DateTimeField(
                verbose_name = 'updated at',
                auto_now     = True
            )
    counting = models.IntegerField(
        default=0
    )


    def __str__(self):
        return self.title


    class Meta:
        db_table = 'posts'

class Comment(models.Model):
    user       = models.ForeignKey(
                'user.User',
                verbose_name = 'users',
                on_delete    = models.CASCADE
            )
    post       = models.ForeignKey(
                Post,
                verbose_name = 'posts',
                on_delete    = models.CASCADE
            )
    content    = models.CharField(
                verbose_name = 'contents',
                max_length   = 500,
            )
    created_at = models.DateTimeField(
                verbose_name = 'created at',
                auto_now_add = True,
            )
    updated_at = models.DateTimeField(
                verbose_name = 'updated at',
                auto_now     = True
            )

    def __str__(self):
        return self.content
    class Meta:
        db_table = 'comments'