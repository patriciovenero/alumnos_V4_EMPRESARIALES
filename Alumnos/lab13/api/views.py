from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import generics
from .models import * 
from .serializers import AlumnoSerializer, Alumno_HorarioSerializer
from django.db.models import F

# Vista de índice que devuelve todos los alumnos
class IndexView(APIView):
    def get(self, request):
        lista_alumnos = Alumno.objects.all()  # Obtiene todos los objetos Alumno de la base de datos
        serializer_alumnos = AlumnoSerializer(lista_alumnos, many=True)  # Serializa los objetos Alumno en formato JSON
        return Response(serializer_alumnos.data)  # Devuelve la respuesta con los datos serializados

# Vista para listar y crear alumnos
class AlumnoView(generics.ListCreateAPIView):
    queryset = Alumno.objects.all()  # Obtiene todos los objetos Alumno de la base de datos
    serializer_class = AlumnoSerializer  # Utiliza el serializador AlumnoSerializer para serializar y deserializar los objetos

# Vista para obtener, actualizar y eliminar un alumno específico
class AlumnoDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Alumno.objects.all()  # Obtiene todos los objetos Alumno de la base de datos
    lookup_url_kwarg = 'alumno_id'  # Define el nombre del parámetro de URL para identificar al alumno
    serializer_class = AlumnoSerializer  # Utiliza el serializador AlumnoSerializer para serializar y deserializar los objetos

    def perform_destroy(self, instance):
        alumno_id = instance.id  # Guarda el ID del alumno a eliminar
        instance.delete()  # Elimina el alumno de la base de datos

        # Reorganiza los IDs de los alumnos restantes
        Alumno.objects.filter(id__gt=alumno_id).update(id=F('id') - 1)

# Vista para listar y crear horarios de alumnos
class Alumno_HorarioView(generics.ListCreateAPIView):
    queryset = Alumno_Horario.objects.all()  # Obtiene todos los objetos Alumno_Horario de la base de datos
    serializer_class = Alumno_HorarioSerializer  # Utiliza el serializador Alumno_HorarioSerializer para serializar y deserializar los objetos

# Vista para obtener, actualizar y eliminar un horario de alumno específico
class Alumno_HorarioDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Alumno_Horario.objects.all()  # Obtiene todos los objetos Alumno_Horario de la base de datos
    lookup_url_kwarg = 'alumno_horario_id'  # Define el nombre del parámetro de URL para identificar el horario de alumno
    serializer_class = Alumno_HorarioSerializer  # Utiliza el serializador Alumno_HorarioSerializer para serializar y deserializar los objetos
