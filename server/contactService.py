from Contact import Contact
import sqlite3

class ContactService(object):

    @classmethod
    def getContact(cls, contactName: str):
        conn = sqlite3.connect('contact.db')
        c = conn.cursor()
        with conn:
            c.execute("""
                SELECT * FROM `contacts`
                WHERE name LIKE :name
                """, { 'name': contactName + '%' })
        return c.fetchone()

    @classmethod
    def getAllContacts(cls):
        conn = sqlite3.connect('contact.db')
        c = conn.cursor()
        with conn:
            c.execute("""
                SELECT * FROM contacts
                """)
        return c.fetchall()

    @classmethod
    def createContact(cls, contact: Contact):
        conn = sqlite3.connect('contact.db')
        c = conn.cursor()
        with conn:
            c.execute("""
                INSERT INTO contacts VALUES (
                    :name,
                    :phone,
                    :address,
                    :email
                );""", 
                {
                    'name': contact.name,
                    'phone': contact.phoneNumber,
                    'address': contact.address,
                    'email': contact.email
                }
            )

    @classmethod
    def updateContact(cls, contact: Contact, contactId: int=0):
        conn = sqlite3.connect('contact.db')
        c = conn.cursor()
        with conn:
            c.execute("""
                UPDATE contacts SET
                    phone = :phone,
                    address = :address,
                    email = :email
                WHERE name = :name
                """,
                {
                    'phone': contact.phoneNumber,
                    'address': contact.address,
                    'email': contact.email,
                    'name': contact.name
                }
            )

    @classmethod
    def removeContact(cls, contactName: str):
        conn = sqlite3.connect('contact.db')
        c = conn.cursor()
        with conn:
            c.execute("""
                DELETE from contacts 
                WHERE name = :name
                """,
                { 'name': contactName }
            )

    