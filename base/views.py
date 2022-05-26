from turtle import clone
from django.shortcuts import render
from django.http import HttpResponse
from .models import Skill,Level,Pagelist,Project,Tutorial
from account.models import User

def index(req):
    user = User.objects.get(id=1)
    level = Level.objects.filter()
    context = {'levels':level,'user':user}
    return render(req,'base/index.html',context)


def about(req):
    user = User.objects.get(id=1)
    skill = Skill.objects.filter()
    context = {'user':user,'skills':skill}
    return render(req,'base/about.html',context)

def projects(req):
    user = User.objects.get(id=1)
    project = Project.objects.filter()
    num = project.count()
    newproject = get_project(project)
    print(newproject)
    # proj = list()
    # for p in project:
    #     pr = p   
    #     skills = p.skills.all()
    #     li =[sk.skills for sk in skills ]
    #     pr['skils'] = li
    #     proj.append(pr)
        
    
    context = {'user':user,'projects':newproject,'num':num}
    return render(req,'base/project.html',context)

def get_project(project):
    newproject = []
    for item in project:
        obj = {}
        obj['name']= item.name
        obj['site']= item.site
        obj['github']= item.github
        obj['project_image']= item.project_image
        obj['description']= item.description
        skill = item.skills.all()
        skills =[item.skills for item in skill ]
        obj['skills'] = skills
        newproject.append(obj)

    return newproject

    
def page_not_found_view(request, exception,*args,**kwarys):
    return render(request, '404/404.html', status=404)

def server_error(request, *args,**kwarys):
    return render(request, '404/404.html', status=500)
# Create your views here.

# Create your views here.
