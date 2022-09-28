from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.utils import timezone
from django.utils.translation import gettext_lazy as _
from post.models import Post


class UserManager(BaseUserManager):

    def create_user(self, email, nickname, address, password):

        if not email:
            raise ValueError('must have user email')

        if not nickname:
            raise ValueError('must have user nickname')

        user = self.model(
            email=self.normalize_email(email),
            nickname=nickname,
            address=address
        )
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_staff(self, email, nickname, address, password):
        user = self.create_user(
            email,
            nickname=nickname,
            address=address,
            password=password

        )
        user.is_staff = True
        user.save(using=self._db)
        return user


    def create_superuser(self, email, nickname, address, password):
        user = self.create_user(
                email,
                nickname = nickname,
                address = address,
                password = password
                )
        user.is_staff = True
        user.is_superuser = True
        user.save(using=self._db)
        return user


class User(AbstractBaseUser,  PermissionsMixin):
    LOGIN_EMAIL = "email"
    LOGIN_NAVER = "naver"
    LOGIN_KAKAO = "kakao"

    LOGIN_CHOICES = (
        (LOGIN_EMAIL, _("Email")),
        (LOGIN_NAVER, _("Naver")),
        (LOGIN_KAKAO, _("Kakao")),
    )

    email = models.CharField(
        verbose_name='email',
        max_length=100,
        unique=True
    )

    nickname = models.CharField(
        verbose_name='nickname',
        max_length=50,
        unique=True
    )
    address = models.CharField(
        verbose_name='address',
        max_length=200,
        default=""
    )

    login_method = models.CharField(
        max_length=6, choices=LOGIN_CHOICES, default=LOGIN_EMAIL
    )

    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)

    date_joined = models.DateTimeField(default=timezone.now)


    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['nickname', 'address']

    objects = UserManager()

    class Meta:
        db_table = 'users'