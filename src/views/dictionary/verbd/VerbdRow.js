import React from 'react'
import {Map} from 'immutable'

import Verbd          from '../../../data/dictionary/verbd/Verbd'
import VerbdAEActions from '../../../data/dictionary/verbd/addedit/VerbdAEActions'
//import {VerbdPanelLevel} from '../../../data/dictionary/verbd/VerbdConstants'

function VerbdRow(props) {
    let {verb} = props

    // The original state is a Verbd Record, but when round-tripped to/from localStorage
    // it gets turned into a Map.  This should be corrected, but until then, apply this hack.
    if(verb instanceof(Map))
        verb = Verbd(verb)
    
    const onClickEditVerbd = () => VerbdAEActions.onClickEditVerbd(verb)

    let verbdRow = <div>verb item</div>
    //if( props.level >= VerbdPanelLevel.PAST_TENSE) {
        /*verbdRow =
            <tr>
                <td>{verb.base}</td>
                <td>{verb.pastTense}</td>
                <td><button id={verb.id} type="button" onClick={onClickEditVerbd} >{props.strings.edit}</button></td>
            </tr>*/
    //} else if( props.level >= VerbdPanelLevel.BASE) {
        verbdRow =
            <tr>
                <td>{verb.base}</td>
                <td><button id={verb.id} type="button" onClick={onClickEditVerbd} >{props.strings.edit}</button></td>
            </tr>
    //}

    return (verbdRow)

}

export default VerbdRow
