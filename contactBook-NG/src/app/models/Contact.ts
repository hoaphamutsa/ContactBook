export class Contact {
    public name: string;
    public phoneNumber: string;
    public address: string;
    public email: string;

    constructor(name: string, phoneNumber: string,
                address: string, email: string) {
        this.name = name;
        this.phoneNumber = phoneNumber;
        this.address = address;
        this.email = email;
    }
}