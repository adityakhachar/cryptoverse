from rest_framework import viewsets, permissions
from rest_framework.response import Response
from rest_framework.decorators import action
from .models import Query
from .serializers import QuerySerializer

class QueryViewSet(viewsets.ModelViewSet):
    serializer_class = QuerySerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Query.objects.filter(user=self.request.user).order_by('-created_at')

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    @action(detail=False, methods=['get'])
    def my_queries(self, request):
        user_queries = self.get_queryset()
        serializer = self.get_serializer(user_queries, many=True)
        return Response(serializer.data)
