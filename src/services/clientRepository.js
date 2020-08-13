import config from './../config'
import axios from 'axios';
const { Client } = require('./../domain/Client')
const headers = config.headers
var idMainClient = 0
class ClientRepository {
    constructor() {
        this.clients = []
    }
    async check(res) {
        localStorage.setItem('urlReq', res.config.url)
        // console.log("esto tiene el res", res)
        if (res.data.code && (res.data.code == 1 || res.data.code == 2 || res.data.code == 3)) {
            // console.log("entre y trajo error")
            window.location.replace('#/login')
        }else{
            return res
        }

    }
    async create(client) {
        return axios.post(`${config.url}:${config.port}/client/new`, {
            client: client 
            // headers: {
            //     'access-token': localStorage.getItem('token')
            // }
        },{headers}).then(
            (res) => {
                return this.check(res)
            }
        )
    }
    async update(client) {
        return axios.put(`${config.url}:${config.port}/client/update`, {client: client },{headers}).then(
            (res) => {
                return this.check(res)
            }
        )
    }
    async getById(_id) {
        return axios.get(`${config.url}:${config.port}/client/${_id}`, {
            headers
            // headers: {
            //     'access-token': localStorage.getItem('token')
            // }
        }).then(
            (res) => {
                return this.check(res)
            }
        )
    }
    async getNameById(_id) {
        return axios.get(`${config.url}:${config.port}/client/${_id}`, {
            headers
            // headers: {
            //     'access-token': localStorage.getItem('token')
            // }
        }).then(
            (res) => {
                return this.check(res)
            }
        )
    }
    async getAll() {
        return axios.get(`${config.url}:${config.port}/client/all`, {
            // headers: {
            //     'access-token': localStorage.getItem('token')
            // }
            headers
        }).then(
            (res) => {
                return this.check(res)
            }
        )
    }
    async delete(_id) {
        return axios.delete(`${config.url}:${config.port}/client/delete/${_id}`, { headers }).then(
            (res) => {
                return this.check(res)
            }
        )
    }
}
const clientRepository = new ClientRepository()
export default clientRepository