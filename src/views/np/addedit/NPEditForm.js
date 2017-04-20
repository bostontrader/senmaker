// @flow
import React from 'react'
import {RadioGroup, Radio} from 'react-radio-group'

import NoundSelect  from '../../dictionary/nound/NoundSelect'
import NPActions    from '../../../data/np/NPActions'

function NPEditForm(props:Object) {

    const style = {
        border: '1px solid black',
        margin: '5px'
    }
    const s = props.strings

    const onClickSave = () => NPActions.onClickSaveNP(
        props.np.getIn(['addedit','np'])
    )

    const onDelete = () => NPActions.onClickDeleteNP(props.np.getIn(['addedit','np','id']))

    const options = props.np.getIn(['dict','coll']).toArray().map(function(noun) {
        return {value:noun.get('id').toString(), label:noun.get('base')}
    })
    const selectedValue = props.np.getIn(['addedit','np','np','id'])

    return(
        <div style={style}>
            <NoundSelect options={options} value={selectedValue}  />
            <RadioGroup name="definiteness" selectedValue={props.np.getIn(['addedit','np','definiteness'])} onChange={(e)=>{NPActions.onChangeDefiniteness(e)}}>
                <Radio value="definite" />Definite
                <Radio value="indefinite" />Indefinite
            </RadioGroup>
            <p id="generatedText">{props.np.getIn(['addedit','np','generatedText'])}</p>
            <button id='save-np'   onClick={onClickSave}>{s.save}</button>
            <button id='delete-np' onClick={onDelete}>{s.delete}</button>
            <button id='cancel'    onClick={NPActions.onClickCancel}>{s.cancel}</button>
        </div>
    )
}

export default NPEditForm
