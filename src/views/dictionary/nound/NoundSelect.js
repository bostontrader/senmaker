import React  from 'react'
import Select from 'react-select'
import NoundActions from '../../../data/dictionary/nound/NoundActions'

function NoundSelect(props) {

    //return <Select options={props.options} value={props.selectedValue} placeholder="Select a noun..." onChange={(e)=>{
        //NoundActions.onChangeSelectedNound(props.dict.get(e.value.toString()))
    //}}/>
    console.log('sv=',props)
    return <Select options={props.options} value={props.value} placeholder="Select a noun..." onChange={(e)=>{props.onChange(e.value)}}/>

}

export default NoundSelect
