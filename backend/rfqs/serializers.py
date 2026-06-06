from rest_framework import serializers
from .models import RFQ
from django.utils import timezone

class RFQSerializer(serializers.ModelSerializer):
    class Meta:
        model = RFQ
        fields = '__all__'
        read_only_fields = ['id', 'created_by', 'created_at', 'updated_at']

    def validate_deadline(self, value):
        if value < timezone.now():
            raise serializers.ValidationError("The deadline cannot be set in the past.")
        return value
