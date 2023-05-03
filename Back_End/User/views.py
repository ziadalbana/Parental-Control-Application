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

# Create your views here.
class SignUp(APIView):
    def post(self, request):
        print("SignUp", flush=True)
        user_data = JSONParser().parse(request)
        print(user_data)
        serializer = UserSerializer(data=user_data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request, username: str):
        user = User.objects.filter(userName=username).first()
        if user is not None:
            return Response({'exists': True})
        return Response({'exists': False})


class SignIn(APIView):
    def post(self, request):
        print("SignIn", flush=True)
        username = request.data.get('userName')
        plaintext_password = request.data.get('password')
        user = User.objects.filter(userName=username).first()
        print(username,plaintext_password)

        if user is None:
            return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)

        if not check_password(plaintext_password, user.password):
            return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)

        serializer = UserSerializer(user)
        return Response(serializer.data)


@api_view(['PATCH'])
def update_blocked_links(request, username):
    try:
        user = User.objects.get(userName=username)
    except User.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    blocked_links = request.data.get('blockedLinks')
    if not blocked_links:
        return Response({'error': 'blockedLinks is required'}, status=status.HTTP_400_BAD_REQUEST)

    user.blockedLinks = blocked_links
    user.save()

    serializer = UserSerializer(user)
    return Response(serializer.data)

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
