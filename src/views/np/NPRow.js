import React from 'react'
import {Map} from 'immutable'

import NP        from '../../data/np/NP'
import NPActions from '../../data/np/NPActions'

function NPRow(props) {
    let {noun} = props

    // The original state is a NP Record, but when round-tripped to/from localStorage
    // it gets turned into a Map.  This should be corrected, but until then, apply this hack.
    if(noun instanceof(Map))
        noun = NP(noun)

    const onClickEditNP = () => NPActions.onClickEditNP(noun)

    let npRow = <div>noun item</div>
    //if( props.level >= NPPanelLevel.PLURALIZATION) {
        /*npRow =
            <tr>
                <td>{noun.base}</td>
                <td>{noun.plural}</td>
                <td><button id={noun.id} type="button" onClick={onClickEditNP} >{props.strings.edit}</button></td>
            </tr>*/
    //} else if( props.level >= NPPanelLevel.BASE) {
        npRow =
            <tr>
                <td>{noun.generatedText}</td>
                <td><button id={noun.id} type="button" onClick={onClickEditNP} >{props.strings.edit}</button></td>
            </tr>
    //}

    return (npRow)

}

export default NPRow
