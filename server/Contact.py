class Contact(object):
    def __init__(self, name: str, phoneNumber: str, address: str="", email: str=""):
        self.name = name
        self.phoneNumber = phoneNumber
        self.address = address
        self.email = email

    def printContactInfo(self):
        print("Name: ", self.name)
        print("Phone: ", self.phoneNumber)
        print("Address: ", self.address)
        print("Email: ", self.email)
    