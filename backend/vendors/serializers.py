from rest_framework import serializers
from .models import Vendor
import re

class VendorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Vendor
        fields = '__all__'
        read_only_fields = ['id', 'created_at', 'updated_at']

    def validate_gst_number(self, value):
        # Basic GST format validation (e.g., Indian GST format: 22AAAAA0000A1Z5)
        # We'll just check if it's alphanumeric and length is roughly around standard lengths
        # Adjust regex as per exact regional requirements
        if not re.match(r'^[A-Z0-9]{15}$', value.upper()):
            raise serializers.ValidationError("GST number must be exactly 15 alphanumeric characters.")
        return value.upper()

    def validate_phone(self, value):
        # Ensure phone only contains digits and optional leading +
        if not re.match(r'^\+?1?\d{9,15}$', value):
            raise serializers.ValidationError("Phone number must be entered in the format: '+999999999'. Up to 15 digits allowed.")
        return value
