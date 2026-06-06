from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import VendorViewSet

# Create a router and register our viewsets with it.
router = DefaultRouter()
router.register(r'', VendorViewSet, basename='vendor')

# The API URLs are now determined automatically by the router.
urlpatterns = [
    path('', include(router.urls)),
]
