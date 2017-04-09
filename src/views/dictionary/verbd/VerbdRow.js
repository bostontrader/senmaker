import React from 'react'

import VerbdAEActions    from '../../../data/dictionary/verbd/addedit/VerbdAEActions'
//import {VerbdPanelLevel} from '../../../data/dictionary/verbd/VerbdConstants'

function VerbdRow(props) {
    const {verb} = props
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
