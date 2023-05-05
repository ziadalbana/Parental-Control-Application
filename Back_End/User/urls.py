from django.urls import path
from .views import *

urlpatterns = [
    path('signup', SignUp.as_view()),
    path('signin', SignIn.as_view()),
    path('getuser/<str:username>', UserDetails.as_view()),
    path('checkadult', model_predict.as_view()),


]
