#!/usr/bin/python3
"""It is the main entry point of the command."""
import cmd
from models import storage
from models.base import Base
from models.user import User
from models.skill import Skill


class_names = {
    "Base", "User", "Skill"}
class_met = {"all()", "show()", "destroy()", "count()", "update()"}


class SkillLinkr(cmd.Cmd):
    """This is the console's entry point."""
    prompt = "(SLr) "

    def default(self, arg):
        """Handles unknown commands."""
        args = arg.split('.')

        if len(args) == 2:
            method = args[1].split("(")[0]
            if method == 'all' or method == 'count':
                com = "self.do_{}('{}')".format(method, args[0])
            elif method == 'destroy' or method == 'show':
                param = args[1].split("(")[1].split(")")[0]
                com = 'self.do_{}("{} \"{}\"")'.format(method, args[0], param)
            elif method == 'update':
                param = (args[1].split("(")[1])
                param = param.split(" ")
                _id, att_name = param[0], param[1]
                att_val = param[2].split(")")[0]
                c = "{} '{}' '{}' '{}'".format(args[0], _id, att_name, att_val)
                com = "self.do_{}('{}')".format(method, c)

            try:
                eval(com)
            except AttributeError:
                print("**Invalid method**: {}".format(args[1]))

        else:
            print("*** Unknown syntax:", arg)

    def do_quit(self, arg):
        """Quit the console."""
        return True

    def help_quit(self):
        """Shows help message for quit command."""
        print("Quit command Exits the console.")

    def do_EOF(self, arg):
        """Exits the console forcefully."""
        print("")
        return True

    def help_EOF(self):
        """Shows help message for EOF command."""
        print("EOF command exits the program")

    def emptyline(self):
        """Does nothing on empty input."""
        pass

    def do_create(self, arg, **kwargs):
        """Creates a new instance of a class,
        saves it (to the JSON file) and prints the id"""
        if not arg:
            print("** class name missing **")
            return
        try:
            obj_instance = eval(arg)(kwargs)
            storage.save()
            print(obj_instance.id)

        except NameError:
            print("** class doesn't exist **")

    def help_create(self):
        """Prints help message for create function."""
        print("Creates an instance based on class name only"
              "\nUsage: create <classname>")

    def do_show(self, arg):
        """ Prints the string representation of an instance"""
        args = arg.split()

        if len(args) < 1:
            print("** class name missing **")

        elif args[0] not in class_names:
            print("** class doesn't exist **")

        elif len(args) < 2:
            print("** instance id missing **")

        else:
            key = "{}.{}".format(args[0], args[1])
            obj_dict = storage.all()

            if key in obj_dict:
                print(str(obj_dict[key]))

            else:
                print("** no instance found **")

    def help_show(self):
        """Prints the help message for the show command."""
        print("Prints the string representation of an instance based on the "
              "class name and id.\nUsage: show <class name> <id>")

    def do_destroy(self, arg):
        """Deletes an instance based on the class name and id."""
        args = arg.split()

        if len(args) < 1:
            print("** class name missing **")

        elif args[0] not in class_names:
            print("** class doesn't exist **")

        elif len(args) < 2:
            print("** instance id missing **")

        else:
            key = "{}.{}".format(args[0], args[1])
            obj_dict = storage.all()
            if key not in obj_dict:
                print("** no instance found **")

            else:
                storage.all().pop(key)
                storage.save()

    def help_destroy(self):
        """Prints help message for destroy command."""
        print("Deletes an instance based on the class name and id (save the "
              "change into the JSON file). \nUsage: destroy <class name> <id>")

    def do_all(self, arg):
        """Prints all string representation of all
        instances based or not on the class name."""
        objects = storage.all()
        if arg:
            if arg not in class_names:
                print("** class doesn't exist **")
                return
            print([str(obj) for key, obj in objects.items()
                  if key.split('.')[0] == arg])

        else:
            print([str(obj) for key, obj in objects.items()])

    def help_all(self):
        """Prints help message for all command."""
        print("Prints all string representation of all instances based "
              "or not on the class name.\nUsage: all OR all <class name>")

    def do_update(self, line):
        """Updates an instance based on the class name and id by adding or "
        "updating attribute"""
        args = line.split()
        if len(args) < 1:
            print("** class name missing **")
            return
        elif args[0] not in class_names:
            print("** class doesn't exist **")
            return
        elif len(args) < 2:
            print("** instance id missing **")
            return
        else:
            key = "{}.{}".format(args[0], args[1])
            if key not in storage.all().keys():
                print("** no instance found **")
            elif len(args) < 3:
                print("** attribute name missing **")
                return
            elif len(args) < 4:
                print("** value missing **")
                return
            else:
                setattr(storage.all()[key], args[2], args[3])
                storage.save()

    def help_update(self):
        """Prints the help message for update command."""
        print("Updates an instance based on the class name and id by adding or"
              " updating attribute (save the change into the JSON file)\nUsage"
              ": update <class name> <id> <attribute name>, attribute value>")

    def do_count(self, arg):
        """Count the number of instances of a class"""
        try:
            if not arg:
                raise SyntaxError("class name missing")
            class_name = arg.split()[0]
            count = storage.count(class_name)
            print(count)
        except Exception as e:
            print(e)

    def help_count(self):
        """Prints the help message for count command."""
        print("Retrieves the number of instances of a class"
              "\nUsage: <class name>.count()")


if __name__ == "__main__":
    SkillLinkr().cmdloop()
