const { Client } = require('./../domain/Client')

var idMainClient = 0
class ClientRepository {
    constructor() {
        this.clients = []
        // this.clients.push(
        //     {
        //         id: 0,
        //         name: "Nicolas Medela",
        //         tel: 12345678,
        //         tel2: null,
        //         mail: "nico@mail.com",
        //         mail2: null,
        //         direction: "Guzman 3327",
        //         location: "Ricardo Rojas",
        //     }
        // )
    }

    async create(client) {
        client.id = idMainClient
        const newClient = Client.fromObject(client) //TODO frrom objet o from json para que convierta el coso que llega
        // newClient.id = idMainClient
        // newClient.name = client.name
        // newClient.tel = client.tel
        // newClient.tel2 = client.tel2
        // newClient.mail = client.mail
        // newClient.mail2 = client.mail2
        // newClient.direction = client.direction
        // newClient.location = client.location

        this.clients.push(newClient)
        ++idMainClient
        console.log(this.clients)
        return newClient
    }
    async update(client) {
        const newClient = Client.fromObject(client)
        this.clients = this.clients.filter(client => client.id !== newClient.id)
        this.clients.push(newClient)
        console.log(this.clients)
        return newClient
    }

    async getById(_id) {
        console.log("Esto tiene el cliente id ", _id)
        return this.clients.find(client => client.id === _id)
    }
    async getAll() {
        return this.clients
    }
}

const clientRepository = new ClientRepository()
export default clientRepository
// module.exports = { ClientRepository: new ClientRepository() }
// export default { ClientRepository: new ClientRepository() }