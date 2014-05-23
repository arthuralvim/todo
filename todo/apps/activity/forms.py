from django import forms
from activity.models import TodoList


class TodoListForm(forms.ModelForm):

    class Meta:
        model = TodoList
        fields = ('name',)
