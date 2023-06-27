from django.db import models

# Definición del modelo Alumno
class Alumno(models.Model):
    id = models.AutoField(primary_key=True)  # Campo de clave primaria automática
    nombre = models.CharField(max_length=100)  # Campo de texto para almacenar el nombre del alumno
    apellido = models.CharField(max_length=100)  # Campo de texto para almacenar el apellido del alumno
    fecha_nacimiento = models.DateField()  # Campo de fecha para almacenar la fecha de nacimiento del alumno
    foto = models.ImageField(upload_to='fotos/', blank=True, null=True)  # Campo de imagen para almacenar la foto del alumno

    def __str__(self):
        return f"{self.nombre} {self.apellido}"  # Representación del objeto Alumno como una cadena de texto

    class Meta:
        managed = True  # Permitir que Django gestione la creación y eliminación de la tabla
        db_table = 'alumno'  # Nombre de la tabla en la base de datos para este modelo


# Definición del modelo Alumno_Horario
class Alumno_Horario(models.Model):
    id = models.AutoField(primary_key=True)  # Campo de clave primaria automática
    id_Alumnos = models.ForeignKey(Alumno, on_delete=models.CASCADE, db_index=True, related_name='horarios')  # Campo de clave externa para relacionar con el modelo Alumno
    horario_ingreso = models.TimeField()  # Campo de tiempo para almacenar el horario de ingreso del alumno
    horario_salida = models.TimeField()  # Campo de tiempo para almacenar el horario de salida del alumno

    def __str__(self):
        return f"Alumno: {self.id_Alumnos}, Horario: {self.horario_ingreso} - {self.horario_salida}"  # Representación del objeto Alumno_Horario como una cadena de texto

    class Meta:
        managed = True  # Permitir que Django gestione la creación y eliminación de la tabla
        db_table = 'alumno_horario'  # Nombre de la tabla en la base de datos para este modelo
