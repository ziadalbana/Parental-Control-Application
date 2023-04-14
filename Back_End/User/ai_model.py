from rest_framework.views import APIView
from rest_framework.response import Response


# Create your views here.


def check(text):
    return True


class AIModel(APIView):
    def get(self, request, text: str):
        is_adult = check(text)

        return Response({'isAdult': is_adult})
