import React from 'react'
import {Map} from 'immutable'

import Adjectivd        from '../../../data/dictionary/adjectivd/Adjectivd'
import AdjectivdActions from '../../../data/dictionary/adjectivd/AdjectivdActions'


function AdjectivdRow(props) {
    let {adjectiv} = props

    // The original state is a Adjectivd Record, but when round-tripped to/from localStorage
    // it gets turned into a Map.  This should be corrected, but until then, apply this hack.
    if(adjectiv instanceof(Map))
        adjectiv = Adjectivd(adjectiv)
    
    const onClickEditAdjectivd = () => AdjectivdActions.onClickEditAdjectivd(adjectiv)

    let adjectivdRow = <div>adjectiv item</div>
    //if( props.level >= AdjectivdPanelLevel.PLURALIZATION) {
        /*adjectivdRow =
            <tr>
                <td>{adjectiv.base}</td>
                <td>{adjectiv.plural}</td>
                <td><button id={adjectiv.id} type="button" onClick={onClickEditAdjectivd} >{props.strings.edit}</button></td>
            </tr>*/
    //} else if( props.level >= AdjectivdPanelLevel.BASE) {
        adjectivdRow =
            <tr>
                <td>{adjectiv.base}</td>
                <td><button id={'id'+adjectiv.id} type="button" onClick={onClickEditAdjectivd} >{props.strings.edit}</button></td>
            </tr>
    //}

    return (adjectivdRow)

}

export default AdjectivdRow
