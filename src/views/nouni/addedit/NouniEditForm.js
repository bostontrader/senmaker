import React from 'react'
import {RadioGroup, Radio} from 'react-radio-group'

import NoundSelect  from '../../dictionary/nound/NoundSelect'
import NouniActions from '../../../data/nouni/NouniActions'

function NouniEditForm(props) {

    const style = {
        border: '1px solid black',
        margin: '5px'
    }
    const s = props.strings

    const onClickSave = () => NouniActions.onClickSaveNouni(
        //id: props.nouni.getIn(['addedit','nouni','id']),
        //base: props.nouni.getIn(['addedit','nouni','base'])
        props.nouni.getIn(['addedit','nouni'])
    )

    const onDelete = () => NouniActions.onClickDeleteNouni(props.nouni.getIn(['addedit','nouni','id']))

    const options = props.nound.getIn(['dict','coll']).toArray().map(function(noun) {
        return {value:noun.get('id'), label:noun.get('base')}
    })
    const selectedValue = 'cat'
    //const selectedValue = props.app.getIn(['mostRecentlySelectedNound','id'])

    return(
        <div style={style}>
            <NoundSelect options={options} value={selectedValue} dict={props.nound.getIn(['dict','coll'])} />
            <RadioGroup name="definiteness" selectedValue={props.nouni.getIn(['addedit','definiteness'])} onChange={(e)=>{NouniActions.onChangeDefiniteness(e)}}>
                <Radio value="definite" />Definite
                <Radio value="indefinite" />Indefinite
            </RadioGroup>
            <p>{props.nouni.getIn(['addedit','nouni','generatedText'])}</p>
            <button id='save-nouni'   onClick={onClickSave}>{s.save}</button>
            <button id='delete-nound' onClick={onDelete}>{s.delete}</button>
            <button id='cancel'       onClick={NouniActions.onClickCancel}>{s.cancel}</button>
        </div>
    )
}

export default NouniEditForm
