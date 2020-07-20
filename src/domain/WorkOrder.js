export class WorkOrder {
    constructor() {
        this.id = null
        this.code = null
        this.client_id = null
        this.admission_date = null
        this.equipment_id = null
        this.brand = null
        this.model = null
        this.serial_number = null
        this.failure = null
        this.last_status = null
        this.last_observation = null
        this.deliver_date = null
        this.warranty = null
        this.final_amount = null
        this.cancel = false
    }

    static fromObject(object) {
        const newWorkOrder = new WorkOrder()
        newWorkOrder.id = object.id
        newWorkOrder.code = object.cod
        newWorkOrder.client_id = object.client_id
        newWorkOrder.admission_date = object.admission_date
        newWorkOrder.equipment_id = object.equipment_id
        newWorkOrder.brand = object.brand
        newWorkOrder.model = object.model
        newWorkOrder.serial_number = object.serial_number
        newWorkOrder.failure = object.failure
        newWorkOrder.last_status = object.last_status
        newWorkOrder.last_observation = object.last_observation
        newWorkOrder.deliver_date = object.deliver_date
        newWorkOrder.warranty = object.warranty
        newWorkOrder.final_amount = object.final_amount
        newWorkOrder.cancel = object.cancel
        return newWorkOrder
    }

    toObject() {

    }
}