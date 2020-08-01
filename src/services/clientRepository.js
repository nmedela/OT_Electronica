import config from './../config'
import axios from 'axios';
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
        return axios.post(`${config.url}:${config.port}/client/new`, { client: client })
        // client.id = idMainClient
        // const newClient = Client.fromObject(client) //TODO frrom objet o from json para que convierta el coso que llega
        // // newClient.id = idMainClient
        // // newClient.name = client.name
        // // newClient.tel = client.tel
        // // newClient.tel2 = client.tel2
        // // newClient.mail = client.mail
        // // newClient.mail2 = client.mail2
        // // newClient.direction = client.direction
        // // newClient.location = client.location

        // this.clients.push(newClient)
        // ++idMainClient
        // console.log(this.clients)
        // return newClient
    }
    async update(client) {
        return axios.put(`${config.url}:${config.port}/client/update`, { client: client })
        // const newClient = Client.fromObject(client)
        // this.clients = this.clients.filter(client => client.id !== newClient.id)
        // this.clients.push(newClient)
        // console.log(this.clients)
        // return newClient
    }

    async getById(_id) {
        console.log("Esto tiene el cliente id ", _id)
        return axios.get(`${config.url}:${config.port}/client/${_id}`)
        // return this.clients.find(client => client.id === _id)
    }
    async getNameById(_id) {
        console.log("Esto tiene el cliente id ", _id)
        // let client = this.clients.find(client => client.id === _id)
        return axios.get(`${config.url}:${config.port}/client/${_id}`)

        // return client.name
    }
    async getAll() {
        return axios.get(`${config.url}:${config.port}/client/all`)
        // return this.clients
    }
    async delete(_id) {
        return axios.delete(`${config.url}:${config.port}/client/delete/${_id}`)

    }
}

const clientRepository = new ClientRepository()
export default clientRepository
// module.exports = { ClientRepository: new ClientRepository() }
// export default { ClientRepository: new ClientRepository() }