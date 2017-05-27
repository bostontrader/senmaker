// @flow
import React from 'react'

import AdverbdRow from './AdverbdRow'

function AdverbdTable(props:Object):?Object {

    let adverbdTable:?Object = null

    const sortedAdverbds:Object = props.adverbd.getIn(['dict','coll']).sort((a,b)=>{
        if (a.get('base') <   b.get('base')) {return -1 }
        if (a.get('base') >   b.get('base')) {return 1 }
        if (a.get('base') === b.get('base')) {return 0 }
    })

    const adverbdRows:Object = [...sortedAdverbds.values()].map(adverbd => (
        <AdverbdRow key={adverbd.get('id')} adverbd={adverbd} adverbdPanelLevel={props.adverbdPanelLevel} strings={props.strings} />
    ))

    if (adverbdRows.length > 0) {
        adverbdTable =
            <table id="adverbd-list">
                <thead>
                    <tr>
                        <th>Adverb</th>
                        <th> </th>
                    </tr>
                </thead>
                <tbody>
                    {adverbdRows}
                </tbody>
            </table>
    }

    return adverbdTable
}

export default AdverbdTable
