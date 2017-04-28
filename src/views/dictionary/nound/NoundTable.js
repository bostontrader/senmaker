// @flow
import React from 'react'

import NoundRow          from './NoundRow'
import {NoundPanelLevel} from '../../../data/dictionary/nound/NoundConstants'

function NoundTable(props:Object):Object {

    let noundTable = <div></div>

    switch(props.noundPanelLevel) {
        case NoundPanelLevel.BASE:
            noundTable =
                <table id="nound-list">
                    <thead>
                    <tr>
                        <th>Base</th>
                        <th> </th>
                    </tr>
                    </thead>
                    <tbody>
                    {[...props.nound.getIn(['dict','coll']).values()].map(nound => (
                        <NoundRow key={nound.get('id')} nound={nound} strings={props.strings} />
                    ))}
                    </tbody>
                </table>
            break
        case NoundPanelLevel.PLURALIZATION:
            noundTable =
                <table id="nound-list">
                    <thead>
                    <tr>
                        <th>Base</th>
                        <th>Plural</th>
                        <th> </th>
                    </tr>
                    </thead>
                    <tbody>
                    {[...props.nound.getIn(['dict','coll']).values()].map(nound => (
                        <NoundRow key={nound.get('id')} nound={nound} strings={props.strings} />
                    ))}
                    </tbody>
                </table>
            break
        default:
            // noundTable already has a suitable default. Do nothing.

    }

    return noundTable
}

export default NoundTable
