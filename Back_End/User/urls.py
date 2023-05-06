from django.urls import path
from .views import *

urlpatterns = [
    path('signup', SignUp.as_view()),
    path('signin', SignIn.as_view()),
    path('getuser/<str:username>', UserDetails.as_view()),
    path('blockedlinkes/<str:username>', BlockedLinks.as_view()),
    path('blockedkeywords/<str:username>', BlockedKeyWords.as_view()),
    path('enforcesafesearch/<str:username>', EnforceSafeSearch.as_view()),
    path('removetweets/<str:username>', RemoveAdultTweets.as_view()),
    path('removeimages/<str:username>', RemoveAdultImages.as_view()),
    path('checkadult', model_predict.as_view()),


]
