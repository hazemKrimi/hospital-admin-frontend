import React, { useContext, useEffect, useRef, useState } from 'react';
import MaterialTable from 'material-table';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import { MainContext } from '../contexts/MainContext';
import { Redirect } from 'react-router-dom';

const useStyles = makeStyles({
    table: {
        margin: '3rem 2rem'
    }
});

const Ordonnances = () => {
    const { user, ordonnances, getOrdonnances, addOrdonnance, updateOrdonnance, deleteOrdonnance } = useContext(MainContext);
    const classes = useStyles();
    const tableRef = useRef();
    const [ loading, setLoading ] = useState(true);

    useEffect(() => {
        (async() => {
            try {
                await getOrdonnances();
                setLoading(false);
            } catch(err) {
                alert('Cannot get ordonnance currently');
            }
        })();
    }, []);

    return (
        <>
            {
                user ?
                <div className={classes.table}>
                    {
                        !loading ?
                            <MaterialTable
                                title="Ordonnances"
                                tableRef={tableRef}
                                columns={[
                                    { title: 'Id', field: 'id', editable: false },
                                    { title: 'First Name', field: 'FirstName' },
                                    { title: 'Last Name', field: 'LastName' },
                                    { title: 'Date', field: 'Date' },
                                    { title: 'Description', field: 'Description' }
                                ]}
                                data={ordonnances ? ordonnances.map(ordonnance => ({
                                    id: ordonnance._id.$oid,
                                    FirstName: ordonnance.FirstName,
                                    LastName: ordonnance.LastName,
                                    Date: ordonnance.Date,
                                    Description: ordonnance.Description
                                })) : []}
                                editable={{
                                    onRowAdd: async ordonnance => {
                                        try {
                                            await addOrdonnance(ordonnance);
                                        } catch (err) {
                                            alert('Cannot add ordonnance currently');
                                        }
                                    },
                                    onRowUpdate: async newOrdonnance => {
                                        try {
                                            await updateOrdonnance(newOrdonnance);
                                        } catch (err) {
                                            alert('Cannot update ordonnance currently');
                                        }
                                    },
                                    onRowDelete: async ordonnance => {
                                        try {
                                            await deleteOrdonnance(ordonnance.id);
                                        } catch (err) {
                                            alert('Cannot delete ordonnance currently');
                                        }
                                    }
                                }}
                            /> :
                            <div style={{ display: 'grid', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
                                <CircularProgress />
                            </div>
                    }
                </div>
                    : <Redirect to='/login' />
            }
        </>
    );
}

export default Ordonnances;