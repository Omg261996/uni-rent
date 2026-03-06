from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import AllowAny
from .models import Item, User
from .serializers import ItemSerializer, UserSerializer
from rest_framework import status
from .models import Item
from .models import BookingRequest, Item

# ---------------- LOGIN ----------------
@api_view(["POST"])
@permission_classes([AllowAny])
def login_user(request):

    username=request.data.get("username")
    password=request.data.get("password")

    if not username or not password:
        return Response({"error": "Username and password required"}, status=400)

    user = authenticate(request, username=username, password=password)

    if user is not None:
        refresh = RefreshToken.for_user(user)
        return Response({
            "token": str(refresh.access_token),
            "username": user.username
        })

    return Response({"error": "Invalid credentials"}, status=401)


# ---------------- GET ALL ITEMS ----------------
@api_view(["GET"])
def get_items(request):
    items = Item.objects.all().order_by("-created_at")
    serializer = ItemSerializer(items, many=True)
    return Response(serializer.data)


# ---------------- GET SINGLE ITEM ----------------
@api_view(["GET"])
def get_item(request, id):
    item = Item.objects.get(id=id)
    serializer = ItemSerializer(item)
    return Response(serializer.data)


# ---------------- CREATE ITEM ----------------
@api_view(["POST"])
@permission_classes([IsAuthenticated])
def create_item(request):
    serializer = ItemSerializer(data=request.data)

    if serializer.is_valid():
        serializer.save(owner=request.user)
        return Response(serializer.data, status=201)
    return Response(serializer.errors, status=400)


# ---------------- GET USER PROFILE ----------------
@api_view(["GET"])
def get_user(request, id):
    user = User.objects.get(id=id)
    serializer = UserSerializer(user)
    return Response(serializer.data)

#------------------- delete --------------

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_item(request, pk):
    try:
        item = Item.objects.get(pk=pk)

        if item.owner != request.user:
            return Response({"error": "Not allowed"}, status=403)

        item.delete()
        return Response({"message": "Item deleted"}, status=200)

    except Item.DoesNotExist:
        return Response({"error": "Item not found"}, status=404)
    

# ----------- REQUEST BOOKING ------------

@api_view(["POST"])
@permission_classes([IsAuthenticated])
def request_booking(request, item_id):
    try:
        item = Item.objects.get(id=item_id)

        # item available check
        if not item.is_available:
            return Response({"error": "Item not available"}, status=400)

        # owner khud request nahi kar sakta
        if item.owner == request.user:
            return Response({"error": "You cannot book your own item"}, status=400)

        # duplicate request check
        existing = BookingRequest.objects.filter(
            item=item,
            requester=request.user,
            status="pending"
        )

        if existing.exists():
            return Response({"error": "Request already sent"}, status=400)

        booking = BookingRequest.objects.create(
            item=item,
            requester=request.user
        )

        return Response({
            "message": "Booking request sent"
        }, status=201)

    except Item.DoesNotExist:
        return Response({"error": "Item not found"}, status=404)