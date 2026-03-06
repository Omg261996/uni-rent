from rest_framework import serializers
from .models import Item, User, BookingRequest


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "phone", "branch", "year"]


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ["username", "email", "password", "phone", "branch", "year"]

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user


class ItemSerializer(serializers.ModelSerializer):
    owner = UserSerializer(read_only=True)

    class Meta:
        model = Item
        fields = "__all__"


class BookingSerializer(serializers.ModelSerializer):
    requester = UserSerializer(read_only=True)
    item = ItemSerializer(read_only=True)

    class Meta:
        model = BookingRequest
        fields = ["id", "item", "requester", "start_date", "end_date", "status", "created_at"]