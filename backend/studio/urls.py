from django.urls import path
from .import views

urlpatterns = [
    path('', views.create_studio),
    path('<int:pk>/', views.studio_detail),
    path('update/<int:pk>/', views.update_studio)
]