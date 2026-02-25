from django.urls import path
from . import views
from .views import delete_item
urlpatterns = [
    path("items/", views.get_items),
    path("items/<int:id>/", views.get_item),
    path("users/<int:id>/", views.get_user),
    path("login/", views.login_user),
    path("items/create/", views.create_item),
    path('items/delete/<int:pk>/', delete_item),
]

