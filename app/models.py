import os
import sys
from flask import *
from .database import *

class User():
    """
    User class, any field of it cannot be Null.
    It is used to create an user before upload all data in the database, then,
    using User Data Access Object class it can be finally uploaded to the database.
    """
    def __init__(self, id:int=None,username:str=None,password:str=None,birth:str=None,email:str=None,fullname:str=None,genre:str=None,type:int=None,status:int=None,created_at:str=None):
        """User Initialization.
        `@username:` user's nickname
        `@password:` user's password
        `@birth:` user's birth
        `@email:` user's e-mail
        `@fullname:` user's full name (first name, last name)
        `@genre:` user's genre (male, female, other)
        `@type:` type of user's account `(1010=common_user|2020=colaborator_user|3030=admin_user|1906=example_user)`
        `@status:` status of user's account `(0:disable|1:active|2:temporaly_banned|3:permanently_banned)`
        `@created_at:` prints the date and time of creation of user's account
        """
        self.__id = id
        self.__username = username
        self.__password = password
        self.__birth = birth
        self.__email = email
        self.__fullname = fullname
        self.__genre = genre
        self.__type = type
        self.__status = status
        self.__created_at = created_at
    #------------------------------------------------------------------------
    def __str__(self) -> str:
        'User information text'
        return f'User #{self.__id} [{self.__username}, password:{self.__password[:-4]}, birth:{self.__birth}, email:{self.__email}, fullname:{self.__fullname}, genre:{self.__genre}, type:{self.__type}, status:{self.__status}, created_at:{self.__created_at}]'
    #-----------------------------------------------------------------------#
    #                         GETTERS / SETTERS                             #
    #-----------------------------------------------------------------------#
    @property
    def id(self) -> int:
        """`@id:` user's id"""
        return self.__id
    #____________________________________
    @property
    def username(self) -> str:
        """`@username:` user's nickname"""
        return self.__username
    @username.setter
    def username(self, username:str):
        self.__username = username
    #____________________________________
    @property
    def password(self) -> str:
        """`@password:` user's password"""
        return self.__password
    @password.setter
    def password(self, password:str):
        self.__password = password
    #____________________________________
    @property
    def birth(self) -> str:
        """`@birth:` user's birth"""
        return self.__birth
    @birth.setter
    def birth(self, birth:str):
        self.__birth = birth
    #____________________________________
    @property
    def email(self) -> str:
        """`@email:` user's e-mail"""
        return self.__email
    @email.setter
    def email(self, email:str):
        self.__email = email
    #____________________________________
    @property
    def fullname(self) -> str:
        """`@fullname:` user's full name (first name, last name)"""
        return self.__fullname
    @fullname.setter
    def fullname(self, fullname:str):
        self.__fullname = fullname
    #____________________________________
    @property
    def genre(self) -> str:
        """`@genre:` user's genre (male, female, other)"""
        return self.__genre
    @genre.setter
    def genre(self, genre:str):
        self.__genre = genre
    #____________________________________
    @property
    def type(self) -> int:
        """`@type:` type of user's account `(1010=common_user|2020=colaborator_user|3030=admin_user|1906=example_user)`"""
        return self.__type
    #____________________________________
    @property
    def status(self) -> int:
        """`@status:` status of user's account `(0:disable|1:active|2:temporaly_banned|3:permanently_banned)`"""
        return self.__status
    @status.setter
    def status(self, status:int):
        self.__status = status
    #____________________________________
    @property
    def created_at(self) -> str:
        """`@created_at:` prints the date and time of creation of user's account"""
        return self.__created_at

class UserDAO:
    """
    User Data Access Object class, it is used to execute the queries in database.
    """
    __SELECT = 'SELECT * FROM user ORDER BY user_id ASC'
    __INSERT = 'INSERT INTO user(username,user_password,user_birth,user_email,user_fullname,user_genre,user_type,user_status) VALUES(%s,%s,%s,%s,%s,%s,%s,%s)'
    __UPDATE = 'UPDATE user SET username=%s,user_password=%s,user_birth=%s,user_email=%s,user_fullname=%s,user_genre=%s WHERE user_id=%s'
    __DELETE = 'DELETE FROM user WHERE user_id=%s'
    #
    @classmethod
    def select(cls):
        db, c = get_db()
        #
        c.execute(cls.__SELECT)
        data = c.fetchall()
        __data = []
        #
        for i in data:
            __user = User(i["user_id"],i["username"],i["user_password"],i["user_birth"],i["user_email"],i["user_fullname"],i["user_genre"],i["user_type"],i["user_status"],i["user_created_at"])
            __data.append(__user)
        #
        return __data
    #
    @classmethod
    def select_by_id(cls, id:int):
        db, c = get_db()
        c.execute('SELECT * FROM user WHERE user_id=%s', (id,))
        #
        return c.fetchone()
    #
    @classmethod
    def select_by_username(cls, username:str):
        db, c = get_db()
        c.execute('SELECT * FROM user WHERE username=%s', (username,))
        #
        return c.fetchone()
    #
    @classmethod
    def select_by_fullname(cls, fullname:str):
        db, c = get_db()
        c.execute('SELECT * FROM user WHERE user_fullname=%s', (fullname,))
        #
        return c.fetchone()
    #
    @classmethod
    def select_by_mail(cls, email:str):
        db, c = get_db()
        c.execute('SELECT * FROM user WHERE user_email=%s', (email,))
        #
        return c.fetchone()
    #
    @classmethod
    def select_by_creation(cls, created_at:str):
        db, c = get_db()
        c.execute('SELECT * FROM user WHERE user_created_at=%s', (created_at,))
        #
        return c.fetchall(), c.fetchall().rowcount
    #
    @classmethod
    def insert(cls, user:User):
        db, c = get_db()
        #
        values = (
            user.username,
            user.password,
            user.birth,
            user.email,
            user.fullname,
            user.genre,
            user.type,
            user.status
        )
        #
        c.execute(cls.__INSERT, values)
        db.commit()
    #
    @classmethod
    def update(cls, user:User):
        db, c = get_db()
        #
        values = (
            user.username,
            user.password,
            user.birth,
            user.email,
            user.fullname,
            user.genre,
            user.id
        )
        #
        
        c.execute(cls.__UPDATE, values)
        db.commit()
        log.info(f'{user} SUCCESSFULY UPDATED')
    #
    @classmethod
    #
    def delete(cls, user:User):
        db, c = get_db()
        #
        c.execute(cls.__DELETE, (user.id,))
        db.commit()
        log.info(f'{user} SUCCESSFULY DELETED')

if __name__ == '__main__':
    
    user_example = User(1_000,'jdre_1906','1234',18,'correo@correo.com','Juan Diego Rico Espluga',
                        'Male', 1906, 1, 'hoy')
    print(user_example)
    print(user_example.email)
    user_example.email = 'correo2@correo2.com'
    print(user_example.email)
    #
    UserDAO.select()