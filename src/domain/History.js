export class History {
    constructor() {
        this.id = null
        this.id_wo = null
        this.date_status = null
        this.id_status = null
        this.observation = null
    }

    static fromObject(object) {
        const history = new History()
        history.id = object.id
        history.id_wo = object.id_wo
        history.date_status = object.date_status
        history.id_status = object.id_s
        history.observation = object.observation
        return history
    }
}