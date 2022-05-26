import uuid
from django.db import models
from django.contrib.auth.models import AbstractUser

def get_profile_image(self,filename):
	return 'profile_images/' + str(self.pk) + f'/{uuid.uuid4}.png'

def get_default_profile_image():
	return "codingwithmitch/default_profile_image.png"

class User(AbstractUser):
    email 					= models.EmailField(verbose_name="email", max_length=60, unique=True)
    name 				= models.CharField(max_length=30,null=True,blank=True)
    bio                  	= models.TextField(null=True, blank=True)
    profile_image			= models.ImageField(max_length=255, upload_to=get_profile_image, null=True, blank=True, default=get_default_profile_image)


    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []
# Create your models here.
