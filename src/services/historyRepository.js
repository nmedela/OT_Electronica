const { History } = require('./../domain/History')
const moment = require('moment')

var idMainHistory = 1
class HistoryRepository {
    constructor() {
        this.history = []
        this.history.push(
            {
                id: 0,
                id_wo: 0,
                date_status: moment(1594603281789).format('DD/MM/yyyy'),
                id_status: 0,
                observation: "nada para observar",
            }
        )
    }

    async create(newHistory) {
        console.log("Asi esta el mainHsitory ", idMainHistory)
        // const newHistory = new History()
        // newHistory.id = idMainHistory
        // newHistory.id_wo = history.id_wo
        // newHistory.id_status = history.id_status
        // newHistory.date_status = moment(history.date_status).format('DD/MM/yyyy')
        // newHistory.observation = history.observation
        const history = History.fromObject(newHistory) 
        this.history.push(history)
        console.log(this.history)
        // if (newHistory.last_status == 3) {
        //     WorkOrderRepository.getById(newHistory.id_wo)
        //         .then((res) => {
        //             let wo = res
        //             wo.deliver_date = newHistory.date_status
        //             WorkOrderRepository.update(wo)
        //         })
        // }
        ++idMainHistory
        console.log("Asi esta el mainHsitory ahora ", idMainHistory)
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

module.exports = { HistoryRepository: new HistoryRepository() }