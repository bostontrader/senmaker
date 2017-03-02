import React from 'react'

import {VerbPanelLevel} from '../../data/verbs/VerbConstants'

function VerbItem(props) {
    const {verb} = props;
    const onEditVerb = () => props.onEditVerb(verb)

    let verbItem = <div>verb item</div>
    if( props.level >= VerbPanelLevel.PAST_TENSE) {
        verbItem =
            <tr>
                <td>{verb.base}</td>
                <td>{verb.pastTense}</td>
                <td><button type="button"  onClick={onEditVerb} >Edit</button></td>

            </tr>
    } else if( props.level >= VerbPanelLevel.BASE) {
        verbItem =
            <tr>
                <td>{verb.base}</td>
                <td><button type="button" onClick={onEditVerb} >Edit</button></td>
            </tr>
    }

    return (verbItem)


    /*
     const {verb} = props;
     const onEditVerb = () => props.onEditVerb(verb)

     return (
     <tr>
     <td>
     {verb.base}
     </td>
     <td>
     {verb.pastTense}
     </td>
     <td>
     <button type="button"  onClick={onEditVerb} >Edit</button>
     </td>

     </tr>
     )
     */

}

export default VerbItem
