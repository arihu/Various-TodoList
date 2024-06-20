from django.urls import path
from .views import TodoViewset

urlpatterns = [
    path('todo/', TodoViewset.as_view()),
    path('todo/<int:id>', TodoViewset.as_view())
]