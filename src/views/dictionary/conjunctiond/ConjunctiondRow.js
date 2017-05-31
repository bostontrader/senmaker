// @flow
import React from 'react'

import Conjunctiond        from '../../../data/dictionary/conjunctiond/Conjunctiond'
import ConjunctiondActions from '../../../data/dictionary/conjunctiond/ConjunctiondActions'

function ConjunctiondRow(props:Object):Object {

    let {conjunctiond}:Object = props

    const onClickEditConjunctiond:Function = () => ConjunctiondActions.onClickEditConjunctiond(conjunctiond)
    const editButton:Object = <button id={'id'+conjunctiond.id} type="button" onClick={onClickEditConjunctiond} >{props.strings.get('strings').misc.edit}</button>

    return (
        <tr>
            <td>{conjunctiond.base}</td>
            <td>{editButton}</td>
        </tr>
    )

}

export default ConjunctiondRow
