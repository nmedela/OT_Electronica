export class Client {
    constructor() {
        this.id = null
        this.name = null
        this.tel = null
        this.tel2 = null
        this.mail = null
        this.mail2 = null
        this.direction = null
        this.location = null
        this.description = null
    }

    static fromObject(object) {
        const client = new Client()
        client.id = object.id
        client.name = object.name
        client.tel = object.tel
        client.tel2 = object.tel2
        client.mail = object.mail
        client.mail2 = object.mail2
        client.direction = object.direction
        client.location = object.location
        client.description = object.description
        return client
    }
}