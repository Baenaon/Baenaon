from django.urls import path
from .views import AddressSpreadFBV, AddressPostsView

urlpatterns = [
    path('', AddressSpreadFBV.as_view(), name='address-spread-fbv'),
    path('<int:pk>/posts/', AddressPostsView.as_view(), name='address-posts'),
]