// @flow
import React from 'react'

import AdjectivdRow          from './AdjectivdRow'

function AdjectivdTable(props:Object):Object {

    let adjectivdTable:Object =
        <table id="adjectivd-list">
            <thead>
            <tr>
                <th>Base</th>
                <th> </th>
            </tr>
            </thead>
            <tbody>
            {[...props.adjectivd.getIn(['dict','coll']).values()].map(adjectivd => (
                <AdjectivdRow key={adjectivd.get('id')} adjectivd={adjectivd} strings={props.strings} />
            ))}
            </tbody>
        </table>

    return adjectivdTable
}

export default AdjectivdTable
