from activity.forms import ItemForm
from activity.models import Item
from django.core.urlresolvers import reverse_lazy
from django.views.generic.base import TemplateView
from django.views.generic.edit import CreateView
from django.views.generic.edit import DeleteView
from django.views.generic.edit import UpdateView
from django.views.generic.list import ListView


class IndexView(TemplateView):
    template_name = 'activity/index.html'

indexview = IndexView.as_view()


class ItemListView(ListView):

    context_object_name = 'items'
    model = Item
    paginate_by = 10
    template_name = 'activity/item_list.html'

    def get_context_data(self, **kwargs):
        context = super(ItemListView, self).get_context_data(**kwargs)
        form = ItemForm()
        context.update({'form': form})
        return context

item_list_view = ItemListView.as_view()


class ItemCreateView(CreateView):

    fields = ('name',)
    form_class = ItemForm
    model = Item
    success_url = reverse_lazy('list')
    template_name = 'activity/item_list.html'

    def get_context_data(self, **kwargs):
        context = super(ItemCreateView, self).get_context_data(**kwargs)
        items = Item.objects.all()
        context.update({'items': items})
        return context

item_create_view = ItemCreateView.as_view()


class ItemDeleteView(DeleteView):

    model = Item
    success_url = reverse_lazy('list')
    template_name = 'activity/item_list.html'

item_delete_view = ItemDeleteView.as_view()


class ItemUpdateView(UpdateView):

    fields = ('name',)
    form_class = ItemForm
    model = Item
    success_url = reverse_lazy('list')
    template_name = 'activity/item_list.html'


item_update_view = ItemUpdateView.as_view()
