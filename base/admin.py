from django.contrib import admin
from .models import Skill,Level,Pagelist,Project,Tutorial


# class LevelAdmin(UserAdmin):
#     list_display = ('education','levels','started_at','updated_at')
#     search_fields = ('education','levels')
#     readonly_fields = ()
#     filter_horizontal =()
#     list_filter =()
#     filedset = ()



admin.site.register(Skill)
admin.site.register(Level)
admin.site.register(Pagelist)
admin.site.register(Project)
admin.site.register(Tutorial)