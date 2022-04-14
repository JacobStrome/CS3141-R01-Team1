from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Section',
            fields=[
                ('id', models.CharField(max_length=30, primary_key=True, serialize=False)),
                ('crn', models.CharField(max_length=7)),
                ('section', models.CharField(max_length=5)),
                ('credits', models.IntegerField()),
                ('totalSeats', models.IntegerField()),
                ('takenSeats', models.IntegerField()),
                ('availableSeats', models.IntegerField()),
                ('buildingName', models.CharField(max_length=50)),
                ('room', models.CharField(max_length=10)),
                ('startTime', models.TimeField()),
                ('endTime', models.TimeField()),
                ('startDate', models.DateField()),
                ('endDate', models.DateField()),
                ('monday', models.BooleanField()),
                ('tuesday', models.BooleanField()),
                ('wednesday', models.BooleanField()),
                ('thursday', models.BooleanField()),
                ('friday', models.BooleanField()),
            ],
        ),
        migrations.CreateModel(
            name='Semester',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('year', models.IntegerField()),
                ('semester', models.CharField(max_length=10)),
            ],
        ),
        migrations.CreateModel(
            name='Subject',
            fields=[
                ('ticker', models.CharField(max_length=5, primary_key=True, serialize=False)),
            ],
        ),
        migrations.CreateModel(
            name='Course',
            fields=[
                ('id', models.CharField(max_length=30, primary_key=True, serialize=False)),
                ('crse', models.CharField(max_length=4)),
                ('title', models.CharField(max_length=100)),
                ('description', models.TextField()),
                ('credits', models.IntegerField()),
                ('prereqs', models.ManyToManyField(to='api.Course')),
                ('sections', models.ManyToManyField(to='api.Section')),
                ('semesters', models.ManyToManyField(to='api.Semester')),
                ('subject', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='courses', to='api.subject')),
            ],
        ),
    ]
