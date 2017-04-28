// @flow
import React  from 'react'
import Select from 'react-select'

function NPSelect(props:Object) {
    return <Select options={props.options} value={props.value} placeholder="Select a noun phase..." onChange={(e)=>{props.onChange(e.value)}}/>
}

export default NPSelect
