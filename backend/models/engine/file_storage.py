#!/usr/bin/python3

"""
    Serializes and deserializes to and from JSON files respectively.
"""

from os import path
import json
from models.base import Base
from models.user import User
from models.skill import Skill


class FileStorage():
    """
        Serializes and Deserializes instances to and from
        JSON file respectively
    """

    __file_path = "file.json"
    __objects = {}

    def all(self):
        """
        Returns the dictionary of objects.
        """
        return self.__objects

    def new(self, obj):
        """
        Sets in __objects the obj with a key.

        Args:
            obj - Object to be added to __objects.
        """
        key = "{}.{}".format(obj.__class__.__name__, obj.id)
        self.__objects[key] = obj

    def save(self):
        """
        Serializes __objects to a JSON file.
        """
        obj_dict = {key: obj.to_dict()
                      for key, obj in self.__objects.items()}
        with open(self.__file_path, 'w') as f:
            json.dump(obj_dict, f)

    def reload(self):
        """
        Deserializes the JSON file to __objects.
        """
        class_map = {"User": User, "Skill": Skill}
        if path.exists(self.__file_path):
            with open(self.__file_path, 'r') as f:
                obj_dict = json.load(f)
                for key, object_dict in obj_dict.items():
                    cls = object_dict['__class__']
                    FileStorage.__objects[key] = class_map[cls](**object_dict)

    def count(self, cls=None):
        """Count the number of instances of a class"""
        if cls is not None:
            return sum(1 for instance in self.all().values()
                       if type(instance).__name__ == cls)
        return len(self.__objects)

