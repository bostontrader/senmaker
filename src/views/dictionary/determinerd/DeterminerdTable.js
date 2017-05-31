// @flow
import React from 'react'

import DeterminerdRow from './DeterminerdRow'

function DeterminerdTable(props:Object):?Object {

    let determinerdTable:?Object = null

    const sortedDeterminerds:Object = props.determinerd.getIn(['dict','coll']).sort((a,b)=>{
        if (a.get('base') <   b.get('base')) {return -1 }
        if (a.get('base') >   b.get('base')) {return 1 }
        if (a.get('base') === b.get('base')) {return 0 }
    })

    const determinerdRows:Object = [...sortedDeterminerds.values()].map(determinerd => (
        <DeterminerdRow key={determinerd.get('id')} determinerd={determinerd} determinerdPanelLevel={props.determinerdPanelLevel} strings={props.strings} />
    ))

    if (determinerdRows.length > 0) {
        determinerdTable =
            <table id="determinerd-list">
                <thead>
                    <tr>
                        <th>Determiner</th>
                        <th> </th>
                    </tr>
                </thead>
                <tbody>
                    {determinerdRows}
                </tbody>
            </table>
    }

    return determinerdTable
}

export default DeterminerdTable
