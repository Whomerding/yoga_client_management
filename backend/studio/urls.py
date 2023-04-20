from django.urls import path
from .import views

urlpatterns = [
    path('', views.create_studio),
    path('<int:pk>/', views.studio_detail)
]