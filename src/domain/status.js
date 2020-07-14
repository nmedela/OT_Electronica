const generated = {
    id:0,
    title: 'Generado',
    icon: 'access_time',
    color:'orange'
}
// const inProgress = {
//     id:1,
//     title: 'En progreso',
//     icon: 'access_time'
// }
const returned = {
    id:2,
    title: 'Devuelto',
    icon: 'close',
    color:'red',
}
const delivered = {
    id:3,
    title: 'Entregado',
    icon: 'check',
    color:'green',
}
const  claim= {
    id:4,
    title: 'Reclamo',
    icon: 'error_outline',
    color:'orange',
}
const  claim_delivered= {
    id:5,
    title: 'Reclamo entregado',
    icon: 'done_outline',
    color:'green',
}
const  claim_returned= {
    id:6,
    title: 'Reclamo devuelto',
    icon: 'highlight_off',
    color:'brown',
}
export const status = [generated, returned, claim,delivered,claim_delivered,claim_returned]