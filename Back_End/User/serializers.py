from django.contrib.auth.hashers import make_password
from rest_framework import serializers
from .models import User, History


class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['id',
                  'userName',
                  'email',
                  'password',
                  'removeAdultTweets',
                  'removeAdultImages',
                  'enforceSafeSearch',
                  'blockedKeyWords',
                  'blockedLinks']

    def create(self, validated_data):
        password = validated_data.pop('password')
        hashed_password = make_password(password)
        user = User.objects.create(password=hashed_password, **validated_data)
        return user


class HistorySerializer(serializers.ModelSerializer):
    class Meta:
        model = History
        fields = ['id',
                  'userName',
                  'word',
                  'timestamp']
