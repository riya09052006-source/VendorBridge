from rest_framework import viewsets, filters
from rest_framework.permissions import IsAuthenticated
from django_filters.rest_framework import DjangoFilterBackend
from .models import Vendor
from .serializers import VendorSerializer

class VendorViewSet(viewsets.ModelViewSet):
    """
    A ViewSet for viewing and editing vendor instances.
    Provides GET (list, retrieve), POST, PUT, PATCH, and DELETE out of the box.
    """
    queryset = Vendor.objects.all().order_by('-created_at')
    serializer_class = VendorSerializer
    permission_classes = [IsAuthenticated]
    
    # Enable search and filtering
    filter_backends = [filters.SearchFilter, DjangoFilterBackend]
    
    # Search configuration (e.g. ?search=Company)
    search_fields = ['company_name']
    
    # Filter configuration (e.g. ?category=IT)
    filterset_fields = ['category', 'status']
