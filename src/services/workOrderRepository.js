import historyRepository from './historyRepository'
import config from './../config'
import axios from 'axios';
const { WorkOrder } = require('../domain/WorkOrder')
const headers = config.headers
var idMainWorkOrder = 0
class WorkOrderRepository {
    constructor() {
        this.workOrders = []
    }
    async check(res) {
        localStorage.setItem('urlReq', res.config.url)
        // console.log("esto tiene el res", res)
        if (res.data.code && (res.data.code == 1 || res.data.code == 2 || res.data.code == 3)) {
            window.location.replace('#/login')
        } else {
            return res
        }
    }

    async create(wo, date_change) {
        return axios.post(`${config.url}:${config.port}/wo/new`, { wo, date_change }, { headers }).then(
            (res) => {
                return this.check(res)
            }
        )
    }
    async update(wo, date_change) {
        return axios.put(`${config.url}:${config.port}/wo/change`, { wo, date_change }, { headers }).then(
            (res) => {
                return this.check(res)
            }
        )
    }

    async getById(_id) {
        return axios.get(`${config.url}:${config.port}/wo/${_id}`, { headers }).then(
            (res) => {
                return this.check(res)
            }
        )
    }
    async getAll(pagination) {
        return axios.get(`${config.url}:${config.port}/wo/all`, { headers, params: { page: pagination.page - 1, limit: pagination.limit } }).then(
            (res) => {
                return this.check(res)
            }
        )
    }
    async getByFilter(filter, pagination) {
        filter.brand = filter.brand == "" ? null : filter.brand
        return axios.get(`${config.url}:${config.port}/wo/filtered/${filter.last_status}/${filter.brand}`, { headers, params: { page: pagination.page - 1, limit: pagination.limit } }).then(
            (res) => {
                return this.check(res)
            }
        )
    }
    async getWorkOrdersByClient(_id) {
        return axios.get(`${config.url}:${config.port}/wo/client_id/${_id}`, { headers }).then(
            (res) => {
                return this.check(res)
            }
        )
    }
    async getTotalMount(date) {
        return axios.get(`${config.url}:${config.port}/wo/total_mount/${date.year}`, { headers }).then(
            (res) => {
                return this.check(res)
            }
        )
    }
    async getTotalMountMonth(date) {
        console.log("Hace el request")
        return axios.get(`${config.url}:${config.port}/wo/total_mount_month/${date.month}/${date.year}`, { headers }).then((res) => {
            return this.check(res)
        })
    }

    async getListMovements(date,pagination) {
        console.log("Hace el request de list movements")
        return axios.get(`${config.url}:${config.port}/wo/list_movements/${date.month}/${date.year}`, { headers, params: { page: pagination.page, limit: pagination.limit } }).then((res) => {
            return this.check(res)
        })
    }
    async delete(_id) {
        return axios.delete(`${config.url}:${config.port}/wo/delete/${_id}`, { headers }).then(
            (res) => {
                return this.check(res)
            }
        )
    }
}

const workOrderRepository = new WorkOrderRepository()
export default workOrderRepository