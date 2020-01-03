class Contact(object):
    def __init__(self, name: str, phoneNumber: str, address: str="", email: str=""):
        self.name = name
        self.phoneNumber = phoneNumber
        self.address = address
        self.email = email
    