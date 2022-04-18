from django.shortcuts import render
import logging

logger = logging.getLogger('debug.log')

def security_events_explorer(request):
    return render(request, 'app_see/see.html')

def see_orchestrator(request):
    return render(request, 'app_see/see_orchestrator.html')

