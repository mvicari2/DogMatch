// re-usable validation functions
import React, { Component } from 'react';
import { ErrorLabel } from '../style/dog-styles';

// validation message class
export default class ValidationMsg extends Component {
    render() {
        return <ErrorLabel>{this.props.field} is Required</ErrorLabel>
    };
};

// validate basic profile model for profile create and update
export const validateBasicProfile = async stateArray => {
    var errors = {
        name: false,
        breed: false,
        color: false,
        age: false,
        weight: false,
        gender: false
    };

    for (var that of stateArray) {
        // filter by specific data types
        if (that.name === 'Name'
            || that.name === 'Breed of Dog'
            || that.name === 'Gender'
            || that.name === 'Age'
            || that.name === 'Weight') {
            // set error for null/undefined/empty strings
            if (that.value === null
                || that.value === undefined
                || that.value === '') {
                // set bools for input border color
                switch (that.name) {
                    case 'Name':
                        errors.name = true;
                        break;
                    case 'Breed of Dog':
                        errors.breed = true;
                        break;
                    case 'Age':
                        errors.age = true;
                        break;
                    case 'Weight':
                        errors.weight = true;
                        break;
                    case 'Gender':
                        errors.gender = true;
                        break;
                    default:
                    // do nothing
                };
            };
        } else if (that.name === 'Color') {
            if (that.value.length < 1) {
                errors.color = true;
            };
        };
    };
    return errors;
};

// validates temperament models for sections 1-6 
export const validateTemperament = async values => {
    var errors = [];

    for (var i = 0; i < values.length; i++) {
        if (!values[i] <= 5 && !values[i] >= 1) {
            errors[i] = true;
        } else {
            errors[i] = false;
        };
    };
    return errors;
};

// validates temperament model section 7
export const validateSectSeven = async values => {
    const errors = [];

    for (var i = 0; i < values.length; i++) {
        if (values[i] === null || values[i] === undefined || values[i] === '') {
            errors[i] = true;
        } else {
            errors[i] = false;
        };
    };
    return errors;
};

// determine if model has validation errors - returns true if validation errors > 0
export const determineHasErrors = async errors => {
    var hasErrors = false;
    for (var i = 0; i < errors.length; i++) {
        if (errors[i] && !hasErrors) {
            hasErrors = true;
        } else if (!hasErrors && !errors[i]) {
            hasErrors = false;
        };
    };
    return hasErrors
};

// resets validation error for temperament profile sections 1-6
export const resetValError = async value => {
    if (value <= 5 && value >= 1) {
        return false;
    } else {
        return true
    };
};

// resets validation error for temperament section 7 
export const resetValErrSectSev = async value => {
    if (value === null || value === undefined || value === '') {
        return true;
    } else {
        return false;
    };
};

// sets array in preparation for validating basic profile model
export const getBasicProfArr = async s => {
    const objArray = [
        {
            name: 'Name',
            value: s.name
        },
        {
            name: 'Breed of Dog',
            value: s.breed
        },
        {
            name: 'Color',
            value: s.color
        },
        {
            name: 'Age',
            value: s.age
        },
        {
            name: 'Weight',
            value: s.weight
        },
        {
            name: 'Gender',
            value: s.gender
        }
    ];
    return objArray;
};