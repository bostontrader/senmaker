import React from 'react'
import {Map} from 'immutable'

import NP          from '../../data/np/NP'
import NPAEActions from '../../data/np/addedit/NPAEActions'
//import {NPPanelLevel} from '../../../data/dictionary/np/NPConstants'

function NPRow(props) {
    let {np} = props

    // The original state is a NP Record, but when round-tripped to/from localStorage
    // it gets turned into a Map.  This should be corrected, but until then, apply this hack.
    if(np instanceof(Map))
        np = NP(np)

    const onClickEditNP = () => NPAEActions.onClickEditNP(np)

    let npRow = <div>np item</div>
    //if( props.level >= NPPanelLevel.PLURALIZATION) {
        /*npRow =
            <tr>
                <td>{np.base}</td>
                <td>{np.plural}</td>
                <td><button id={np.id} type="button" onClick={onClickEditNP} >{props.strings.edit}</button></td>
            </tr>*/
    //} else if( props.level >= NPPanelLevel.BASE) {
        npRow =
            <tr>
                <td>{np.base}</td>
                <td><button id={np.id} type="button" onClick={onClickEditNP} >{props.strings.edit}</button></td>
            </tr>
    //}

    return (npRow)

}

export default NPRow
