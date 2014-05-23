from activity.models import TodoList
from activity.serializers import TodoListSerializer
from rest_framework.generics import ListCreateAPIView
from rest_framework.generics import RetrieveUpdateDestroyAPIView


class TodoListAPIListCreateView(ListCreateAPIView):
    queryset = TodoList.objects.all()
    serializer_class = TodoListSerializer


class TodoListAPIDetailView(RetrieveUpdateDestroyAPIView):
    model = TodoList
    serializer_class = TodoListSerializer


todolistapilistcreateview = TodoListAPIListCreateView.as_view()
todolistapidetailview = TodoListAPIDetailView.as_view()
