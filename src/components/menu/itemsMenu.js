import NewWorkOrder from './../pages/newWorkOrder'
import WorkOrders from './../pages/workOrders'
import Clients from './../pages/clients'
import Login from './../pages/login'
import Movements from './../pages/movements'
import Settings from './../pages/settings'
import React from 'react'
import { render } from '@testing-library/react'
import loginService from './../../services/loginService';

const newWO = {
    title: 'Nueva OT',
    icon: 'note_add',
    description: 'Crear nueva orden de trabajo',
    path: '/WO/new/:client_id',
    component: (props) => { return <NewWorkOrder {...props} /> },
    subMenu: [],
}
const workOrders = {
    title: 'Ordenes de trabajo',
    icon: 'library_books',
    description: 'Visualizar ordenes de trabajo',
    path: '/WO',
    component: (props) => { return <WorkOrders {...props} /> },
    subMenu: [],
}
const clients = {
    title: 'Clientes',
    icon: 'people',
    description: 'Visualizar clientes, abm',
    path: '/clients',
    component: (props) => { return <Clients {...props} /> },
    subMenu: [],
}

const movements = {
    title: 'Movimientos',
    icon: 'multiple_stop',
    description: 'Visualizar movimientos, gastos, ganancias',
    path: '/movements',
    component: () => { return <Movements /> },
    subMenu: [],
}
const configuration = {
    title: 'Configuración',
    icon: 'settings',
    description: 'Configurar datos de usuario, como items de ordenes de trabajo o cuestiones de dominio(?',
    path: '/settings',
    component: (props) => { return <Settings {...props} /> },
    subMenu: [],
}
const logout = {
    title: 'Cerrar sesión',
    icon: 'close',
    description: 'Cerrar sesión',
    path: '/logout',
    component: (props) => {
        loginService.logout()
            .then((res) => {
                props.history.push('/login')
                // return <Login {...props} />
            })
    },
    subMenu: [],
}

export const itemsMenu = [newWO, workOrders, clients, movements, logout]

