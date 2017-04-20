import React from 'react'
import {RadioGroup, Radio} from 'react-radio-group'

import NoundSelect  from '../../dictionary/nound/NoundSelect'
import NPActions from '../../../data/np/NPActions'

// should be all global props, an object that contains several immutables
function NPAddForm(props) {

    const style = {
        border: '1px solid black',
        margin: '5px'
    }
    const s = props.strings

    const onClickSave = () => NPActions.onClickSaveNP(
        props.np.getIn(['addedit','np'])  // NP
    )

    let theButtons = []
    if ( props.app.getIn(['level','currentLevel']) >= 6) // currentLevel:number
        theButtons = [
            <button id='save-np' key='1' onClick={onClickSave}>{s.save}</button>,
            <button id='cancel'  key='2' onClick={NPActions.onClickCancel}>{s.cancel}</button>
        ]

    // should be nound because we want a select list of nound!
    const options = props.nound.getIn(['dict','coll']).toArray().map(function(noun) {
        return {value:noun.get('id').toString(), label:noun.get('base')}
    })
    const selectedValue = props.np.getIn(['addedit','np','nound','id']) // sb nound

    const onChange = (id) => { // id should be a number
        NPActions.onChangeSelectedNound(props.nound.getIn(['dict','coll',id.toString()]))
    }
    return(
        <div style={style}>
            <NoundSelect options={options} value={selectedValue} onChange={onChange} />
            <RadioGroup name="definiteness" selectedValue={props.np.getIn(['addedit','np','definiteness'])} onChange={(e)=>{NPActions.onChangeDefiniteness(e)}}>
                <Radio value="definite" />Definite
                <Radio value="indefinite" />Indefinite
            </RadioGroup>
            <p id="generatedText">{props.np.getIn(['addedit','np','generatedText'])}</p>
            {theButtons}
        </div>
    )

}

export default NPAddForm
