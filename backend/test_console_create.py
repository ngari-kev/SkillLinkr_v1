#!/usr/bin/python3
from models import storage
from models.base import Base
from models.user import User

all_objs = storage.all()
print("-- Reloaded objects --")
for obj_id in all_objs.keys():
    obj = all_objs[obj_id]
    print(obj)

print("-- Create a new User --")
my_user = User(name="Betty Bar", email="bettybar@mail.com")
my_user.name = "Betty Bar"
my_user.email = "bettybar@mail.com"
my_user.bio = "Be odd to stay at 1"
my_user.location = "Kenya"
my_user.skills = []
my_user.save()
print(my_user)

print("-- Create a new User 2 --")
my_user2 = User(name="Kermit Frog", email="kermit@mail.com")
my_user2.name = "Kermit Frog"
my_user2.email = "kermit@mail.com"
my_user2.bio = "Jumping into conclusions"
my_user2.location = "Kenya"
my_user2.skills = []
my_user2.save()
print(my_user2)
