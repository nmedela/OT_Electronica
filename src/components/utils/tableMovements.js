import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import workOrderRepository from './../../services/workOrderRepository'

const columns = [
    { id: 'code', label: 'OT Relacionada', minWidth: 100 },
    { id: 'failure', label: 'Descripcion', minWidth: 100 },
    {
        id: 'final_amount',
        label: '$ Importe',
        minWidth: 100,
        align: 'right',
        format: (value) => '$'+value,
    },
];

function createData(code, description, amount, size) {
    return { code, description, amount };
}

const rows = [
    createData('India', 'IN', 1324171354),
    createData('China', 'CN', 1403500365),
    createData('Italy', 'IT', 60483973),
    createData('United States', 'US', 327167434),
    createData('Canada', 'CA', 37602103),
    createData('Australia', 'AU', 25475400),
    createData('Germany', 'DE', 83019200),
    createData('Ireland', 'IE', 4857000),
    createData('Mexico', 'MX', 126577691),
    createData('Japan', 'JP', 126317000),
    createData('France', 'FR', 67022000),
    createData('United Kingdom', 'GB', 67545757),
    createData('Russia', 'RU', 146793744),
    createData('Nigeria', 'NG', 200962417),
    createData('Brazil', 'BR', 210147125),
];

const useStyles = makeStyles({
    root: {
        width: '100%',
    },
    container: {
        // maxHeight: 440,
    },
});

export default function TableMovements(props) {
    const classes = useStyles();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [totalRows, setTotalRows] = React.useState(0);
    const [isLoading, setIsLoading] = React.useState(true);
    const [listMovements, setListMovements] = React.useState(null);

    const handleChangePage = (event, newPage) => {
        setIsLoading(true)
        setPage(newPage);
        console.log(newPage)
        getMovements(newPage,rowsPerPage)
    };
    
    const handleChangeRowsPerPage = (event) => {
        setIsLoading(true)
        setRowsPerPage(+event.target.value);
        setPage(0);
        getMovements(0,event.target.value)
    };

    const getService = (date, pagination) => {

        return {
            pagination: {
                total: 15
            },
            result: rows
        }
    }
    const getMovements = (number_page,limit) => {
        let pagination = {
            page: number_page,
            limit: limit,
        }
        // let res = getService(props.onDate, pagination)
        setListMovements([])
        console.log('hago el getMovements')
        workOrderRepository.getListMovements(props.onDate, pagination)
            .then((res) => {
                console.log('recibe esto de getListMovements', res.data)
                setListMovements(res.data.result)
                setTotalRows(res.data.pagination.total)
                setIsLoading(false)
            })
    }

    useEffect(() => {
        console.log('Entra en useEfect')
        if (props.onIsLoading)
            setPage(0)

        if ((!listMovements)) {
            setIsLoading(true);
            // setPage(0)
            getMovements(page,rowsPerPage)
        }

    })

    return (
        <Paper className={classes.root}>

            { isLoading && <div>cargando</div>}

            {!isLoading &&
                <div>
                    <TableContainer className={classes.container}>
                        <Table stickyHeader aria-label="sticky table">
                            <TableHead>
                                <TableRow>
                                    {columns.map((column) => (
                                        <TableCell
                                            key={column.id}
                                            align={column.align}
                                            style={{ fontSize: '15px', minWidth: column.minWidth, fontFamily: 'Roboto helvetic' }}
                                        >
                                            <b>{column.label}</b>
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {listMovements.map((row) => {
                                    return (
                                        <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                            {columns.map((column) => {
                                                const value = row[column.id];
                                                return (
                                                    <TableCell key={column.id} align={column.align}>
                                                        {column.format && typeof value === 'number' ? column.format(value) : value}
                                                    </TableCell>
                                                );
                                            })}
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        labelRowsPerPage='Items'
                        rowsPerPageOptions={[10, 25, 100]}
                        component="div"
                        count={totalRows}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onChangePage={handleChangePage}
                        onChangeRowsPerPage={handleChangeRowsPerPage}
                    />

                </div>
            }
        </Paper>
    );
}