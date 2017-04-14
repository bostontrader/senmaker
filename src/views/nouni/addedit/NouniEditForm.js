import React from 'react'
import {RadioGroup, Radio} from 'react-radio-group'

import NoundSelect    from '../../dictionary/nound/NoundSelect'
import NouniAEActions from '../../../data/nouni/addedit/NouniAEActions'

function NouniEditForm(props) {

    const style = {
        border: '1px solid black',
        margin: '5px'
    }

    const onClickSave = () => NouniAEActions.onClickSaveNouni({
        id: props.nouni.getIn(['addEditNouni','nouni','id']),
        base: props.nouni.getIn(['addEditNouni','nouni','base'])
    })
    const onDelete = () => NouniAEActions.onClickDeleteNouni(props.nouni.getIn(['addEditNouni','nouni','id']))
    const s = props.strings

    return(
        <div style={style}>
            <NoundSelect {...props} />
            <RadioGroup name="definiteness" selectedValue={props.nouni.getIn(['addEditNouni','definiteness'])} onChange={(e)=>{NouniAEActions.onChangeDefiniteness(e)}}>
                <Radio value="definite" />Definite
                <Radio value="indefinite" />Indefinite
            </RadioGroup>
            <p>{props.nouni.getIn(['addEditNouni','nouni','generatedText'])}</p>
            <button id='save-nouni'   onClick={onClickSave}>{s.save}</button>
            <button id='delete-nound' onClick={onDelete}>{s.delete}</button>
            <button id='cancel'       onClick={NouniAEActions.onClickCancel}>{s.cancel}</button>
        </div>
    )
}

export default NouniEditForm
