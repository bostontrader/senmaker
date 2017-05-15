// @flow
import React from 'react'

import NPRow from './NPRow'

function NPTable(props:Object):Object {

    let npTable:Object

    const npRows:Object = [...props.np.getIn(['dict','coll']).values()].map(np => (
        <NPRow key={np.get('id')} np={np} strings={props.strings} />
    ))

    let header:?Object = null

    if (npRows.length > 0) {
        header =
            <thead>
            <tr>
                <th>Noun Phrase</th>
                <th> </th>
            </tr>
            </thead>
    }

    npTable =
            <table id="np-list">
                {header}
                <tbody>
                    {npRows}
                </tbody>
            </table>

    return(npTable)
}

export default NPTable
