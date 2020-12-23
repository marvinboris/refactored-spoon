import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    calculation: {
        loading: false,
        error: null
    },
};

const calculationReset = (state, action) => updateObject(state, { calculation: initialState.calculation });
const calculationStart = (state, action) => updateObject(state, { calculation: updateObject(state.calculation, { loading: true, message: null }) });
const calculationSuccess = (state, action) => updateObject(state, { calculation: updateObject(state.calculation, { loading: false, error: null, ...action }) });
const calculationFail = (state, action) => updateObject(state, { calculation: updateObject(state.calculation, { loading: false, ...action }) });

export default (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.CALCULATION_RESET: return calculationReset(state, action);
        case actionTypes.CALCULATION_START: return calculationStart(state, action);
        case actionTypes.CALCULATION_SUCCESS: return calculationSuccess(state, action);
        case actionTypes.CALCULATION_FAIL: return calculationFail(state, action);

        default: return state;
    }
};