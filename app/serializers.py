from rest_framework import serializers
from .models import *
from .forms import *

class Serializer(serializers.ModelSerializer):
    def create(self, validated_data):
        return self.model.objects.create(**validated_data)

class OrderSerializer(Serializer):
    model = Order
    class Meta:
        model = Order
        fields = ('__all__')