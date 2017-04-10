import React from 'react'
import {RadioGroup, Radio} from 'react-radio-group'

import NoundSelect    from '../../dictionary/nound/NoundSelect'
import NouniAEActions from '../../../data/nouni/addedit/NouniAEActions'

function NouniAddForm(props) {

    const style = {
        border: '1px solid black',
        margin: '5px'
    }

    return(
        <div>
            <div style={style}>
                <NoundSelect {...props} />
                <RadioGroup name="definiteness" selectedValue={props.nouni.getIn(['addEditNouni','definiteness'])} onChange={(e)=>{NouniAEActions.onChangeDefiniteness(e)}}>
                    <Radio value="definite" />Definite
                    <Radio value="indefinite" />Indefinite
                </RadioGroup>
                <p>{props.nouni.getIn(['addEditNouni','nouni','generatedText'])}</p>
            </div>

        </div>
    )
}

export default NouniAddForm
