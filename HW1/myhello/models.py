from django.db import models

from django.db import models

class Course_table(models.Model):
    Department = models.CharField(max_length=30)
    CourseTitle = models.CharField(max_length=30)
    Instructor = models.CharField(max_length=30)

    def __str__(self):
        return f"[{self.Department}] {self.CourseTitle} - {self.Instructor}"
