// @flow
import React  from 'react'
import Select from 'react-select'

function VerbdSelect(props:Object) {
    return <Select options={props.options} value={props.value} placeholder="Select a verb..." onChange={(e)=>{props.onChange(e.value)}}/>
}

export default VerbdSelect
