import * as actionTypes from './actionTypes';

const prefix = '/api';

export const resetCalculation = () => ({ type: actionTypes.CALCULATION_RESET });
const calculationStart = () => ({ type: actionTypes.CALCULATION_START });
const calculationSuccess = data => ({ type: actionTypes.CALCULATION_SUCCESS, ...data });
const calculationFail = error => ({ type: actionTypes.CALCULATION_FAIL, error });
export const getCalculationInfo = () => async dispatch => {
    dispatch(calculationStart());

    try {
        const res = await fetch(`${prefix}/calculation/info`);
        const resData = await res.json();
        dispatch(calculationSuccess(resData));
    } catch (error) {
        console.log(error);
        dispatch(calculationFail(error));
    }
};

export const postCalculation = data => async dispatch => {
    dispatch(calculationStart());

    try {
        const form = new FormData(data);
        const res = await fetch(`${prefix}/calculation`, {
            method: 'POST',
            body: form,
        });
        const resData = await res.json();
        dispatch(calculationSuccess(resData));
    } catch (error) {
        console.log(error);
        dispatch(calculationFail(error));
    }
};