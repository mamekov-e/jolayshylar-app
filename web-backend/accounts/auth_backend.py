
from accounts.models import User


class MyAuth:
    def authenticate(id=None):
        try:
            return User.objects.get(id=id)
        except User.DoesNotExist:
            return None

    def get_user(user_id):
        try:
            return User.objects.get(pk=user_id)
        except User.DoesNotExist:
            return None