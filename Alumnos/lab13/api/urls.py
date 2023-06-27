from django.urls import path, include
from . import views

# Configuración de las rutas de la API
urlpatterns = [
    path('', views.IndexView.as_view()),  # Ruta para la vista de índice
    path('alumno/', views.AlumnoView.as_view(), name='alumnos'),  # Ruta para listar y crear alumnos
    path('alumno/<int:alumno_id>', views.AlumnoDetailView.as_view()),  # Ruta para obtener, actualizar y eliminar un alumno específico
    path('alumno_horario/', views.Alumno_HorarioView.as_view()),  # Ruta para listar y crear horarios de alumnos
    path('alumno_horario/<int:alumno_horario_id>', views.Alumno_HorarioDetailView.as_view()),  # Ruta para obtener, actualizar y eliminar un horario de alumno específico
]
