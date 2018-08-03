from django.shortcuts import render

from django.http import HttpResponse
import json


def index(request):
    data2="{type: 'line', data: { labels: [1500,1600,1700,1750,1800,1850,1900,1950,1999,2050], datasets: [{ data: [86,114,106,106,107,111,133,221,783,2478], label: 'Bolívar', borderColor: '#3e95cd', fill: false}, { data: [282,350,411,502,635,809,947,1402,3700,5267], label: 'Boyacá', borderColor: '#8e5ea2',fill: false }, {  data: [168,170,178,190,203,276,408,547,675,734],label: 'Caquetá', borderColor: '#3cba9f', fill: false}, { data: [40,20,10,16,24,38,74,167,508,784], label: 'Bogotá', borderColor: '#e8c3b9', fill: false }, {  data: [6,3,2,2,7,26,82,172,312,433], label: 'Amazonas', borderColor: '#c45850',fill: false }  ]  }, options: { title: {display: true, text: 'Actividad Sismica'}}}"

    return render(request, 'index.html', {'out':data2})

# Create your views here.
