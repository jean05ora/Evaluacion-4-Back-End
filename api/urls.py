from django.urls import path, include
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from . import views

urlpatterns = [
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('', views.index, name='index'),
    path('con_token/', views.token, name='con_token'),
    path('producto/', views.producto, name='producto'),
    path('productos/', views.productos, name='productos'),
]
