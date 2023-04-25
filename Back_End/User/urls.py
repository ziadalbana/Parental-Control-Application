from django.urls import path
from .views import SignUp, SignIn, BlockedLinks
from .ai_model import AIModel

urlpatterns = [
    path('signup/', SignUp.as_view()),
    path('checkusername/<str:username>/', SignUp.as_view()),
    path('signin/', SignIn.as_view()),
    path('checkadult/<str:text>/', AIModel.as_view()),
    path('users/blocked-links/<str:username>/', BlockedLinks.as_view()),



]
