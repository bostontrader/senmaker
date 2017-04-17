import React from 'react'
import {RadioGroup, Radio} from 'react-radio-group'

import NoundSelect    from '../../dictionary/nound/NoundSelect'
import NouniAEActions from '../../../data/nouni/addedit/NouniAEActions'

function NouniAddForm(props) {

    const style = {
        border: '1px solid black',
        margin: '5px'
    }
    const s = props.strings

    const onClickSave = () => NouniAEActions.onClickSaveNouni(
        props.nouni.getIn(['addedit','nouni'])
    )

    let theButtons = []
    if ( props.app.getIn(['level','currentLevel']) >= 5)
        theButtons = [
            <button id='save-nouni' key='1' onClick={onClickSave}>{s.save}</button>,
            <button id='cancel'     key='2' onClick={NouniAEActions.onClickCancel}>{s.cancel}</button>
        ]

    return(
        <div style={style}>
            <NoundSelect {...props} />
            <RadioGroup name="definiteness" selectedValue={props.nouni.getIn(['addedit','nouni','definiteness'])} onChange={(e)=>{NouniAEActions.onChangeDefiniteness(e)}}>
                <Radio value="definite" />Definite
                <Radio value="indefinite" />Indefinite
            </RadioGroup>
            <p id="generatedText">{props.nouni.getIn(['addedit','nouni','generatedText'])}</p>
            {theButtons}
        </div>
    )

}

export default NouniAddForm
