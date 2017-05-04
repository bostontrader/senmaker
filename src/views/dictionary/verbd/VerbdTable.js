// @flow
import React from 'react'

import VerbdRow          from './VerbdRow'
import {VerbdPanelLevel} from '../../../data/dictionary/verbd/VerbdConstants'

function VerbdTable(props:Object):?Object {

    let verbdTable:?Object = null

    const verbdRows:Object = [...props.verbd.getIn(['dict','coll']).values()].map(verbd => (
        <VerbdRow key={verbd.get('id')} verbd={verbd} verbdPanelLevel={props.verbdPanelLevel} strings={props.strings} />
    ))

    let header:?Object = null

    if (verbdRows.length > 0) {
        switch(props.verbdPanelLevel) {
            case VerbdPanelLevel.BASE:
                header =
                    <thead>
                    <tr>
                        <th>Base Form</th>
                        <th> </th>
                    </tr>
                    </thead>

                break
            case VerbdPanelLevel.PAST_TENSE:
                header =
                    <thead>
                    <tr>
                        <th>Base Form</th>
                        <th>Past Tense</th>
                        <th> </th>
                    </tr>
                    </thead>
                break
            default:
            // header already has a suitable default. Do nothing.

        }

        verbdTable =
            <table id="verbd-list">
                {header}
                <tbody>
                    {verbdRows}
                </tbody>
            </table>
    }

    return verbdTable
}

export default VerbdTable
