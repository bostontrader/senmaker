import React from 'react'

//import DefinitenessRadio from './dictionary/nound/DefinitenessRadio'
//import LevelControl from './LevelControl'
//import NounPanel from './dictionary/nound/NounPanel'
import NoundSelect from '../dictionary/nound/NoundSelect'
import {RadioGroup, Radio} from 'react-radio-group'

function Nouni(props) {

    const style = {
        border: '1px solid black',
        margin: '5px'
    }

    console.log('NouniAddForm',JSON.stringify(props.addEditNouni.toJSON()))
    return(
        <div>

            <div style={style}>
                <RadioGroup name="definiteness" selectedValue={props.addEditNouni.getIn(['nouni','definiteness'])} onChange={(e)=>{props.onChangeDefiniteness(e)}}>
                    <Radio value="definite" />Definite
                    <Radio value="indefinite" />Indefinite
                </RadioGroup>
                <NoundSelect {...props} />
                <p>{props.addEditNouni.getIn(['nouni','resultText'])}</p>
            </div>

        </div>
    )
}

export default Nouni
