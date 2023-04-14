from django.contrib.auth.hashers import check_password
from rest_framework.parsers import JSONParser
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import UserSerializer
from .models import User


# Create your views here.
class SignUp(APIView):
    def post(self, request):
        print("SignUp", flush=True)
        user_data = JSONParser().parse(request)
        serializer = UserSerializer(data=user_data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class SignIn(APIView):
    def post(self, request):
        print("SignIn", flush=True)
        username = request.data.get('userName')
        plaintext_password = request.data.get('password')
        user = User.objects.filter(userName=username).first()

        if user is None:
            return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)

        if not check_password(plaintext_password, user.password):
            return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)

        serializer = UserSerializer(user)
        return Response(serializer.data)

