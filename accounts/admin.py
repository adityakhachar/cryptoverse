from django.contrib import admin
from .models import Query, EmailConfirmation

@admin.register(Query)
class QueryAdmin(admin.ModelAdmin):
    list_display = ('user', 'question', 'created_at', 'is_answered', 'response')  
    list_filter = ('created_at', 'is_answered')
    search_fields = ('user__username', 'question')
    fields = ('user', 'question',  'is_answered', 'created_at','response')  
    readonly_fields = ('created_at',)  

@admin.register(EmailConfirmation)
class EmailConfirmationAdmin(admin.ModelAdmin):
    list_display = ('user', 'is_confirmed', 'confirmation_token', 'created_at')
    list_filter = ('is_confirmed',)
    search_fields = ('user__email',)
