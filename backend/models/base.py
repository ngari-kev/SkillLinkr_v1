#!/usr/bin/python3

"""
    This module defines the base class and all methods 
    that universally apply to all classes.
"""

from uuid import uuid4
from datetime import datetime
import copy
import models


class Base():
    """Defines the base class"""
    
    unique_ids = set()
    tfom = '%Y-%m-%dT%H:%M:%S.%f'

    def __init__(self, *args, **kwargs):
        """constructor"""
        if kwargs:
            for key, value in kwargs.items():
                if key != '__class__':
                    setattr(self, key, value)
            if 'created_at' in kwargs:
                self.created_at = datetime.strptime(kwargs['created_at'], self.tfom)
            if 'updated_at' in kwargs:
                self.updated_at = datetime.strptime(kwargs['updated_at'], self.tfom)
        else:
            self.id = str(uuid4())
            while self.id in Base.unique_ids:
                self.id = str(uuid4())
            Base.unique_ids.add(self.id)
            self.created_at = datetime.now()
            self.updated_at = datetime.now()
            models.storage.new(self)
        self.created_at = datetime.now()
        self.updated_at = copy.deepcopy(self.created_at)

    def __str__(self):
        """string representation of the objects"""
        cls_name = self.__class__.__name__
        return"[{}] ({}) {}".format(cls_name, self.id, self.__dict__)
    
    def save(self):
        """updates updated at and saves the instance"""
        self.updated_at = datetime.now()
        models.storage.save()

    def to_dict(self):
        """Serializes instances and returns dict of all instances"""
        new_dict = self.__dict__.copy()
        new_dict['__class__'] = self.__class__.__name__
        new_dict['created_at'] = self.created_at.isoformat()
        new_dict['updated_at'] = self.updated_at.isoformat()
        return new_dict
