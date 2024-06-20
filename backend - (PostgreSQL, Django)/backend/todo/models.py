from django.db import models


class Todo(models.Model):
    title = models.CharField(max_length=255, null=False)
    description = models.TextField(blank=True, null=True)
    finished = models.BooleanField(default=False)
    deadline = models.DateTimeField(null=True, blank=True)

    def __str__(self):
        return self.title
