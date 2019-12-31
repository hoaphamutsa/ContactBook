export class Contact {
    name: string;
    phoneNumber: string;
    address: string;
    email: string

    constructor(name: string, phoneNumber: string,
                address: string, email: string) {
        this.name = name;
        this.phoneNumber = phoneNumber;
        this.address = address;
        this.email = email;
    }
}