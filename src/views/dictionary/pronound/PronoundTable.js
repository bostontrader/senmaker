// @flow
import React from 'react'

import PronoundRow from './PronoundRow'

function PronoundTable(props:Object):?Object {

    let pronoundTable:?Object = null

    const sortedPronounds:Object = props.pronound.getIn(['dict','coll']).sort((a,b)=>{
        if (a.get('base') <   b.get('base')) {return -1 }
        if (a.get('base') >   b.get('base')) {return 1 }
        if (a.get('base') === b.get('base')) {return 0 }
    })

    const pronoundRows:Object = [...sortedPronounds.values()].map(pronound => (
        <PronoundRow key={pronound.get('id')} pronound={pronound} pronoundPanelLevel={props.pronoundPanelLevel} strings={props.strings} />
    ))

    if (pronoundRows.length > 0) {
        pronoundTable =
            <table id="pronound-list">
                <thead>
                    <tr>
                        <th>Pronoun</th>
                        <th> </th>
                    </tr>
                </thead>
                <tbody>
                    {pronoundRows}
                </tbody>
            </table>
    }

    return pronoundTable
}

export default PronoundTable
