// const historyRepository = require('./historyRepository').HistoryRepository
import historyRepository from './historyRepository'
const { WorkOrder } = require('./../domain/WorkOrder')

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

    async create(wo, history) {
        wo.id = idMainWorkOrder
        if (wo.last_status === 3) {
            console.log("Esto tiene last status ", history.date_status)
            wo.deliver_date = history.date_status
            console.log("Esto tiene last el newWorkOrder ", wo)
        }
        const newWorkOrder = WorkOrder.fromObject(wo)
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
        this.workOrders.push(newWorkOrder)
        history.id_wo = idMainWorkOrder
        historyRepository.create(history)
        console.log(this.workOrders)
        ++idMainWorkOrder
        return newWorkOrder
    }
    async update(newWorkOrder, history) {
        if (newWorkOrder.last_status === 3) {
            console.log("Esto tiene last status ", history.date_status)
            newWorkOrder.deliver_date = history.date_status
            console.log("Esto tiene last el newWorkOrder ", newWorkOrder)
        }
        const wo = WorkOrder.fromObject(newWorkOrder)
        this.workOrders = this.workOrders.filter(workOrder => workOrder.id !== wo.id)
        this.workOrders.push(wo)

        historyRepository.create(history)
        console.log(this.workOrders)
        return newWorkOrder
    }

    async getById(_id) {
        console.log("Le pido el id ", _id)
        console.log("Entre el getByID", this.workOrders)
        return this.workOrders.find(workOrder => workOrder.id == _id)
    }
    async getAll() {
        return this.workOrders
    }
}

const workOrderRepository = new WorkOrderRepository()
export default workOrderRepository
// module.exports = { WorkOrderRepository: new WorkOrderRepository()}