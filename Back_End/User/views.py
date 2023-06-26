from django.contrib.auth.hashers import check_password
import time
from rest_framework.parsers import JSONParser
from rest_framework import status
from .serializers import UserSerializer, HistorySerializer
from .models import User, History
import torch
from django.conf import settings
from .preprocessing import *
import jwt
from .auth import JWTAuthentication
from rest_framework.views import APIView
from rest_framework.response import Response
from concurrent.futures import ThreadPoolExecutor
from django.http import JsonResponse
from .classical_models import *


# m1 = loadM1()
# m2=loadM2()
# Create your views here.
class SignUp(APIView):
    def post(self, request):
        user_data = JSONParser().parse(request)

        username = user_data.get('userName', None)

        if username is not None:
            # Check if the username already exists
            if User.objects.filter(userName=username).first() is not None:
                return Response({'result': 'False'}, status=status.HTTP_200_OK)

        serializer = UserSerializer(data=user_data)
        if serializer.is_valid():
            serializer.save()
            History.objects.create(userName=username, word=[], timestamp=[])
            payload = {'username': username}
            token = jwt.encode(payload, settings.SECRET_KEY, algorithm='HS256')
            return JsonResponse({'result': 'True', 'token': token})
        return Response({'result': 'False'}, status=status.HTTP_200_OK)


class SignIn(APIView):
    def post(self, request):
        print("SignIn", flush=True)
        print(request)
        user_data = JSONParser().parse(request)
        username = user_data.get('userName', None)
        plaintext_password = user_data.get('password', None)
        user = User.objects.filter(userName=username).first()
        print(username, plaintext_password)

        if user is None:
            return Response({'result': 'False'}, status=status.HTTP_200_OK)

        if not check_password(plaintext_password, user.password):
            return Response({'result': 'False'}, status=status.HTTP_200_OK)

        payload = {'username': username}
        token = jwt.encode(payload, settings.SECRET_KEY, algorithm='HS256')
        return JsonResponse({'result': 'True', 'token': token})


class UserDetails(APIView):
    def get(self, request, username):
        jwt_auth = JWTAuthentication()
        isAuthenticated = jwt_auth.authenticate(request)

        if not isAuthenticated:
            return Response({'result': 'False'}, status=status.HTTP_401_UNAUTHORIZED)

        user = User.objects.filter(userName=username).first()
        if not user:
            return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)
        else:
            serializer = UserSerializer(user)
            return Response(serializer.data, status=status.HTTP_200_OK)


class EnforceSafeSearch(APIView):
    def patch(self, request, username):
        jwt_auth = JWTAuthentication()
        isAuthenticated = jwt_auth.authenticate(request)

        if not isAuthenticated:
            return Response({'result': 'False'}, status=status.HTTP_401_UNAUTHORIZED)

        user = User.objects.filter(userName=username).first()
        if not user:
            return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)

        enforce_safe_search = request.data.get('enforceSafeSearch')
        # if not enforce_safe_search:
        #     return Response({'error': 'Enforce safe search not provided'}, status=status.HTTP_400_BAD_REQUEST)

        user.enforceSafeSearch = enforce_safe_search
        user.save()

        return Response({'result': 'True'}, status=status.HTTP_200_OK)


class RemoveAdultTweets(APIView):
    def patch(self, request, username):
        jwt_auth = JWTAuthentication()
        isAuthenticated = jwt_auth.authenticate(request)

        if not isAuthenticated:
            return Response({'result': 'False'}, status=status.HTTP_401_UNAUTHORIZED)
        user = User.objects.filter(userName=username).first()
        if not user:
            return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)

        remove_adult_tweets = request.data.get('removeAdultTweets')
        # if not remove_adult_tweets:
        #     return Response({'error': 'Remove adult tweets not provided'}, status=status.HTTP_400_BAD_REQUEST)

        user.removeAdultTweets = remove_adult_tweets
        user.save()

        return Response({'result': 'True'}, status=status.HTTP_200_OK)


class RemoveAdultImages(APIView):
    def patch(self, request, username):
        jwt_auth = JWTAuthentication()
        isAuthenticated = jwt_auth.authenticate(request)

        if not isAuthenticated:
            return Response({'result': 'False'}, status=status.HTTP_401_UNAUTHORIZED)
        user = User.objects.filter(userName=username).first()
        if not user:
            return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)

        remove_adult_images = request.data.get('removeAdultImages')
        print(remove_adult_images)
        # if remove_adult_images is not None:
        #     return Response({'error': 'Remove adult images not provided'}, status=status.HTTP_400_BAD_REQUEST)

        user.removeAdultImages = remove_adult_images
        user.save()

        return Response({'result': 'True'}, status=status.HTTP_200_OK)


class BlockedLinks(APIView):
    def patch(self, request, username):
        jwt_auth = JWTAuthentication()
        isAuthenticated = jwt_auth.authenticate(request)

        if not isAuthenticated:
            return Response({'result': 'False'}, status=status.HTTP_401_UNAUTHORIZED)
        user = User.objects.filter(userName=username).first()
        if not user:
            return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)

        blocked_links = request.data.get('blockedLinks')

        user.blockedLinks = blocked_links
        user.save()

        # serializer = UserSerializer(user)
        return Response({'result': 'True'}, status=status.HTTP_200_OK)


class BlockedKeyWords(APIView):
    def patch(self, request, username):
        jwt_auth = JWTAuthentication()
        isAuthenticated = jwt_auth.authenticate(request)

        if not isAuthenticated:
            return Response({'result': 'False'}, status=status.HTTP_401_UNAUTHORIZED)
        user = User.objects.filter(userName=username).first()
        if not user:
            return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)

        blocked_keywords = request.data.get('blockedKeyWords')
        user.blockedKeyWords = blocked_keywords
        user.save()

        # serializer = UserSerializer(user)
        return Response({'result': 'True'}, status=status.HTTP_200_OK)


class HistoryView(APIView):
    def patch(self, request, username):
        jwt_auth = JWTAuthentication()
        isAuthenticated = jwt_auth.authenticate(request)

        if not isAuthenticated:
            return Response({'result': 'False'}, status=status.HTTP_401_UNAUTHORIZED)

        history = History.objects.filter(userName=username).first()
        if not history:
            return Response({'error': 'History not found'}, status=status.HTTP_404_NOT_FOUND)

        word = request.data.get('word')
        timestamp = request.data.get('timestamp')

        history.word.append(word)
        history.timestamp.append(timestamp)

        history.save()

        return Response({'result': 'True'}, status=status.HTTP_200_OK)

    def get(self, request, username):
        jwt_auth = JWTAuthentication()
        isAuthenticated = jwt_auth.authenticate(request)

        if not isAuthenticated:
            return Response({'result': 'False'}, status=status.HTTP_401_UNAUTHORIZED)

        history = History.objects.filter(userName=username).first()

        if not history:
            return Response({'error': 'History not found'}, status=status.HTTP_404_NOT_FOUND)
        else:
            serializer = HistorySerializer(history)
            return Response(serializer.data, status=status.HTTP_200_OK)


class ModelPredict(APIView):
    def post(self, request):
        start_time = time.time()
        jwt_auth = JWTAuthentication()
        isAuthenticated = jwt_auth.authenticate(request)

        if not isAuthenticated:
            return Response({'result': 'False'}, status=status.HTTP_401_UNAUTHORIZED)

        model = settings.GLOBAL_MODEL
        tokenizer = settings.GLOBAL_TOKENIZER

        def predict():
            tweet = request.data.get('tweet')
            tweet = preprocess(tweet)
            # Tokenize the test data
            encoded_text = tokenizer.encode_plus(
                tweet,
                max_length=128,
                padding='max_length',
                truncation=True,
                return_attention_mask=True,
                return_tensors='pt'
            )
            with torch.no_grad():
                logits = model(**encoded_text)[0]
            predicted_class = torch.argmax(logits).item()
            return predicted_class

        # Create a thread pool with a specific number of threads
        num_threads = 4  # Adjust this value based on your requirements
        with ThreadPoolExecutor(max_workers=num_threads) as executor:
            # Submit the prediction task to the thread pool
            future = executor.submit(predict)

            # Wait for the prediction task to complete and get the result
            predicted_class = future.result()
        end_time = time.time()
        request_time = end_time - start_time
        print(request_time)
        return JsonResponse({'predicted_class': predicted_class})

# class ModelPredictClassical(APIView):
#     def post(self, request):
#         start_time = time.time()
#         jwt_auth = JWTAuthentication()
#         isAuthenticated = jwt_auth.authenticate(request)
#
#         if not isAuthenticated:
#             return Response({'result': 'False'}, status=status.HTTP_401_UNAUTHORIZED)
#         tweet = request.data.get('tweet')
#         tweet = preprocess(tweet)
#         predict=m2.predict([tweet])[0]
#         end_time = time.time()
#         request_time = end_time - start_time
#         print(request_time)
#         return JsonResponse({'predicted_class': int(predict)^ 1})
