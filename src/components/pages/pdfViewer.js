import React from 'react'
import { Document, Page, Text, View, StyleSheet, PDFViewer, Image, Font } from "@react-pdf/renderer";
import path from './../../fonts/Roboto-Regular.ttf'
import imagen from './../../logoEmpresa.png'
import moment, { isMoment } from "moment";
import { WorkOrder } from '../../domain/WorkOrder';
import clientRepository from './../../services/clientRepository'
import workOrderRepository from './../../services/workOrderRepository'
import { status } from './../../domain/status'
import { equipments } from './../../domain/equipments'

Font.register({
    family: 'Roboto',
    format: "truetype",
    fonts: [
        { src: path },
        { src: path, fontWeight: 'bold' },


    ]
});

const styles = StyleSheet.create({
    page: {
        flexDirection: 'row',
        backgroundColor: '#ffffff',
    },
    header: {
        flexDirection: 'row',
        width: '100%',
        margin: 5,
        marginLeft: 30,
        padding: 1,
        flexGrow: 1,
        borderBottomWidth: 1,
        borderBottomColor: '#112131',
        borderBottomStyle: 'solid',
    },
    sectionCol: {
        flexDirection: 'col',
        margin: 5,
        padding: 1,
        flexGrow: 1,
    },
    sectionRow: {
        flexDirection: 'row',
        margin: 5,
        padding: 1,
        flexGrow: 1,
    },
    subSection: {
        margin: 10,
        padding: 1,
        flexGrow: 1,
    },
    container: {
        flexDirection: 'col',
        margin: 5,
        alignItems: 'stretch',
    },
    divisor: {
        flexDirection: 'row',
        width: '100%',
        marginLeft: 30,
        marginRight: 40,
        borderBottomWidth: 1,
        borderBottomColor: '#aaaaaa',
        borderBottomStyle: 'solid',
        alignItems: 'stretch',
    },
    title: {
        fontSize: 24,
        width: '50%',
        // fontStyle:'bold',
        justifyContent: 'center',
        justifySelf: 'center',
        fontFamily: 'Roboto',
    },
    subtitle: {
        flexWrap: 'wrap',
        fontSize: 12,
        justifySelf: 'flex-end',
        fontFamily: 'Roboto',
    },
    itemText: {
        marginLeft: '10px',
        marginTop: '10px',
        flexWrap: 'wrap',
        color: '#555555',
        fontFamily: 'Roboto',
        fontSize: 13,
        justifySelf: 'flex-end',
        borderBottomWidth: 1,
        borderBottomColor: '#555555',
        borderBottomStyle: 'solid',
    },
    valueText: {
        marginRight: '5px',
        marginLeft: '5px',
        marginTop: '10px',
        backgroundColor: '#eeeeee',
        flexWrap: 'wrap',
        fontSize: 12,
        justifySelf: 'flex-end',
    },

});


class PdfViewer extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            client: null,
            wo: null,
            status_date: moment().format('DD/MM/yyyy'),
            isLoading: true,
        }
    }
    componentWillMount() {
        //posiblemente le pase por url el id de la wo
        let id = this.props.match.params.id
        // console.log(this.props.match.params.id)
        workOrderRepository.getById(id)
            .then((res) => {
                let wo = new WorkOrder()
                wo = res.data[0]
                // console.log('esto tiene wo y es moment? ', wo)
                this.setState({
                    wo
                })
                clientRepository.getById(wo.client_id)
                    .then((res) => {
                        
                            let client = res.data[0]
                            // console.log(client)
                            this.setState({
                                client,
                                isLoading: false
                            })
                            // console.log(this.state)
                        
                    })
            })
    }
    render() {
        const { wo, client, isLoading, status_date } = this.state
        // let equipmentName = equipments.find(s => s.id === wo.equipment).title
        // let statusName = status.find(s => s.id === wo.last_status).title
        if (isLoading) {
            // console.log("tiene esto los dos ", wo, client)
            return <div>cargando</div>
        }
        // console.log("renderizo ", wo, client)
        return (
            < PDFViewer style={{ width: '100%', height: '700px' }
            }>
                <Document>
                    <Page size="A4" style={styles.page} >
                        <View style={styles.container}>
                            <View style={styles.header}>
                                <View style={styles.subSection}>
                                    <Image src={imagen} style={{ width: '150px', height: "100px", padding: 10, backgroundColor: 'white' }} />
                                </View>

                                <View style={styles.subSection}>
                                    <Text>  </Text>
                                    <Text style={styles.title}>Electrónica Buenos Aires</Text>
                                    <Text style={styles.subtitle}> Servicio técnico - Service TV - Service Microondas</Text>
                                    <Text style={styles.subtitle}>www.elecbuenosaires.com.ar</Text>
                                    <Text style={styles.subtitle}>Tel.: 15 5523-4672 - Av. Pte. Perón 1660 - San Fernando.</Text>
                                </View>
                            </View>
                            <View style={styles.sectionRow}>
                                <View style={styles.sectionRow}>
                                    <Text style={styles.itemText}> Código de orden:</Text>
                                    {wo.code !== null && <Text style={styles.valueText}> {wo.code}</Text>}
                                </View>
                                <View style={styles.sectionRow}>
                                    <Text style={styles.itemText}> Estado orden:</Text>
                                    {/* {wo.last_status !== null && <Text style={styles.valueText}>{wo.last_status}</Text>} */}
                                    {wo.last_status !== null && <Text style={styles.valueText}>{ status.find(s => s.id === wo.last_status).title}</Text>}
                                </View>
                                <View style={styles.sectionRow}>
                                    <Text style={styles.itemText}> Fecha de Ingreso:</Text>
                                    {wo.admission_date !== null && <Text style={styles.valueText}> {isMoment(wo.admission_date) ? moment(wo.admission_date).format('DD/MM/yyyy') : wo.admission_date}</Text>}
                                </View>

                            </View>
                            <View style={styles.divisor}>
                            </View>
                            <View style={styles.sectionRow}>
                                <View style={styles.sectionRow}>
                                    <Text style={styles.itemText}> Señor/a:</Text>
                                    {client.name !== null && <Text style={styles.valueText}> {client.name}</Text>}
                                </View>
                            </View>
                            <View style={styles.sectionRow}>
                                <View style={styles.sectionRow}>
                                    <Text style={styles.itemText}> Telefono:</Text>
                                    {client.tel !== null && <Text style={styles.valueText}> {client.tel}</Text>}
                                </View>
                                <View style={styles.sectionRow}>
                                    <Text style={styles.itemText}> Tel. 2:</Text>
                                    {client.tel2 !== null && <Text style={styles.valueText}>{client.tel2}</Text>}
                                </View>
                            </View>
                            <View style={styles.sectionRow}>
                                <View style={styles.sectionRow}>
                                    <Text style={styles.itemText}> Mail:</Text>
                                    {client.mail !== null && <Text style={styles.valueText}>{client.mail}</Text>}
                                </View>
                                <View style={styles.sectionRow}>
                                    <Text style={styles.itemText}> Mail 2:</Text>
                                    {client.mail2 !== null && <Text style={styles.valueText}>{client.mail2}</Text>}
                                </View>
                            </View>
                            <View style={styles.sectionRow}>
                                <View style={styles.sectionRow}>
                                    <Text style={styles.itemText}>Domicilio:</Text>
                                    {client.direction !== null && <Text style={styles.valueText}> {client.direction}</Text>}
                                    {client.location !== null && <Text style={styles.valueText}> {client.location}</Text>}
                                </View>
                            </View>
                            <View style={styles.divisor}>
                            </View>
                            <View style={styles.sectionRow}>
                                <View style={styles.sectionRow}>
                                    <Text style={styles.itemText}> Equipo: </Text>
                                    {/* {wo.equipment !== null && <Text style={styles.valueText}> {wo.equipment}</Text>} */}
                                    {wo.equipment_id !== null && <Text style={styles.valueText}> {equipments.find(s => s.id === wo.equipment_id).title}</Text>}
                                </View>
                                <View style={styles.sectionRow}>
                                    <Text style={styles.itemText}> Marca: </Text>
                                    {wo.brand !== null && <Text style={styles.valueText}> {wo.brand}</Text>}
                                </View>
                                <View style={styles.sectionRow}>
                                    <Text style={styles.itemText}> Modelo: </Text>
                                    {wo.model !== null && <Text style={styles.valueText}> {wo.model} </Text>}
                                </View>
                            </View>
                            <View style={styles.sectionCol}>
                                <View style={styles.sectionRow}>
                                    <Text style={styles.itemText}> Monto aproximado: </Text>
                                    {wo.approximate_amount !== null && <Text style={styles.valueText}> {wo.approximate_amount}</Text>}
                                </View>
                                <View style={styles.sectionRow}>
                                    <Text style={styles.itemText}> Falla: </Text>
                                    {wo.failure !== null && <Text style={styles.valueText}> {wo.failure}</Text>}
                                </View>
                                <View style={styles.sectionRow}>
                                    <Text style={styles.itemText}> Observaciones: </Text>
                                    {wo.last_observation !== null && <Text style={styles.valueText}> {wo.last_observation}</Text>}
                                </View>
                            </View>
                            <View style={styles.sectionRow}>
                                <View style={styles.sectionRow}>
                                    <Text style={styles.itemText}> Fecha de entrega: </Text>
                                    {wo.deliver_date != null && <Text style={styles.valueText}>{isMoment(wo.deliver_date) ? moment(wo.deliver_date).format('DD/MM/yyyy') : wo.deliver_date}</Text>}
                                </View>
                                <View style={styles.sectionRow}>
                                    <Text style={styles.itemText}> Garantía: </Text>
                                    {wo.warranty !== null && <Text style={styles.valueText}>{wo.warranty} Meses</Text>}
                                </View>
                            </View>
                            <View style={styles.sectionRow}>
                                <View style={styles.sectionRow}>
                                    <Text style={[styles.itemText, { borderBottomWidth: 0, fontSize: 16, color: '#000000' }]}> IMPORTE FINAL: </Text>
                                    {wo.final_amount !== null && <Text style={[styles.valueText, { fontSize: 16 }]}>${wo.final_amount}</Text>}
                                </View>
                            </View>
                            <View style={styles.sectionRow}>
                            </View>
                            <View style={styles.sectionRow}>
                            </View>
                            <View style={styles.sectionRow}>
                                <View style={styles.sectionRow}>
                                    <Text style={styles.itemText}> Fecha actual: </Text>
                                    {status_date !== null && <Text style={styles.valueText}> {status_date}</Text>}
                                </View>
                                <View style={styles.sectionRow}>
                                    <Text style={{ color: 'white' }}>--------------------------</Text>
                                    <View style={{ flexDirection: 'col', }}>
                                        <Text style={[{ width: '50%', backgroundColor: 'none', fontSize: 15 }]}>Guillermo Medela</Text>
                                        <Text style={[{ fontSize: 12, color: '#555555' }]}>-            Titular            -</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </Page>
                </Document>
            </PDFViewer >


        )

    }
}
export default PdfViewer