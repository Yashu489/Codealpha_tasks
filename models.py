from django.db import models

class Category(models.Model):
    name = models.CharField(max_length=100)
    
    def __str__(self):
        return self.name

class Product(models.Model):
    name = models.CharField(max_length=200)
    brand = models.CharField(max_length=100)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    price = models.IntegerField()
    original_price = models.IntegerField()
    discount = models.IntegerField(default=0)
    rating = models.FloatField(default=4.5)
    img = models.CharField(max_length=500)
    desc = models.TextField()
    
    def __str__(self):
        return self.name
