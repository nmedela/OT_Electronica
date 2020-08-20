const modeTest = true

const config = {
    url: modeTest ? 'http://192.168.0.38' : 'http://otelectronicabuenosaires.duckdns.org',
    port: 3305,
    headers:{
        'access-token': localStorage.getItem('token')?localStorage.getItem('token'):''
    }
}

export default config