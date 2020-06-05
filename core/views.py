from django.shortcuts import render
from django.http import HttpResponseRedirect, HttpResponse

from .forms import TagsForm
from .utils import csv_to_list


def index(request):
    print("hi")
    return render(request, 'index.html')


def chatroom(request):
    return render(request, 'chatroom.html')


def view_tags(request):
    if request.method == "POST":
        form = TagsForm(request.POST or None)  # , extra=extra_additives)
        if form.is_valid():
            tags_list = csv_to_list(form.cleaned_data['tags'])

        else:
            return HttpResponse(form.errors)
    else:
        form = TagsForm()
        return render(request, 'index.html', {'form': form})
