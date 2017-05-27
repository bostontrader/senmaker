// @flow
import React from 'react'

import Adverbd        from '../../../data/dictionary/adverbd/Adverbd'
import AdverbdActions from '../../../data/dictionary/adverbd/AdverbdActions'

function AdverbdRow(props:Object):Object {

    let {adverbd}:Object = props

    const onClickEditAdverbd:Function = () => AdverbdActions.onClickEditAdverbd(adverbd)
    const editButton:Object = <button id={'id'+adverbd.id} type="button" onClick={onClickEditAdverbd} >{props.strings.get('strings').misc.edit}</button>

    let adverbdRow:Object =
        <tr>
            <td>{adverbd.base}</td>
            <td>{editButton}</td>
        </tr>

    return adverbdRow

}

export default AdverbdRow
