// @flow
import React from 'react'

import Pronound             from '../../../data/dictionary/pronound/Pronound'
import PronoundActions      from '../../../data/dictionary/pronound/PronoundActions'

function PronoundRow(props:Object):Object {

    let {pronound}:Object = props

    const onClickEditPronound:Function = () => PronoundActions.onClickEditPronound(pronound)
    const editButton:Object = <button id={'id'+pronound.id} type="button" onClick={onClickEditPronound} >{props.strings.get('strings').misc.edit}</button>

    let pronoundRow:Object = <div></div>

    //switch(props.pronoundPanelLevel) {
        //case PronoundPanelLevel.BASE:
            pronoundRow =
                <tr>
                    <td>{pronound.base}</td>
                    <td>{editButton}</td>
                </tr>
            //break
        //case PronoundPanelLevel.PLURALIZATION:
            /*pronoundRow =
                <tr>
                    <td>{pronound.base}</td>
                    <td>{pronound.plural}</td>
                    <td>{editButton}</td>
                </tr>
            break
        default:
            // pronoundRow already has a suitable default. Do nothing.
    }*/

    return pronoundRow

}

export default PronoundRow
