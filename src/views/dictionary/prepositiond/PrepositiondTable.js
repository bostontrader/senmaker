// @flow
import React from 'react'

import PrepositiondRow from './PrepositiondRow'

function PrepositiondTable(props:Object):?Object {

    let prepositiondTable:?Object = null

    const sortedPrepositionds:Object = props.prepositiond.getIn(['dict','coll']).sort((a,b)=>{
        if (a.get('base') <   b.get('base')) {return -1 }
        if (a.get('base') >   b.get('base')) {return 1 }
        if (a.get('base') === b.get('base')) {return 0 }
    })

    const prepositiondRows:Object = [...sortedPrepositionds.values()].map(prepositiond => (
        <PrepositiondRow key={prepositiond.get('id')} prepositiond={prepositiond} prepositiondPanelLevel={props.prepositiondPanelLevel} strings={props.strings} />
    ))

    if (prepositiondRows.length > 0) {
        prepositiondTable =
            <table id="prepositiond-list">
                <thead>
                    <tr>
                        <th>Preposition</th>
                        <th> </th>
                    </tr>
                </thead>
                <tbody>
                    {prepositiondRows}
                </tbody>
            </table>
    }

    return prepositiondTable
}

export default PrepositiondTable
