// @flow
import React from 'react'

import Verbd             from '../../../data/dictionary/verbd/Verbd'
import VerbdActions      from '../../../data/dictionary/verbd/VerbdActions'
import {VerbdPanelLevel} from '../../../data/dictionary/verbd/VerbdConstants'

function VerbdRow(props:Object):Object {

    let {verbd}:Object = props

    const onClickEditVerbd:Function = () => VerbdActions.onClickEditVerbd(verbd)
    const editButton:Object = <button id={'id'+verbd.id} type="button" onClick={onClickEditVerbd} >{props.strings.edit}</button>

    let verbdRow:Object = <tr></tr>

    switch(props.verbdPanelLevel) {
        case VerbdPanelLevel.BASE:
            verbdRow =
                <tr>
                    <td>{verbd.base}</td>
                    <td>{editButton}</td>
                </tr>
            break
        case VerbdPanelLevel.PAST_TENSE:
            verbdRow =
                <tr>
                    <td>{verbd.base}</td>
                    <td>{verbd.pastTense}</td>
                    <td>{editButton}</td>
                </tr>
            break
        default:
            // noundRow already has a suitable default. Do nothing.
    }

    return verbdRow

}

export default VerbdRow
