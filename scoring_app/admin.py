from django.contrib import admin
from .models import Teams, Players, TeamMatches, Matches, Games

# Register your models here.
admin.site.register(Teams)
admin.site.register(Players)
admin.site.register(TeamMatches)
admin.site.register(Matches)
admin.site.register(Games)
