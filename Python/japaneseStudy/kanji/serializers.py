from rest_framework import serializers
from .models import Kanji

class KanjiSerializer(serializers.ModelSerializer):
    class Meta:
        model = Kanji
        fields = '__all__'

    def create(self, validated_data):
        return Kanji.objects.create(**validated_data)

    def update(self, instance, validated_data):
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        return instance
