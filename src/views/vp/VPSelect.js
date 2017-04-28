// @flow
import React  from 'react'
import Select from 'react-select'

function VPSelect(props:Object):Object {
    return <Select options={props.options} value={props.value} placeholder="Select a verb phrase..." onChange={(e)=>{props.onChange(e.value)}}/>
}

export default VPSelect
