from rest_framework import serializers
from django.contrib.auth import get_user_model

User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'email', 'full_name', 'role', 'phone', 'created_at']
        read_only_fields = ['id', 'created_at', 'role']  # Prevent changing role via normal profile updates

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True, style={'input_type': 'password'})

    class Meta:
        model = User
        fields = ['email', 'full_name', 'role', 'phone', 'password']

    def create(self, validated_data):
        # We can optionally limit who can create an Admin user in a real app
        user = User.objects.create_user(
            email=validated_data['email'],
            password=validated_data['password'],
            full_name=validated_data['full_name'],
            role=validated_data.get('role', User.Role.PROCUREMENT_OFFICER),
            phone=validated_data.get('phone', '')
        )
        return user
