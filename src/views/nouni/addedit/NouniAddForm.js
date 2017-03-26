import React from 'react'

import NoundSelect from '../../dictionary/nound/NoundSelect'
import {RadioGroup, Radio} from 'react-radio-group'

function NouniAddForm(props) {

    const style = {
        border: '1px solid black',
        margin: '5px'
    }

    return(
        <div>
            <div style={style}>
                <RadioGroup name="definiteness" selectedValue={props.nouni.getIn(['addEditNouni','definiteness'])} onChange={(e)=>{props.nouni.getIn(['onChangeDefiniteness'])(e)}}>
                    <Radio value="definite" />Definite
                    <Radio value="indefinite" />Indefinite
                </RadioGroup>
                <NoundSelect {...props} />
                <p>{props.nouni.getIn(['addEditNouni','nouni','generatedText'])}</p>
            </div>

        </div>
    )
}

export default NouniAddForm
