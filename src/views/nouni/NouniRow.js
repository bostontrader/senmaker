import React from 'react'
import {Map} from 'immutable'

import Nouni          from '../../data/nouni/Nouni'
import NouniAEActions from '../../data/nouni/addedit/NouniAEActions'
//import {NouniPanelLevel} from '../../../data/dictionary/nouni/NouniConstants'

function NouniRow(props) {
    let {noun} = props

    // The original state is a Nouni Record, but when round-tripped to/from localStorage
    // it gets turned into a Map.  This should be corrected, but until then, apply this hack.
    if(noun instanceof(Map))
        noun = Nouni(noun)

    const onClickEditNouni = () => NouniAEActions.onClickEditNouni(noun)

    let nouniRow = <div>noun item</div>
    //if( props.level >= NouniPanelLevel.PLURALIZATION) {
        /*nouniRow =
            <tr>
                <td>{noun.base}</td>
                <td>{noun.plural}</td>
                <td><button id={noun.id} type="button" onClick={onClickEditNouni} >{props.strings.edit}</button></td>
            </tr>*/
    //} else if( props.level >= NouniPanelLevel.BASE) {
        nouniRow =
            <tr>
                <td>{noun.generatedText}</td>
                <td><button id={noun.id} type="button" onClick={onClickEditNouni} >{props.strings.edit}</button></td>
            </tr>
    //}

    return (nouniRow)

}

export default NouniRow
