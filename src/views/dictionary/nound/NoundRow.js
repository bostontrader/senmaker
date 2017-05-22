// @flow
import React from 'react'

import Nound             from '../../../data/dictionary/nound/Nound'
import NoundActions      from '../../../data/dictionary/nound/NoundActions'
import {NoundPanelLevel} from '../../../data/dictionary/nound/NoundConstants'

function NoundRow(props:Object):Object {

    let {nound}:Object = props

    const onClickEditNound:Function = () => NoundActions.onClickEditNound(nound)
    const editButton:Object = <button id={'id'+nound.id} type="button" onClick={onClickEditNound} >{props.strings.get('strings').misc.edit}</button>

    let noundRow:Object = <div></div>

    switch(props.noundPanelLevel) {
        case NoundPanelLevel.BASE:
            noundRow =
                <tr>
                    <td>{nound.base}</td>
                    <td>{editButton}</td>
                </tr>
            break
        case NoundPanelLevel.PLURALIZATION:
            noundRow =
                <tr>
                    <td>{nound.base}</td>
                    <td>{nound.plural}</td>
                    <td>{editButton}</td>
                </tr>
            break
        default:
            // noundRow already has a suitable default. Do nothing.
    }

    return noundRow

}

export default NoundRow
