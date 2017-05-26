// @flow
import React from 'react'

import {validateClause} from '../../data/Validator'
import ClauseActions    from '../../data/clause/ClauseActions'

function ClauseRow(props:Object):Object {

    let {clause} = props
    validateClause(clause)

    const onClickEditClause = () => ClauseActions.onClickEditClause(clause)

    return (
        <tr>
            <td>{clause.generatedText}</td>
            <td><button id={clause.id} type="button" onClick={onClickEditClause} >{props.strings.edit}</button></td>
        </tr>
    )

}

export default ClauseRow
