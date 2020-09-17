import React, { useState } from 'react';
import Input from '../UI/Form/Input/Input';
import Select from '../UI/Form/Select/Select';
import classes from './NewEntryForm.module.css';
import PlusButton from '../UI/Form/PlusButton/PlusButton'

const OPTIONS = [{
    value: 'income',
    content: 'Income'
},{
    value: 'expense',
    content: 'Expense'
}]

const NewEntryForm = (props) => {
    const [type, setType] = useState('income');
    const [description, setDescription] = useState({value:'', valid:true});
    const [value, setValue] = useState({value:'', valid:true});

    const clearStates = () => {
        setDescription({value:'', valid:true});
        setValue({value:'', valid:true});
    }

    const formIsValid = () => {
        let isValid = true;

        if (!description.value.length) {
            setDescription({...description, valid:false});
            isValid=false;
        }

        if (!value.value.length) {
            setValue({...value, valid:false});
            isValid=false;
        }

        return isValid;
    }

    const onSubmit = (e) => {
        e.preventDefault();

        if (formIsValid()) {
            console.log('submiting')
            props.onSubmit(type, description.value, parseInt(value.value));
            clearStates();
        }
    }

    return (
        <form onSubmit={onSubmit} className={classes.NewEntryForm}>
            <Select
                options={OPTIONS}
                entryType={type}
                onChange={e => setType(e.target.value)}/>

            <Input
                value={description.value}
                invalid={!description.valid}
                placeholder='Add a description'
                size="large"
                entryType={type}
                onChange={e => setDescription({value:e.target.value, valid:true})}/>
            
            <Input 
                value={value.value}
                type='number'
                invalid={!value.valid}
                placeholder='Value'
                size="small"
                entryType={type}
                onChange={e => setValue({value:e.target.value, valid:true})}/>

            <PlusButton entryType={type}/>
        </form>
    )
}

export default NewEntryForm;