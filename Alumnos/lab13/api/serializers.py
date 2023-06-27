from rest_framework import serializers
from .models import *

# Serializador para el modelo Alumno
class AlumnoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Alumno  # Se especifica el modelo a serializar
        fields = '__all__'  # Se incluyen todos los campos del modelo

# Serializador para el modelo Alumno_Horario
class Alumno_HorarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Alumno_Horario  # Se especifica el modelo a serializar
        fields = '__all__'  # Se incluyen todos los campos del modelo

#Un serializador en Django REST Framework se utiliza para convertir objetos de Django (como modelos de base de datos) en representaciones legibles y manipulables en formatos como JSON, XML, etc.