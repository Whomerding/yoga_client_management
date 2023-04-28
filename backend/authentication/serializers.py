from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.contrib.auth.password_validation import validate_password
from django.contrib.auth import get_user_model
from .models import User
from .models import Student
from .models import Studio

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        # for any additional fields you'd like to add to the JWT sent back in response
        # add below using the token["field name"] = user.name_of_property
        # token["is_student"] = user.is_student

        token["username"] = user.username
        token["first_name"] = user.first_name
        token["last_name"] = user.last_name
        token["is_owner"] = user.is_owner
        token["email"]=user.email
        token["student_id"]=user.student_id
        token["studio_id"]=user.studio_id
    
        return token


class RegistrationSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(required=True, validators=[
                                   UniqueValidator(queryset=User.objects.all())])

    password = serializers.CharField(
        write_only=True, required=True, validators=[validate_password])

    class Meta:
        model = User
        # If added new columns through the User model, add them in the fields
        # list as seen below
        fields = ('username', 'password', 'email',
                  'first_name', 'last_name', 'is_owner', 'studio', 'studio_id', 'student', 'student_id'
                  )
        depth = 1 
    studio_id = serializers.IntegerField(write_only=True, required=False, allow_null=True)
    student_id = serializers.IntegerField(write_only=True, required=False, allow_null=True)
    
        
    def create(self, validated_data):

        user = User.objects.create(
            username=validated_data['username'],
            email=validated_data['email'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name'],
            is_owner=validated_data['is_owner'],
            studio_id=validated_data.get('studio_id'),
            student_id = validated_data.get('student_id'),

            

            # If added new columns through the User model, add them in this
            # create method. Example below:

            # is_student=validated_data['is_student']
        )
        user.set_password(validated_data['password'])
        user.save()
        return user


class UserSerializer(serializers.ModelSerializer):
    studio=serializers.IntegerField()

    class Meta:
        model = User
        fields= ('id', 'username', 'email', 'first_name', 'last_name', 'is_owner','studio', 'studio_id','student', 'student_id')
        read_only_fields=('id', 'username')
        depth = 1 
    studio_id = serializers.IntegerField(write_only=True, required=False, allow_null=True)
    student_id = serializers.IntegerField(write_only=True, required=False, allow_null=True)

    def update_studio(self, instance, validated_data):
        print("UPDATE METHOD TRIGGERED: serializers.py (authentication) Line 80")
        instance.studio_id=validated_data.get('studio_id')
        instance.save()
        return instance

    # def update_student(self, instance, validated_data):
    #     instance.student_id=validated_data.get('studio_id', instance.studio_id)
    #     instance.save()

