// const historyRepository = require('./historyRepository').HistoryRepository
import historyRepository from './historyRepository'
import config from './../config'
import axios from 'axios';
const { WorkOrder } = require('../domain/WorkOrder')

var idMainWorkOrder = 0
class WorkOrderRepository {
    constructor() {
        this.workOrders = []
        // this.workOrders.push({
        //     id: 0,
        //     code: 0,
        //     client_id: 0,
        //     admission_date: moment(1594603281789).format('DD/MM/yyyy'),
        //     equipment: 0,
        //     brand: "sony",
        //     model: "algo",
        //     serial_number: "98172938",
        //     failure: "falla los leds",
        //     last_status: 0,
        //     // this.observation : null
        //     deliver_date: null,
        //     warranty: null,
        //     final_amount: null,
        //     cancel: false,
        // })
    }

    async create(wo, date_change) {
        return axios.post(`${config.url}:${config.port}/wo/new`, { wo, date_change })
        // wo.id = idMainWorkOrder
        // if (wo.last_status === 3) {
        //     console.log("Esto tiene last status ", history.date_status)
        //     wo.deliver_date = history.date_status
        //     console.log("Esto tiene last el newWorkOrder ", wo)
        // }
        // const newWorkOrder = WorkOrder.fromObject(wo)
        // const newWorkOrder = new WorkOrder()
        // newWorkOrder.code = wo.code
        // newWorkOrder.client_id = wo.client_id
        // newWorkOrder.admission_date = moment(wo.admission_date).format('DD/MM/yyyy')
        // newWorkOrder.equipment = wo.equipment
        // newWorkOrder.brand = wo.brand
        // newWorkOrder.model = wo.model
        // newWorkOrder.serial_number = wo.serial_number
        // newWorkOrder.failure = wo.failure
        // newWorkOrder.last_status = wo.last_status
        // // this.observation = null
        // newWorkOrder.deliver_date = moment(wo.deliver_date).format('DD/MM/yyyy')
        // newWorkOrder.warranty = wo.warranty
        // newWorkOrder.final_amount = wo.final_amount
        // newWorkOrder.cancel = wo.cancel
        //TODO llenar con el parametro wo el newWo 
        // this.workOrders.push(newWorkOrder)
        // history.id_wo = idMainWorkOrder
        // historyRepository.create(history)
        // console.log(this.workOrders)
        // ++idMainWorkOrder
        // return newWorkOrder
    }
    async update(wo, date_change) {
        // if (newWorkOrder.last_status === 3) {
        //     console.log("Esto tiene last status ", history.date_status)
        //     newWorkOrder.deliver_date = history.date_status
        //     console.log("Esto tiene last el newWorkOrder ", newWorkOrder)
        // }
        // const wo = WorkOrder.fromObject(newWorkOrder)
        // this.workOrders = this.workOrders.filter(workOrder => workOrder.id !== wo.id)
        // this.workOrders.push(wo)
        return axios.put(`${config.url}:${config.port}/wo/change`, { wo, date_change })
        // historyRepository.create(history)
        // console.log(this.workOrders)
        // return newWorkOrder
    }

    async getById(_id) {
        return axios.get(`${config.url}:${config.port}/wo/${_id}`)
    }
    async getAll() {
        return axios.get(`${config.url}:${config.port}/wo/all`)
    }
    async getWorkOrdersByClient(_id) {
        return axios.get(`${config.url}:${config.port}/wo/client_id/${_id}`)
    }
    async getTotalMount() {
        return axios.get(`${config.url}:${config.port}/wo/total_mount`)
    }
    async getTotalMountMonth(date) {
        console.log("Hace el request")
        return axios.get(`${config.url}:${config.port}/wo/total_mount_month/${date.month}/${date.year}`).then((res)=>{
            console.log("devuelve esto, ", res)
            return res})
    }
    async delete(_id) {
        return axios.delete(`${config.url}:${config.port}/wo/delete/${_id}`)
    }
}

const workOrderRepository = new WorkOrderRepository()
export default workOrderRepository
// module.exports = { WorkOrderRepository: new WorkOrderRepository()}