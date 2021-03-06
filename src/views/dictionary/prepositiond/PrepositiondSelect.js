// @flow
import React  from 'react'
import Select from 'react-select'

function PrepositiondSelect(props:Object) {
    return <Select multi options={props.options} value={props.value} placeholder="Select an adjective..." onChange={(e)=>{props.onChange(e)}}/>
}

export default PrepositiondSelect
