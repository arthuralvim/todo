from django.conf.urls import patterns
from django.conf.urls import url


urlpatterns = patterns(
    '',
    url(r'^$', 'activity.views.todolist_list_view', name='todo-list'),
    url(r'^todo/create$', 'activity.views.todolist_create_view',
        name='todo-create'),
    url(r'^todo/delete/(?P<pk>\d+)/$', 'activity.views.todolist_delete_view',
        name='todo-delete'),
    url(r'^todo/update/(?P<pk>\d+)/$', 'activity.views.todolist_update_view',
        name='todo-update'),
    url(r'^todo/(?P<pk>\d+)/$', 'activity.views.todolist_detail_view',
        name='todo-detail'),
    url(r'^api/todo/$', 'activity.api.todolistapilistcreateview',
        name='todo-api-lc', ),
    url(r'^api/todo/(?P<pk>\d+)/$', 'activity.api.todolistapidetailview',
        name='todo-api-rud', ),

)
