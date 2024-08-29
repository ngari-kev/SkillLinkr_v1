#!/usr/bin/python3
"""Magic method for models diectory."""

from models.engine.file_storage import FileStorage

""""creating an instance of FileStorage class."""
storage = FileStorage()

"""Deserailizes from JSON file."""
storage.reload()