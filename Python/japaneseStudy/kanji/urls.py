from django.urls import path, include
from rest_framework import routers
from .views import KanjiViewSet

router = routers.DefaultRouter()
router.register(r'kanji',KanjiViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
