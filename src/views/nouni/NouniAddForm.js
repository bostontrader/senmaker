import React from 'react'

//import DefinitenessRadio from './dictionary/nouns/DefinitenessRadio'
//import LevelControl from './LevelControl'
//import NounPanel from './dictionary/nouns/NounPanel'
import NounDictionaryItemSelect from '../dictionary/nouns/NounDictionaryItemSelect'
import {RadioGroup, Radio} from 'react-radio-group'

function Nouni(props) {

    const style = {
        border: '1px solid black',
        margin: '5px'
    }

    //const s = props.strings.Noun

    //const onChange = () => props.onSetQuizScore(!presentQuizState)
    //const onChange = () => {}
    //onChange={onChange}
    //const onDefinitenessChanged = () => {console.log('Noun onDefinitenessChanged')}
        //onSelectedNounChanged: () => {},

    //value={props.addEditNoun.getIn(['noun','base'])}
    console.log('Nouni =',props)
    return(
        <div>

            <div style={style}>
                <RadioGroup name="definiteness" selectedValue={props.addEditNouni.getIn(['nouni','definiteness'])} onChange={(e)=>{props.onChangeDefiniteness(e)}}>
                    <Radio value="definite" />Definite
                    <Radio value="indefinite" />Indefinite
                </RadioGroup>
                <NounDictionaryItemSelect {...props} />
                <p>Catfood is good</p>
            </div>

        </div>
    )
}

export default Nouni
