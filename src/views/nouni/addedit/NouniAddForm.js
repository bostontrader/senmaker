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

    //console.log('NouniAddForm definiteness=',props.nouni.getIn(['addedit','nouni','definiteness']))
    return(
        <div>
            <div style={style}>
                <NoundSelect {...props} />
                <RadioGroup name="definiteness" selectedValue={props.nouni.getIn(['addedit','nouni','definiteness'])} onChange={(e)=>{NouniAEActions.onChangeDefiniteness(e)}}>
                    <Radio value="definite" />Definite
                    <Radio value="indefinite" />Indefinite
                </RadioGroup>
                <p>{props.nouni.getIn(['addedit','nouni','generatedText'])}</p>
                <button id='save-nouni' onClick={onClickSave}>{s.save}</button>
                <button id='cancel'     onClick={NouniAEActions.onClickCancel}>{s.cancel}</button>
            </div>
        </div>
    )


}

export default NouniAddForm
