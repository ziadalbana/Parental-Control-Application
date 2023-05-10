class JWTAuthentication():
    def authenticate(self, request):
        auth_header = request.headers.get('Authorization')

        if not auth_header:
            return None

        try:
            _, token = auth_header.split()
            payload = jwt.decode(token, settings.SECRET_KEY, algorithms=['HS256'])
            username = payload.get('username')
            user = User.objects.filter(userName=username).first()
            
            if not user:
                return None
            
            return True
        except:
            return None