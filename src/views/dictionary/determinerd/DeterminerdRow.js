// @flow
import React from 'react'

import Determinerd             from '../../../data/dictionary/determinerd/Determinerd'
import DeterminerdActions      from '../../../data/dictionary/determinerd/DeterminerdActions'

function DeterminerdRow(props:Object):Object {

    let {determinerd}:Object = props

    const onClickEditDeterminerd:Function = () => DeterminerdActions.onClickEditDeterminerd(determinerd)
    const editButton:Object = <button id={'id'+determinerd.id} type="button" onClick={onClickEditDeterminerd} >{props.strings.get('strings').misc.edit}</button>

    return(
        <tr>
            <td>{determinerd.base}</td>
            <td>{editButton}</td>
        </tr>
    )

}

export default DeterminerdRow
