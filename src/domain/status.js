const generated = {
    id:0,
    title: 'Generado',
    icon: 'create'
}
// const inProgress = {
//     id:1,
//     title: 'En progreso',
//     icon: 'access_time'
// }
const returned = {
    id:2,
    title: 'Devuelto',
    icon: 'no_interested'
}
const delivered = {
    id:3,
    title: 'Entregado',
    icon: 'check_circle_outline'
}
const  claim= {
    id:4,
    title: 'Reclamo',
    icon: 'check_circle_outline'
}
const  claim_delivered= {
    id:5,
    title: 'Reclamo entregado',
    icon: 'check_circle_outline'
}
const  claim_returned= {
    id:6,
    title: 'Reclamo devuelto',
    icon: 'check_circle_outline'
}
export const status = [generated, returned, claim,delivered,claim_delivered,claim_returned]