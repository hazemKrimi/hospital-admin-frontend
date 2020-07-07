export const SIGN_UP = 'LOG_IN';
export const LOG_IN = 'LOG_IN';
export const LOG_OUT = 'LOG_OUT';
export const GET_PATIENTS = 'GET_PATIENTS';
export const ADD_PATIENT = 'ADD_PATIENT';
export const UPDATE_PATIENT = 'UPDATE_PATIENT';
export const DELETE_PATIENT = 'DELETE_PATIENT';
export const GET_RDVS = 'GET_RDVS';
export const ADD_RDV = 'ADD_RDV';
export const UPDATE_RDV = 'UPDATE_RDV';
export const DELETE_RDV = 'DELETE_RDV';
export const GET_ORDONNANCES = 'GET_ORDONNANCES';
export const ADD_ORDONNANCE = 'ADD_ORDONNANCE';
export const UPDATE_ORDONNANCE = 'UPDATE_ORDONNANCE';
export const DELETE_ORDONNANCE = 'DELETE_ORDONNANCE';

export const reducer = (state, { type, payload }) => {
    switch (type) {
        case SIGN_UP: return { ...state, user: payload };
        case LOG_IN: return { ...state, user: payload };
        case LOG_OUT: return { ...state, user: null };
        case GET_PATIENTS: return { ...state, patients: payload };
        case ADD_PATIENT: return { ...state, patients: [ ...state.patients, payload ] };
        case UPDATE_PATIENT: return {
            ...state,
            patients: state.patients.map(patient => {
                if (patient._id.$oid === payload._id.$oid) return payload;
                return patient;
            })
        };
        case DELETE_PATIENT: return {
            ...state,
            patients: state.patients.filter(patient => patient._id.$oid !== payload)
        }
        case GET_RDVS: return { ...state, rdvs: payload };
        case ADD_RDV: return { ...state, rdvs: [ ...state.rdvs, payload ] };
        case UPDATE_RDV: return {
            ...state,
            rdvs: state.rdvs.map(rdv => {
                if (rdv._id.$oid === payload._id.$oid) return payload;
                return rdv;
            })
        };
        case DELETE_RDV: return {
            ...state,
            rdvs: state.rdvs.filter(rdv => rdv._id.$oid !== payload)
        }
        case GET_ORDONNANCES: return { ...state, ordonnances: payload };
        case ADD_ORDONNANCE: return { ...state, ordonnances: [ ...state.ordonnances, payload ] };
        case UPDATE_ORDONNANCE: return {
            ...state,
            ordonnances: state.ordonnances.map(ordonnance => {
                if (ordonnance._id.$oid === payload._id.$oid) return payload;
                return ordonnance;
            })
        };
        case DELETE_ORDONNANCE: return {
            ...state,
            ordonnances: state.ordonnances.filter(ordonnance => ordonnance._id.$oid !== payload)
        }
        default: return state;
    }
}