import React from 'react'
import {RadioGroup, Radio} from 'react-radio-group'

import NoundSelect  from '../../dictionary/nound/NoundSelect'
import NoundActions from '../../../data/dictionary/nound/NoundActions'
import NouniActions from '../../../data/nouni/NouniActions'

function NouniAddForm(props) {

    const style = {
        border: '1px solid black',
        margin: '5px'
    }
    const s = props.strings

    const onClickSave = () => NouniActions.onClickSaveNouni(
        props.nouni.getIn(['addedit','nouni'])
    )

    let theButtons = []
    if ( props.app.getIn(['level','currentLevel']) >= 5)
        theButtons = [
            <button id='save-nouni' key='1' onClick={onClickSave}>{s.save}</button>,
            <button id='cancel'     key='2' onClick={NouniActions.onClickCancel}>{s.cancel}</button>
        ]

    const options = props.nound.getIn(['dict','coll']).toArray().map(function(noun) {
        return {value:noun.get('id').toString(), label:noun.get('base')}
    })
    //const selectedValue = props.app.getIn(['mostRecentlySelectedNound','id'])
    const selectedValue = props.nouni.getIn(['addedit','nouni','nound','id']).toString()
    console.log(props.nouni.getIn(['addedit','nouni','nound','id']))
    //const selectedValue = '3'
    //return <Select options={props.options} value={props.selectedValue} placeholder="Select a noun..." onChange={(e)=>{
    //NoundActions.onChangeSelectedNound(props.dict.get(e.value.toString()))
    //}}/>
    const onChange = (id) => {
        //console.log('it works!',id)
        //NoundActions.onChangeSelectedNound(props.dict.get(id.toString()))
        console.log('onChange',props.nound.getIn(['dict','coll',id.toString()]))
        NouniActions.onChangeSelectedNound(props.nound.getIn(['dict','coll',id.toString()]))
    }
    return(
        <div style={style}>
            <NoundSelect options={options} value={selectedValue} onChange={onChange} />
            <RadioGroup name="definiteness" selectedValue={props.nouni.getIn(['addedit','nouni','definiteness'])} onChange={(e)=>{NouniActions.onChangeDefiniteness(e)}}>
                <Radio value="definite" />Definite
                <Radio value="indefinite" />Indefinite
            </RadioGroup>
            <p id="generatedText">{props.nouni.getIn(['addedit','nouni','generatedText'])}</p>
            {theButtons}
        </div>
    )

}

export default NouniAddForm
