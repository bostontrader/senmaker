import React from 'react'

import {VerbPanelLevel} from '../../../data/dictionary/verbs/VerbDictionaryItemConstants'

function VerbItem(props) {

    const {verb} = props;
    const onEditVerb = () => props.onEditVerb(verb)

    let verbItem = <div>verb item</div>
    if( props.level >= VerbPanelLevel.PAST_TENSE) {
        verbItem =
            <tr>
                <td>{verb.base}</td>
                <td>{verb.pastTense}</td>
                <td><button id={verb.id} type="button" onClick={onEditVerb} >{props.strings.edit}</button></td>
            </tr>
    } else if( props.level >= VerbPanelLevel.BASE) {
        verbItem =
            <tr>
                <td>{verb.base}</td>
                <td><button id={verb.id} type="button" onClick={onEditVerb} >{props.strings.edit}</button></td>
            </tr>
    }

    return (verbItem)

}

export default VerbItem
