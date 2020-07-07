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

const Rendezvous = () => {
    const { user, rdvs, getRDVs, addRDV, updateRDV, deleteRDV } = useContext(MainContext);
    const classes = useStyles();
    const tableRef = useRef();
    const [ loading, setLoading ] = useState(true);

    useEffect(() => {
        (async() => {
            try {
                await getRDVs();
                setLoading(false);
            } catch(err) {
                alert('Cannot get rendezvous currently');
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
                                title="Rendezvous"
                                tableRef={tableRef}
                                columns={[
                                    { title: 'Id', field: 'id', editable: false },
                                    { title: 'First Name', field: 'FirstName' },
                                    { title: 'Last Name', field: 'LastName' },
                                    { title: 'Date', field: 'Date' },
                                    { title: 'Time', field: 'Time', },
                                    { title: 'Reservation State', field: 'ReservationState', type: 'boolean' }
                                ]}
                                data={rdvs ? rdvs.map(rdv => ({
                                    id: rdv._id.$oid,
                                    FirstName: rdv.FirstName,
                                    LastName: rdv.LastName,
                                    Date: rdv.Date,
                                    Time: rdv.Time,
                                    ReservationState: rdv.ReservationState
                                })) : []}
                                editable={{
                                    onRowAdd: async rdv => {
                                        try {
                                            await addRDV(rdv);
                                        } catch (err) {
                                            alert('Cannot add rendezvous currently');
                                        }
                                    },
                                    onRowUpdate: async newRDV => {
                                        try {
                                            await updateRDV(newRDV);
                                        } catch (err) {
                                            alert('Cannot update rendezvous currently');
                                        }
                                    },
                                    onRowDelete: async rdv => {
                                        try {
                                            await deleteRDV(rdv.id);
                                        } catch (err) {
                                            alert('Cannot delete rendezvous currently');
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

export default Rendezvous;