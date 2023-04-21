from django.urls import path
from .import views

urlpatterns = [
    path('', views.student),
    path('<int:pk>/', views.student_detail),
    path('update/<int:pk>/', views.update_student)
]