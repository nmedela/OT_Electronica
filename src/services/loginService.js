import config from './../config'
import axios from 'axios';
const headers=config.headers
class LoginService {
    constructor() {
    }

    async create(client) {
        // return axios.post(`${config.url}:${config.port}/client/new`, { client: client })
    }
    async update(client) {
        // return axios.put(`${config.url}:${config.port}/client/update`, { client: client })
    }

    async getById(_id) {
        // return axios.get(`${config.url}:${config.port}/client/${_id}`)
    }
    async getNameById(_id) {
        // return axios.get(`${config.url}:${config.port}/client/${_id}`)
    }
    async verify() {
        config.headers["access-token"]=localStorage.getItem('token')
        return axios.get(`${config.url}:${config.port}/user/verify`, {
            // headers: {
            //     'access-token': localStorage.getItem('token') ? localStorage.getItem('token') : ''
            // }
            headers:config.headers
        })
    }
    async login(username, password) {
        return axios.post(`${config.url}:${config.port}/user/login`, { username, password }).
        then((res) => {
            localStorage.setItem("token", JSON.stringify(res.data.token))
            config.headers["access-token"]=JSON.stringify(res.data.token)
            return res
        })
    }
    
    async logout() {
        localStorage.removeItem("token")
        config.headers["access-token"]=''
        return 0
    }
    async delete(_id) {
        return axios.delete(`${config.url}:${config.port}/client/delete/${_id}`)
    }
}

const loginService = new LoginService()
export default loginService