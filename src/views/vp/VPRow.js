// @flow
import React from 'react'

import {validateVP} from '../../data/Validator'
import VP           from '../../data/vp/VP'
import VPActions    from '../../data/vp/VPActions'

function VPRow(props:Object):Object {
    let {vp} = props
    validateVP(vp)

    const onClickEditVP = () => VPActions.onClickEditVP(vp)

    let vpRow = <div>verb item</div>
    //if( props.level >= VPPanelLevel.PLURALIZATION) {
        /*vpRow =
            <tr>
                <td>{verb.base}</td>
                <td>{verb.plural}</td>
                <td><button id={verb.id} type="button" onClick={onClickEditVP} >{props.strings.edit}</button></td>
            </tr>*/
    //} else if( props.level >= VPPanelLevel.BASE) {
        vpRow =
            <tr>
                <td>{vp.generatedText}</td>
                <td><button id={vp.id} type="button" onClick={onClickEditVP} >{props.strings.get('strings').misc.edit}</button></td>
            </tr>
    //}

    return (vpRow)

}

export default VPRow
