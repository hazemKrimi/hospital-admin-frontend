import React, { createContext, useReducer } from 'react';
import { 
    reducer,
    GET_PATIENTS,
    GET_RDVS,
    GET_ORDONNANCES,
    ADD_PATIENT,
    UPDATE_PATIENT,
    DELETE_PATIENT,
    ADD_RDV,
    UPDATE_RDV,
    DELETE_RDV,
    ADD_ORDONNANCE,
    UPDATE_ORDONNANCE,
    DELETE_ORDONNANCE,
    LOG_IN,
    SIGN_UP,
    LOG_OUT
} from './reducers/mainReducer';

export const MainContext = createContext();

const MainContextProvider = ({ children }) => {
    const [ { user, patients, rdvs, ordonnances }, dispatch ] = useReducer(reducer, {
        user: null,
        patients: [],
        rdvs: [],
        ordonnances: []
    });
    const SERVER = 'http://3f82b0415d0f.ngrok.io';

    const login = async(email, password) => {
        try {
            let res = await fetch(`${SERVER}/login`, {
                method: 'POST',
                body: JSON.stringify({
                    Email: email,
                    Password: password
                })
            });
            if ([500, 400, 401, 404, 403].includes(res.status)) throw new Error();
            res = await res.json();
            dispatch({ type: LOG_IN, payload: JSON.parse(res) });
        } catch(err) {
            throw err;
        }
    };
    
    const signup = async(username, email, password) => {
        try {
            let res = await fetch(`${SERVER}/signup`, {
                method: 'POST',
                body: JSON.stringify({
                    UserName: username,
                    Email: email,
                    Password: password
                })
            });
            if ([500, 400, 401, 404, 403].includes(res.status)) throw new Error();
            res = await res.json();
            dispatch({ type: SIGN_UP, payload: JSON.parse(res) });
        } catch (err) {
            throw err;
        }
    };

    const logout = () => {
        try {
            dispatch({ type: LOG_OUT });
        } catch(err) {
            throw err;
        }
    }

    const getPatients = async() => {
        try {
            let res = await fetch(`${SERVER}/get-patients`);
            if ([500, 400, 401, 404, 403].includes(res.status)) throw new Error();
            res = await res.json();
            dispatch({ type: GET_PATIENTS, payload: res.map(item => JSON.parse(item)) });
        } catch(err) {
            throw err;
        }
    }

    const addPatient = async patient => {
        try {
            let res = await fetch(`${SERVER}/add-patient`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(patient)
            });
            if ([500, 400, 401, 404, 403].includes(res.status)) throw new Error();
            res = await res.json();
            dispatch({ type: ADD_PATIENT, payload: JSON.parse(res) });
        } catch(err) {
            throw err;
        }
    };

    const updatePatient = async patient => {
        try {
            let res = await fetch(`${SERVER}/update-patient`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    ...patient,
                    Id: patient.id
                })
            });
            if ([500, 400, 401, 404, 403].includes(res.status)) throw new Error();
            res = await res.json();
            dispatch({ type: UPDATE_PATIENT, payload: { ...patient, _id: { $oid: patient.id } } });
        } catch(err) {
            throw err;
        }
    }

    const deletePatient = async id => {
        try {
            let res = await fetch(`${SERVER}/delete-patient`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ Id: id })
            });
            if ([500, 400, 401, 404, 403].includes(res.status)) throw new Error();
            res = await res.json();
            dispatch({ type: DELETE_PATIENT, payload: id });
        } catch(err) {
            throw err;
        }
    }

    const getRDVs = async() => {
        try {
            let res = await fetch(`${SERVER}/get-rendervous`);
            if ([500, 400, 401, 404, 403].includes(res.status)) throw new Error();
            res = await res.json();
            dispatch({ type: GET_RDVS, payload: res.map(item => JSON.parse(item)) });
        } catch(err) {
            throw err;
        }
    }

    const addRDV = async rdv => {
        try {
            let res = await fetch(`${SERVER}/add-rendervous`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(rdv)
            });
            if ([500, 400, 401, 404, 403].includes(res.status)) throw new Error();
            res = await res.json();
            dispatch({ type: ADD_RDV, payload: JSON.parse(res) });
        } catch(err) {
            throw err;
        }
    };

    const updateRDV = async rdv => {
        try {
            let res = await fetch(`${SERVER}/update-rendervous`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    ...rdv,
                    Id: rdv.id
                })
            });
            if ([500, 400, 401, 404, 403].includes(res.status)) throw new Error();
            res = await res.json();
            dispatch({ type: UPDATE_RDV, payload: { ...rdv, _id: { $oid: rdv.id } } });
        } catch(err) {
            throw err;
        }
    }

    const deleteRDV = async id => {
        try {
            let res = await fetch(`${SERVER}/delete-rendervous`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ Id: id })
            });
            if ([500, 400, 401, 404, 403].includes(res.status)) throw new Error();
            res = await res.json();
            dispatch({ type: DELETE_RDV, payload: id });
        } catch(err) {
            throw err;
        }
    }
    
    const getOrdonnances = async () => {
        try {
            let res = await fetch(`${SERVER}/get-ordonnance`);
            if ([500, 400, 401, 404, 403].includes(res.status)) throw new Error();
            res = await res.json();
            dispatch({ type: GET_ORDONNANCES, payload: res.map(item => JSON.parse(item)) });
        } catch(err) {
            throw err;
        }
    }

    const addOrdonnance = async ordonnance => {
        try {
            let res = await fetch(`${SERVER}/add-ordonnance`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(ordonnance)
            });
            if ([500, 400, 401, 404, 403].includes(res.status)) throw new Error();
            res = await res.json();
            dispatch({ type: ADD_ORDONNANCE, payload: JSON.parse(res) });
        } catch(err) {
            throw err;
        }
    };

    const updateOrdonnance = async ordonnance => {
        try {
            let res = await fetch(`${SERVER}/update-ordonnance`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    ...ordonnance,
                    Id: ordonnance.id
                })
            });
            if ([500, 400, 401, 404, 403].includes(res.status)) throw new Error();
            res = await res.json();
            dispatch({ type: UPDATE_ORDONNANCE, payload: { ...ordonnance, _id: { $oid: ordonnance.id } } });
        } catch(err) {
            throw err;
        }
    }

    const deleteOrdonnance = async id => {
        try {
            let res = await fetch(`${SERVER}/delete-ordonnance`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ Id: id })
            });
            if ([500, 400, 401, 404, 403].includes(res.status)) throw new Error();
            res = await res.json();
            dispatch({ type: DELETE_ORDONNANCE, payload: id });
        } catch(err) {
            throw err;
        }
    }

    return (
        <MainContext.Provider value={{
            user,
            patients,
            rdvs,
            ordonnances,
            signup,
            login,
            logout,
            getPatients,
            addPatient,
            updatePatient,
            deletePatient,
            getRDVs,
            addRDV,
            updateRDV,
            deleteRDV,
            getOrdonnances,
            addOrdonnance,
            updateOrdonnance,
            deleteOrdonnance
        }}>
            { children }
        </MainContext.Provider>
    )
};

export default MainContextProvider;