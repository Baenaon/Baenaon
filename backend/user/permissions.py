from rest_framework import permissions


class IsOwner(permissions.BasePermission):

    def has_object_permission(self, request, view, obj):
        # 요청자(request.user)가 객체(Blog)의 user와 동일한지 확인
        return obj.id == request.user.id