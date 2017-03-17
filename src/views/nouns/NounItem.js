import React from 'react'

import {NounPanelLevel} from '../../data/nouns/NounConstants'

function NounItem(props) {

    const {noun} = props;
    const onEditNoun = () => props.onEditNoun(noun)

    let nounItem = <div>noun item</div>
    if( props.level >= NounPanelLevel.PLURALIZATION) {
        nounItem =
            <tr>
                <td>{noun.base}</td>
                <td>{noun.plural}</td>
                <td><button id={noun.id} type="button" onClick={onEditNoun} >{props.strings.edit}</button></td>
            </tr>
    } else if( props.level >= NounPanelLevel.BASE) {
        nounItem =
            <tr>
                <td>{noun.base}</td>
                <td><button id={noun.id} type="button" onClick={onEditNoun} >{props.strings.edit}</button></td>
            </tr>
    }

    return (nounItem)

}

export default NounItem
