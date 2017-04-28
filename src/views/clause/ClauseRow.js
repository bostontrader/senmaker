// @flow
import React from 'react'

import {validateClause} from '../../data/Validator'
//import VP           from '../../data/clause/VP'
import ClauseActions    from '../../data/clause/ClauseActions'

function ClauseRow(props:Object):Object {
    let {clause} = props
    validateClause(clause)

    const onClickEditClause = () => ClauseActions.onClickEditClause(clause)

    let clauseRow = <div>verb item</div>
    //if( props.level >= VPPanelLevel.PLURALIZATION) {
        /*clauseRow =
            <tr>
                <td>{verb.base}</td>
                <td>{verb.plural}</td>
                <td><button id={verb.id} type="button" onClick={onClickEditClause} >{props.strings.edit}</button></td>
            </tr>*/
    //} else if( props.level >= VPPanelLevel.BASE) {
        clauseRow =
            <tr>
                <td>{clause.generatedText}</td>
                <td><button id={clause.id} type="button" onClick={onClickEditClause} >{props.strings.edit}</button></td>
            </tr>
    //}

    return (clauseRow)

}

export default ClauseRow
