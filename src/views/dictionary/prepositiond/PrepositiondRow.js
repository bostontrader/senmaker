// @flow
import React from 'react'

import Prepositiond        from '../../../data/dictionary/prepositiond/Prepositiond'
import PrepositiondActions from '../../../data/dictionary/prepositiond/PrepositiondActions'

function PrepositiondRow(props:Object):Object {

    let {prepositiond}:Object = props

    const onClickEditPrepositiond:Function = () => PrepositiondActions.onClickEditPrepositiond(prepositiond)
    const editButton:Object = <button id={'id'+prepositiond.id} type="button" onClick={onClickEditPrepositiond} >{props.strings.get('strings').misc.edit}</button>

    let prepositiondRow:Object =
        <tr>
            <td>{prepositiond.base}</td>
            <td>{editButton}</td>
        </tr>

    return prepositiondRow

}

export default PrepositiondRow
