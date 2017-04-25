// @flow
import React from 'react'

import {validateNP} from '../../data/Validator'
import NP           from '../../data/np/NP'
import NPActions    from '../../data/np/NPActions'

function NPRow(props:Object):Object {
    let {np} = props
    validateNP(np)

    const onClickEditNP = () => NPActions.onClickEditNP(np)

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
                <td>{np.generatedText}</td>
                <td><button id={np.id} type="button" onClick={onClickEditNP} >{props.strings.edit}</button></td>
            </tr>
    //}

    return (npRow)

}

export default NPRow
