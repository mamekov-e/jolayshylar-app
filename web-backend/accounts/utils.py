from rest_framework_simplejwt.tokens import AccessToken

from accounts.models import User


def getUserByToken(request):
    token = request.headers['Authorization'].split(' ')[1]
    access_token_obj = AccessToken(token)

    user_id = access_token_obj['user_id']
    if User.objects.filter(id__exact=user_id).count() > 0:
        user = User.objects.get(id__exact=user_id)
    else:
        user = "Unknown User"
    return user
