from django.db import models


# Create your models here.

class User(models.Model):
    userName = models.CharField(max_length=255)
    password = models.CharField(max_length=255)
    email = models.EmailField()
    removeAdultTweets = models.BooleanField(default=False)
    removeAdultImages = models.BooleanField(default=False)
    enforceSafeSearch = models.BooleanField(default=False)
    blockedKeyWords = models.JSONField(default=list, blank=True)
    blockedLinks = models.JSONField(default=list, blank=True)
