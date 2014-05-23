from activity.models import TodoList
from rest_framework import serializers


class TodoListSerializer(serializers.ModelSerializer):
    class Meta:
        model = TodoList
        fields = ('id', 'created', 'difficulty', 'done', 'name', 'onhold',
                  'priority', 'progress', 'updated', 'user',)
