import React from 'react'
import Grid from '@material-ui/core/Grid';
import ReactToPdf from "react-to-pdf";
import { Document, Page, Text, View, StyleSheet, PDFViewer, Image, Canvas } from "@react-pdf/renderer";
import FormClient from './../utils/formClient'

var pdf = require('html-pdf');
const ref = React.createRef();

// const styles = StyleSheet.create({
//     page: {
//         flexDirection: "row"
//     },
//     section: {
//         flexGrow: 1
//     }
// });
var contenido = `
<h1>Esto es un test de html-pdf</h1>
<p>Estoy generando PDF a partir de este código HTML sencillo</p>
`;
// import Paper from '@material-ui/core/Paper';
// import TextField from '@material-ui/core/TextField';
// import Select from '@material-ui/core/Select';
// import FormControl from '@material-ui/core/FormControl';
// import MenuItem from '@material-ui/core/MenuItem';
// import InputLabel from '@material-ui/core/InputLabel';
// import FormClient from './../utils/formClient'
// import FormWorkOrder from './../utils/formWorkOrder'
// import FormGenerator from './../utils/formGenerator'
const styles = StyleSheet.create({
    page: {
        flexDirection: 'row',
        backgroundColor: '#ffffff'
    },
    section: {
        margin: 1,
        padding: 1,
        flexGrow: 1
    }
});
const options = {
    // orientation: 'landscape',
    // unit: 'in',
    // format: [4,2]
};
const styleRoot = {
    flexGrow: 1,
}
class Settings extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            isLoading: true,
            valor: 'Holaaaa'
        }
    }
    handleChange = (event) => {
        console.log('cambio')
    };

    create = () => {
        pdf.create(contenido).toFile('./salida.pdf', function (err, res) {
            if (err) {
                console.log(err);
            } else {
                console.log(res);
            }
        });
    }
    render() {

        return (
            // <ReactToPdf>
            //     {({ toPdf, targetRef }) => (
            //         <div style={{ width: 500, height: 500, background: 'red' }} onClick={toPdf} ref={targetRef} />
            //     )}
            // </ReactToPdf>
            // <Grid container justify='center' style={styleRoot} spacing={2} >

            //     <Grid item xs={12}>
            //         <div>Settings</div>
            //     </Grid>              
            // </Grid>
            // </div >

            <PDFViewer style={{ width: '100%', height: '600px' }}>
                <Document>
                    <Page size="A4" style={styles.page}>
                        <View style={styles.section}>
                            <Text>Hello World!</Text>
                        </View>
                        <View style={styles.section}>
                            <Text>We're inside a PDF!</Text>
                            <div style={{ width: '200px', height: '50px', backgroundColor: 'green' }}>
                                <Text style={{ color: 'blue' }}>{this.state.valor}</Text>
                            </div>

                        </View>
                    </Page>
                </Document>
            </PDFViewer>
        )
    }

}

export default Settings