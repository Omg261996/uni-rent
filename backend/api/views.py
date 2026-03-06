from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework import status
from .models import Item, User, BookingRequest
from .serializers import ItemSerializer, UserSerializer, RegisterSerializer, BookingSerializer


# ---------------- REGISTER ----------------
@api_view(["POST"])
@permission_classes([AllowAny])
def register_user(request):
    serializer = RegisterSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.save()
        refresh = RefreshToken.for_user(user)
        return Response({
            "token": str(refresh.access_token),
            "username": user.username
        }, status=201)
    return Response(serializer.errors, status=400)


# ---------------- LOGIN ----------------
@api_view(["POST"])
@permission_classes([AllowAny])
def login_user(request):
    username = request.data.get("username")
    password = request.data.get("password")

    if not username or not password:
        return Response({"error": "Username and password required"}, status=400)

    user = authenticate(request, username=username, password=password)
    if user is not None:
        refresh = RefreshToken.for_user(user)
        return Response({
            "token": str(refresh.access_token),
            "username": user.username,
            "user_id": user.id
        })
    return Response({"error": "Invalid credentials"}, status=401)


# ---------------- GET ALL ITEMS ----------------
@api_view(["GET"])
@permission_classes([AllowAny])
def get_items(request):
    items = Item.objects.all().order_by("-created_at")
    serializer = ItemSerializer(items, many=True)
    return Response(serializer.data)


# ---------------- GET SINGLE ITEM ----------------
@api_view(["GET"])
@permission_classes([AllowAny])
def get_item(request, id):
    try:
        item = Item.objects.get(id=id)
        serializer = ItemSerializer(item)
        return Response(serializer.data)
    except Item.DoesNotExist:
        return Response({"error": "Item not found"}, status=404)


# ---------------- CREATE ITEM ----------------
@api_view(["POST"])
@permission_classes([IsAuthenticated])
def create_item(request):
    serializer = ItemSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save(owner=request.user)
        return Response(serializer.data, status=201)
    return Response(serializer.errors, status=400)


# ---------------- UPDATE ITEM ----------------
@api_view(["PUT", "PATCH"])
@permission_classes([IsAuthenticated])
def update_item(request, pk):
    try:
        item = Item.objects.get(pk=pk)
        if item.owner != request.user:
            return Response({"error": "Not allowed"}, status=403)
        serializer = ItemSerializer(item, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=400)
    except Item.DoesNotExist:
        return Response({"error": "Item not found"}, status=404)


# ---------------- DELETE ITEM ----------------
@api_view(["DELETE"])
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


# ---------------- GET USER PROFILE ----------------
@api_view(["GET"])
@permission_classes([AllowAny])
def get_user(request, id):
    try:
        user = User.objects.get(id=id)
        serializer = UserSerializer(user)
        return Response(serializer.data)
    except User.DoesNotExist:
        return Response({"error": "User not found"}, status=404)


# ---------------- MY ITEMS ----------------
@api_view(["GET"])
@permission_classes([IsAuthenticated])
def my_items(request):
    items = Item.objects.filter(owner=request.user).order_by("-created_at")
    serializer = ItemSerializer(items, many=True)
    return Response(serializer.data)


# ---------------- REQUEST BOOKING ----------------
@api_view(["POST"])
@permission_classes([IsAuthenticated])
def request_booking(request, item_id):
    try:
        item = Item.objects.get(id=item_id)

        if not item.is_available:
            return Response({"error": "Item not available"}, status=400)

        if item.owner == request.user:
            return Response({"error": "You cannot book your own item"}, status=400)

        existing = BookingRequest.objects.filter(
            item=item, requester=request.user, status="pending"
        )
        if existing.exists():
            return Response({"error": "Request already sent"}, status=400)

        # start_date aur end_date request body se lena
        start_date = request.data.get("start_date")
        end_date = request.data.get("end_date")

        if not start_date or not end_date:
            return Response({"error": "start_date and end_date required"}, status=400)

        booking = BookingRequest.objects.create(
            item=item,
            requester=request.user,
            start_date=start_date,
            end_date=end_date
        )
        return Response({"message": "Booking request sent", "booking_id": booking.id}, status=201)

    except Item.DoesNotExist:
        return Response({"error": "Item not found"}, status=404)


# ---------------- MY BOOKING REQUESTS (as renter) ----------------
@api_view(["GET"])
@permission_classes([IsAuthenticated])
def my_bookings(request):
    bookings = BookingRequest.objects.filter(requester=request.user).order_by("-created_at")
    serializer = BookingSerializer(bookings, many=True)
    return Response(serializer.data)


# ---------------- INCOMING REQUESTS (owner dekhe apne items pe) ----------------
@api_view(["GET"])
@permission_classes([IsAuthenticated])
def incoming_requests(request):
    bookings = BookingRequest.objects.filter(
        item__owner=request.user
    ).order_by("-created_at")
    serializer = BookingSerializer(bookings, many=True)
    return Response(serializer.data)


# ---------------- APPROVE / REJECT BOOKING ----------------
@api_view(["POST"])
@permission_classes([IsAuthenticated])
def respond_booking(request, booking_id):
    try:
        booking = BookingRequest.objects.get(id=booking_id)

        if booking.item.owner != request.user:
            return Response({"error": "Not allowed"}, status=403)

        action = request.data.get("action")  # "approve" or "reject"

        if action == "approve":
            booking.status = "approved"
            booking.item.is_available = False
            booking.item.save()
            # Baaki pending requests reject kar do same item ke liye
            BookingRequest.objects.filter(
                item=booking.item, status="pending"
            ).exclude(id=booking.id).update(status="rejected")
            booking.save()
            return Response({"message": "Booking approved"})

        elif action == "reject":
            booking.status = "rejected"
            booking.save()
            return Response({"message": "Booking rejected"})

        else:
            return Response({"error": "Invalid action. Use 'approve' or 'reject'"}, status=400)

    except BookingRequest.DoesNotExist:
        return Response({"error": "Booking not found"}, status=404)