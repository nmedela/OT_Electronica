const { WorkOrder } = require('./../domain/WorkOrder')
const { Client } = require('./../domain/Client')
const { History } = require('./../domain/History')
var idMainWorkOrder = 0
var idMainClient = 0
var idMainHistory = 0
class WorkOrderRepository {
    constructor() {
        this.workOrders = []
    }

    create(wo) {
        const newWorkOrder = new WorkOrder()
        //TODO llenar con el parametro wo el newWo 
        this.workOrders.push(newWorkOrder)
        console.log(this.workOrders)
        ++idMainWorkOrder
        return newWorkOrder
    }
    async update(newWorkOrder) {
        this.workOrders = this.workOrders.filter(workOrder => workOrder.id !== newWorkOrder.id)
        this.workOrders.push(newWorkOrder)
        console.log(this.workOrders)
        return newWorkOrder
    }

    async getById(_id) {
        return this.workOrders.find(workOrder => workOrder.id == _id)
    }
    async getAll() {
        return this.workOrders
    }
}
class ClientRepository {
    constructor() {
        this.clients = []
    }

    async create(client) {
        const newClient = new Client() //TODO frrom objet o from json para que convierta el coso que llega
        newClient.id = idMainClient
        newClient.name = client.name
        newClient.tel = client.tel
        newClient.tel2 = client.tel2
        newClient.mail = client.mail
        newClient.mail2 = client.mail2
        newClient.direction = client.direction
        newClient.location = client.location
        this.clients.push(newClient)
        ++idMainClient
        console.log(this.clients)
        return newClient
    }
    async update(newClient) {
        this.clients = this.clients.filter(client => client.id !== newClient.id)
        this.clients.push(newClient)
        console.log(this.clients)
        return newClient
    }

    async getById(_id) {
        return this.clients.find(client => client.id == _id)
    }
    async getAll() {
        return this.clients
    }
}
class HistoryRepository {
    constructor() {
        this.history = []
    }

    create(history) {
        const newHistory = new History()
        //TODO llenar con el history recibido a newHistory
        this.history.push(newHistory)
        console.log(this.history)
        ++idMainHistory
        return history
    }
    async update(newHistory) {
        this.history = this.history.filter(history => history.id !== newHistory.id)
        this.history.push(newHistory)
        console.log(this.history)
        return newHistory
    }

    async getById(_id) {
        return this.history.find(history => history.id == _id)
    }
    async getAll() {
        return this.history
    }
}
module.exports = { WorkOrderRepository: new WorkOrderRepository(), ClientRepository: new ClientRepository(), HistoryRepository: new HistoryRepository() }