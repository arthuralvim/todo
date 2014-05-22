from activity.views import indexview
from activity.views import item_create_view
from activity.views import item_delete_view
from activity.views import item_list_view
from activity.views import item_update_view
from django.conf.urls import include
from django.conf.urls import patterns
from django.conf.urls import url
from django.contrib import admin
admin.autodiscover()

handler400 = 'todo.errors.bad_request'
handler403 = 'django.views.defaults.permission_denied'
handler404 = 'django.views.defaults.page_not_found'
handler500 = 'todo.errors.server_error'

urlpatterns = patterns(
    '',
    url(r'^$', indexview, name='index'),
    url(r'^lista$', item_list_view, name='list'),
    url(r'^deleta-lista/$', item_delete_view, name='delete'),
    url(r'^atualiza-lista/$', item_update_view, name='update'),
    url(r'^criar-lista$', item_create_view, name='create'),
    url(r'^admin/', include(admin.site.urls)),
)
