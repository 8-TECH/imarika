from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    ArticleViewSet,
    UpcomingEventsAPIView,
    PastEventsAPIView,
    ContactMessageViewSet,
    CreateEventWithImages,
)

router = DefaultRouter()
router.register(r'articles', ArticleViewSet)
router.register(r'contact', ContactMessageViewSet)

urlpatterns = [
    path('api/', include(router.urls)),
    path('events/upcoming/', UpcomingEventsAPIView.as_view(), name='upcoming-events'),
    path('events/past/', PastEventsAPIView.as_view(), name='past-events'),
    path('events/create-with-images/', CreateEventWithImages.as_view(), name='create-event-with-images'),
]
