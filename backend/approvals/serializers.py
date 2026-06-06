from rest_framework import serializers
from .models import Approval

class ApprovalSerializer(serializers.ModelSerializer):
    class Meta:
        model = Approval
        fields = '__all__'
        read_only_fields = ['id', 'manager', 'approved_at']
