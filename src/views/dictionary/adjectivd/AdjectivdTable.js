// @flow
import React from 'react'

import AdjectivdRow from './AdjectivdRow'

function AdjectivdTable(props:Object):?Object {

    let adjectivdTable:?Object = null

    const adjectivdRows:Object = [...props.adjectivd.getIn(['dict','coll']).values()].map(adjectivd => (
        <AdjectivdRow key={adjectivd.get('id')} adjectivd={adjectivd} adjectivdPanelLevel={props.adjectivdPanelLevel} strings={props.strings} />
    ))

    if (adjectivdRows.length > 0) {
        adjectivdTable =
            <table id="adjectivd-list">
                <thead>
                    <tr>
                        <th>Adjective</th>
                        <th> </th>
                    </tr>
                </thead>
                <tbody>
                    {adjectivdRows}
                </tbody>
            </table>
    }

    return adjectivdTable
}

export default AdjectivdTable
