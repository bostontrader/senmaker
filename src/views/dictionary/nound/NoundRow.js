import React from 'react'
import {Map} from 'immutable'

import Nound        from '../../../data/dictionary/nound/Nound'
import NoundActions from '../../../data/dictionary/nound/NoundActions'

function NoundRow(props) {
    let {noun} = props

    // The original state is a Nound Record, but when round-tripped to/from localStorage
    // it gets turned into a Map.  This should be corrected, but until then, apply this hack.
    if(noun instanceof(Map))
        noun = Nound(noun)

    const onClickEditNound = () => NoundActions.onClickEditNound(noun)

    let noundRow = <div>noun item</div>
    //if( props.level >= NoundPanelLevel.PLURALIZATION) {
        /*noundRow =
            <tr>
                <td>{noun.base}</td>
                <td>{noun.plural}</td>
                <td><button id={noun.id} type="button" onClick={onClickEditNound} >{props.strings.edit}</button></td>
            </tr>*/
    //} else if( props.level >= NoundPanelLevel.BASE) {
        noundRow =
            <tr>
                <td>{noun.base}</td>
                <td><button id={'id'+noun.id} type="button" onClick={onClickEditNound} >{props.strings.edit}</button></td>
            </tr>
    //}

    return (noundRow)

}

export default NoundRow
