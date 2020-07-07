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

const Patients = () => {
    const { user, patients, getPatients, addPatient, updatePatient, deletePatient } = useContext(MainContext);
    const classes = useStyles();
    const tableRef = useRef();
    const [ loading, setLoading ] = useState(true);

    useEffect(() => {
        (async() => {
            try {
                await getPatients();
                setLoading(false);
            } catch(err) {
                alert('Cannot get patients currently');
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
                                title="Patients"
                                columns={[
                                    { title: 'Id', field: 'id', editable: false },
                                    { title: 'First Name', field: 'FirstName' },
                                    { title: 'Last Name', field: 'LastName' },
                                    { title: 'Date of Birth', field: 'DateOfBirth' },
                                    { title: 'Phone Number', field: 'PhoneNumber', type: 'numeric' },
                                    { title: 'Reservation State', field: 'ReservationState', type: 'boolean' }
                                ]}
                                tableRef={tableRef}
                                data={patients ? patients.map(patient => ({
                                    id: patient._id.$oid,
                                    FirstName: patient.FirstName,
                                    LastName: patient.LastName,
                                    DateOfBirth: patient.DateOfBirth,
                                    PhoneNumber: patient.PhoneNumber,
                                    ReservationState: patient.ReservationState
                                })) : []}
                                editable={{
                                    onRowAdd: async patient => {
                                        try {
                                            await addPatient(patient);
                                        } catch (err) {
                                            alert('Cannot add patient currently');
                                        }
                                    },
                                    onRowUpdate: async newPatient => {
                                        try {
                                            await updatePatient(newPatient);
                                        } catch (err) {
                                            alert('Cannot update patient currently');
                                        }
                                    },
                                    onRowDelete: async patient => {
                                        try {
                                            await deletePatient(patient.id);
                                        } catch (err) {
                                            alert('Cannot delete patient currently');
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
 
export default Patients;