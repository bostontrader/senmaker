// @flow
import React from 'react'

import ClauseRow from './ClauseRow'

function ClauseTable(props:Object):?Object {

    let clauseTable:?Object = null

    const clauseRows:Object = [...props.clause.getIn(['dict','coll']).values()].map(clause => (
        <ClauseRow key={clause.get('id')} clause={clause} strings={props.strings} />
    ))

    let header:?Object = null

    if (clauseRows.length > 0) {

        header =
            <thead>
                <tr>
                    <th>Clause</th>
                    <th> </th>
                </tr>
            </thead>

        clauseTable =
            <table id="clause-list">
                {header}
                <tbody>
                    {clauseRows}
                </tbody>
            </table>
    }

    return clauseTable
}

export default ClauseTable
