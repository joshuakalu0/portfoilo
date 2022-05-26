import uuid
from django.db import models
from .timemodel import Times
class Skill(Times):
    skills              = models.CharField(max_length=50,blank=True,null=True)
    grade_level         = models.IntegerField(blank=True,null=True)

    def __str__(self):
        return f'{self.skills} {self.grade_level}'


class Level(Times):
    education           = models.CharField(max_length=50,default='')
    levels              = models.IntegerField(default=0)

    def __str__(self):
        return self.education +' '+ str(self.levels) + '%'

class Pagelist(models.Model):
    page                =models.CharField(max_length=150,blank=True,null=True)
    # path=models.CharField(max_length=150,blank=True,null=True)

    def __str__(self):
        return str(self.page)


def get_profile_image(self,filename):
	return 'project_images/' + str(self.pk) + f'/{uuid.uuid4}.png'


class Project(Times):
    name                    = models.CharField(max_length=50,blank=True,null=True)
    skills                  = models.ManyToManyField(Skill, related_name='skill', blank=True)
    site                    = models.URLField(max_length=300,blank=True,null=True)
    github                  = models.URLField(max_length=300,blank=True,null=True)
    project_image			= models.ImageField(max_length=255, upload_to=get_profile_image, null=True, blank=True)
    description             = models.TextField(blank=True,null=True)

    def __str__(self):
        return self.name 

class Tutorial(Times):
    name                = models.CharField(max_length=50,blank=True,null=True)
    skill_set              = models.ManyToManyField(Skill, related_name='skill_set', blank=True)
    link                = models.URLField(max_length=300,blank=True,null=True)
    choic               = (
        ('br','beginner'),
        ('im','intermediate'),
        ('ad','advance'),
    )
    difficulty          = models.CharField(max_length=50,choices=choic,blank=True,null=True)
    description         = models.TextField(blank=True,null=True)
    is_active           = models.BooleanField(default=False)

    def __str__(self):
        return self.name +' '+ self.description[0:20] 

# Create your models here.


# Create your models here.
