from django.contrib.auth.hashers import check_password
from django.http import JsonResponse
from rest_framework.decorators import api_view
from rest_framework.parsers import JSONParser
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import UserSerializer
from .models import User
import torch
from django.conf import settings
from .preprocessing import *
import jwt
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.permissions import IsAuthenticated


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
            payload = {'username': username}
            token = jwt.encode(payload, settings.SECRET_KEY, algorithm='HS256')
            return JsonResponse({'token': token.decode()})
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
        return JsonResponse({'token': token.decode()})


class UserDetails(APIView):
    @api_view(['GET'])
    @permission_classes([IsAuthenticated])
    def get(self, request, username):
        user = User.objects.filter(userName=username).first()
        if not user:
            return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)
        else:
            serializer = UserSerializer(user)
            return Response(serializer.data, status=status.HTTP_200_OK)


class EnforceSafeSearch(APIView):
    @api_view(['PUT'])
    @permission_classes([IsAuthenticated])
    def patch(self, request, username):
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
    @api_view(['PUT'])
    @permission_classes([IsAuthenticated])
    def patch(self, request, username):
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
    @api_view(['PUT'])
    @permission_classes([IsAuthenticated])
    def patch(self, request, username):
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
    @api_view(['PUT'])
    @permission_classes([IsAuthenticated])
    def patch(self, request, username):
        user = User.objects.filter(userName=username).first()
        if not user:
            return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)

        blocked_links = request.data.get('blockedLinks')

        user.blockedLinks = blocked_links
        user.save()

        # serializer = UserSerializer(user)
        return Response({'result': 'True'}, status=status.HTTP_200_OK)


class BlockedKeyWords(APIView):
    @api_view(['PUT'])
    @permission_classes([IsAuthenticated])
    def patch(self, request, username):
        user = User.objects.filter(userName=username).first()
        if not user:
            return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)

        blocked_keywords = request.data.get('blockedKeyWords')
        user.blockedKeyWords = blocked_keywords
        user.save()

        # serializer = UserSerializer(user)
        return Response({'result': 'True'}, status=status.HTTP_200_OK)


class model_predict(APIView):
    # def post(self, request):
    #     model = settings.GLOBAL_MODEL
    #     tokenizer=settings.GLOBAL_TOKENIZER
    #     tweet = request.data.get('tweet')
    #     tweet=preprocess(tweet)
    #     tweets=[]
    #     tweets.append(tweet)
    #     texts = list(tweets)
    #     # Tokenize the test data
    #     test_input_ids = []
    #     test_attention_masks = []
    #     for text in texts:
    #         encoded_dict = tokenizer.encode_plus(text,
    #                                              add_special_tokens=True,
    #                                              max_length=64,
    #                                              pad_to_max_length=True,
    #                                              return_attention_mask=True,
    #                                              return_tensors='pt')
    #         test_input_ids.append(encoded_dict['input_ids'])
    #         test_attention_masks.append(encoded_dict['attention_mask'])
    #
    #     # Convert the input ids and attention masks to tensors
    #     test_input_ids = torch.cat(test_input_ids, dim=0)
    #     test_attention_masks = torch.cat(test_attention_masks, dim=0)
    #     all_preds = []
    #     with torch.no_grad():
    #         for i in range(0, len(test_input_ids), 32):
    #             batch_input_ids = test_input_ids[i:i + 32]
    #             batch_attention_masks = test_attention_masks[i:i + 32]
    #             logits = model(batch_input_ids, attention_mask=batch_attention_masks)[0]
    #             preds = torch.softmax(logits, dim=1).detach().cpu().numpy()
    #             all_preds.append(preds)
    #
    #     # Concatenate the predictions
    #     all_preds = np.concatenate(all_preds, axis=0)
    #     # Print the predicted probabilities for each class
    #     y_pred = np.argmax(all_preds, axis=1)
    #     return Response(y_pred[0])
    @api_view(['POST'])
    @permission_classes([IsAuthenticated])
    def post(self, request):
        model = settings.GLOBAL_MODEL
        tokenizer = settings.GLOBAL_TOKENIZER
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
        return JsonResponse({'predicted_class': predicted_class})
