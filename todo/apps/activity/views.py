from activity.forms import TodoListCompleteForm
from activity.forms import TodoListForm
from activity.models import TodoList
from django.core.urlresolvers import reverse_lazy
from django.views.generic.edit import CreateView
from django.views.generic.edit import DeleteView
from django.views.generic.detail import DetailView
from django.views.generic.edit import UpdateView
from django.views.generic.list import ListView


class TodoListListView(ListView):

    context_object_name = 'todolists'
    model = TodoList
    paginate_by = 10
    template_name = 'activity/todolist_list.html'

    def get_context_data(self, **kwargs):
        context = super(TodoListListView, self).get_context_data(**kwargs)
        form = TodoListForm()
        form_update = TodoListCompleteForm()
        context.update({'form': form})
        context.update({'form_update': form_update})
        return context

todolist_list_view = TodoListListView.as_view()


class TodoListCreateView(CreateView):

    fields = ('name',)
    form_class = TodoListForm
    model = TodoList
    success_url = reverse_lazy('activity:todo-list')
    template_name = 'activity/todolist_list.html'

todolist_create_view = TodoListCreateView.as_view()


class TodoListDeleteView(DeleteView):

    model = TodoList
    success_url = reverse_lazy('activity:todo-list')
    template_name = 'activity/todolist_list.html'

todolist_delete_view = TodoListDeleteView.as_view()


class TodoListUpdateView(UpdateView):

    fields = ('name',)
    form_class = TodoListForm
    model = TodoList
    success_url = reverse_lazy('activity:todo-list')
    template_name = 'activity/todolist_list.html'


todolist_update_view = TodoListUpdateView.as_view()


class TodoListDetailView(DetailView):

    model = TodoList
    template_name = 'activity/todolist_list.html'


todolist_detail_view = TodoListDetailView.as_view()
