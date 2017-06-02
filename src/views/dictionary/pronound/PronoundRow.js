// @flow
import React from 'react'

import Pronound             from '../../../data/dictionary/pronound/Pronound'
import PronoundActions      from '../../../data/dictionary/pronound/PronoundActions'

function PronoundRow(props:Object):Object {

    let {pronound}:Object = props

    const onClickEditPronound:Function = () => PronoundActions.onClickEditPronound(pronound)
    const editButton:Object = <button id={'id'+pronound.id} type="button" onClick={onClickEditPronound} >{props.strings.get('strings').misc.edit}</button>

    return(
        <tr>
            <td>{pronound.base}</td>
            <td>{editButton}</td>
        </tr>
    )

}

export default PronoundRow
