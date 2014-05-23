from django.contrib.auth.models import User
from django.db import models
from django.utils.translation import ugettext as _


class TodoList(models.Model):
    created = models.DateTimeField(auto_now_add=True, editable=False)
    difficulty = models.IntegerField(default=0)
    done = models.BooleanField(default=False)
    name = models.CharField(max_length=60)
    onhold = models.BooleanField(default=False)
    priority = models.IntegerField(default=0)
    progress = models.IntegerField(default=0, editable=False)
    updated = models.DateTimeField(auto_now=True, editable=False)
    user = models.ForeignKey(User, blank=True, null=True)

    def __unicode__(self):
        return self.name
