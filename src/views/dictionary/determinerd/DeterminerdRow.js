// @flow
import React from 'react'

import Determinerd             from '../../../data/dictionary/determinerd/Determinerd'
import DeterminerdActions      from '../../../data/dictionary/determinerd/DeterminerdActions'

function DeterminerdRow(props:Object):Object {

    let {determinerd}:Object = props

    const onClickEditDeterminerd:Function = () => DeterminerdActions.onClickEditDeterminerd(determinerd)
    const editButton:Object = <button id={'id'+determinerd.id} type="button" onClick={onClickEditDeterminerd} >{props.strings.get('strings').misc.edit}</button>

    let determinerdRow:Object = <div></div>

    //switch(props.determinerdPanelLevel) {
        //case DeterminerdPanelLevel.BASE:
            determinerdRow =
                <tr>
                    <td>{determinerd.base}</td>
                    <td>{editButton}</td>
                </tr>
            //break
        //case DeterminerdPanelLevel.PLURALIZATION:
            //determinerdRow =
                /*<tr>
                    <td>{determinerd.base}</td>
                    <td>{determinerd.plural}</td>
                    <td>{editButton}</td>
                </tr>*/
            //break
        //default:
            // determinerdRow already has a suitable default. Do nothing.
    //}

    return determinerdRow

}

export default DeterminerdRow
