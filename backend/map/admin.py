from django.contrib import admin

from post.models import Post
from .models import Address

@admin.register(Address)
class UserAdminConfig(admin.ModelAdmin):
    model = Address
    list_display = ('addressname', 'locationName', 'post_count')
    list_display_links = ['locationName']
    search_fields = ['locationName', 'addressname']
    def post_count(self, address):
        pc = Post.objects.filter(address_id=address.id)
        return len(pc)
    ordering = ('-addressname',)