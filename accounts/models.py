
from django.db import models
from django.contrib.auth.models import User

class Query(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='queries')
    question = models.TextField()
    response = models.TextField(blank=True, null=True)  
    created_at = models.DateTimeField(auto_now_add=True)
    is_answered = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.user.email} - {self.created_at.strftime('%Y-%m-%d %H:%M')}"


class EmailConfirmation(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    is_confirmed = models.BooleanField(default=False)
    confirmation_token = models.CharField(max_length=100, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
