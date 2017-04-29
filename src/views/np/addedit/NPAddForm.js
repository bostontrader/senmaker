// @flow
import React from 'react'
import {Radio}      from 'react-radio-group'
import {RadioGroup} from 'react-radio-group'

import NoundSelect  from '../../dictionary/nound/NoundSelect'
import NPActions from '../../../data/np/NPActions'
import {validateVerbd} from '../../../data/Validator'
import {validateNP}    from '../../../data/Validator'

// should be all global props, an object that contains several immutables
function NPAddForm(props:Object):Object {

    const style = {
        border: '1px solid black',
        margin: '5px'
    }
    const s = props.strings

    const onClickSave = () => {
        const np = props.np.getIn(['addedit','np'])
        validateNP(np)
        NPActions.onClickSaveNP(np)
    }

    let theButtons = []
    if ( props.app.getIn(['level','currentLevel']) >= 6) // currentLevel:number
        theButtons = [
            <button id='save-np' key='1' onClick={onClickSave}>{s.save}</button>,
            <button id='cancel'  key='2' onClick={NPActions.onClickCancel}>{s.cancel}</button>
        ]

    // should be nound because we want a select list of nound!
    const selectOptions = props.nound.getIn(['dict','coll']).toArray().map(function(noun) {
        return {value:noun.get('id'), label:noun.get('base')}
    })
    const selectedValue:string = props.np.getIn(['addedit','np','nound','id'])

    const onChangeNound = (id) => { // id should be a number
        NPActions.onChangeSelectedNound(props.nound.getIn(['dict','coll',id]))
    }

    return(
        <div style={style}>
            <NoundSelect options={selectOptions} value={selectedValue} onChange={onChangeNound} />
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
