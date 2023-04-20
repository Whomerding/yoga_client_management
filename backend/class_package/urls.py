from django.urls import path
from .import views

urlpatterns = [
    path('', views.class_list),
    path('<int:pk>/', views.class_detail)
]