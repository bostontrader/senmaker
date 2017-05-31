// @flow
import React from 'react'

import ConjunctiondRow from './ConjunctiondRow'

function ConjunctiondTable(props:Object):?Object {

    let conjunctiondTable:?Object = null

    const sortedConjunctionds:Object = props.conjunctiond.getIn(['dict','coll']).sort((a,b)=>{
        if (a.get('base') <   b.get('base')) {return -1 }
        if (a.get('base') >   b.get('base')) {return 1 }
        if (a.get('base') === b.get('base')) {return 0 }
    })

    const conjunctiondRows:Object = [...sortedConjunctionds.values()].map(conjunctiond => (
        <ConjunctiondRow key={conjunctiond.get('id')} conjunctiond={conjunctiond} conjunctiondPanelLevel={props.conjunctiondPanelLevel} strings={props.strings} />
    ))

    if (conjunctiondRows.length > 0) {
        conjunctiondTable =
            <table id="conjunctiond-list">
                <thead>
                    <tr>
                        <th>Conjunction</th>
                        <th> </th>
                    </tr>
                </thead>
                <tbody>
                    {conjunctiondRows}
                </tbody>
            </table>
    }

    return conjunctiondTable
}

export default ConjunctiondTable
