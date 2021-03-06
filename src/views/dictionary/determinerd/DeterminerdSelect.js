// @flow
import React  from 'react'
import Select from 'react-select'

function DeterminerdSelect(props:Object) {
    return <Select options={props.options} value={props.value} placeholder="Select a noun..." onChange={(e)=>{props.onChange(e.value)}}/>
}

export default DeterminerdSelect
