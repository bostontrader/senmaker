// @flow
import React from 'react'

import NoundRow          from './NoundRow'
import {NoundPanelLevel} from '../../../data/dictionary/nound/NoundConstants'

function NoundTable(props:Object):?Object {

    let noundTable:?Object = null

    const noundRows:Object = [...props.nound.getIn(['dict','coll']).values()].map(nound => (
        <NoundRow key={nound.get('id')} nound={nound} noundPanelLevel={props.noundPanelLevel} strings={props.strings} />
    ))

    let header:?Object = null

    if (noundRows.length > 0) {
        switch(props.noundPanelLevel) {
            case NoundPanelLevel.BASE:
                header =
                    <thead>
                    <tr>
                        <th>Base Form</th>
                        <th> </th>
                    </tr>
                    </thead>

                break
            case NoundPanelLevel.PLURALIZATION:
                header =
                    <thead>
                    <tr>
                        <th>Base Form</th>
                        <th>Plural</th>
                        <th> </th>
                    </tr>
                    </thead>
                break
            default:
                // header already has a suitable default. Do nothing.

        }

        noundTable =
            <table id="nound-list">
                {header}
                <tbody>
                    {noundRows}
                </tbody>
            </table>
    }

    return noundTable
}

export default NoundTable
