#!/bin/sh

#mkdir securityeventsexplorer
#cd securityeventsexplorer

#django-admin.py startproject securityeventsexplorer .
python manage.py migrate --no-input
#python manage.py startapp app_see

python manage.py collectstatic --no-input

gunicorn securityeventsexplorer.wsgi:application --bind 0.0.0.0:8000

