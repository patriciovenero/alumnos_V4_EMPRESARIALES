from django.db import models

class Alumno(models.Model):
    id = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=100)
    apellido = models.CharField(max_length=100)
    fecha_nacimiento = models.DateField()
    foto = models.ImageField(upload_to='fotos/', blank=True, null=True)

    def __str__(self):
        return f"{self.nombre} {self.apellido}"

    class Meta:
        managed = True  # Establece esto en True para permitir que Django gestione la creación y eliminación de la tabla
        db_table = 'alumno'  # Establece el nombre de la tabla en la base de datos para este modelo


class Alumno_Horario(models.Model):
    id = models.AutoField(primary_key=True)
    id_Alumnos = models.ForeignKey(Alumno, on_delete=models.CASCADE, db_index=True, related_name='horarios')
    horario_ingreso = models.TimeField()
    horario_salida = models.TimeField()

    def __str__(self):
        return f"Alumno: {self.id_Alumnos}, Horario: {self.horario_ingreso} - {self.horario_salida}"

    class Meta:
        managed = True  # Establece esto en True para permitir que Django gestione la creación y eliminación de la tabla
        db_table = 'alumno_horario'  # Establece el nombre de la tabla en la base de datos para este modelo
