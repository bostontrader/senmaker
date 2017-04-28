// @flow
import React from 'react'

import VerbdRow          from './VerbdRow'
import {VerbdPanelLevel} from '../../../data/dictionary/verbd/VerbdConstants'

function VerbdTable(props:Object):Object {

    let verbdTable:Object = <div></div>

    switch(props.verbdPanelLevel) {
        case VerbdPanelLevel.BASE:
            verbdTable =
                <table id="verbd-list">
                    <thead>
                    <tr>
                        <th>Verb</th>
                        <th> </th>
                    </tr>
                    </thead>
                    <tbody>
                    {[...props.verbd.getIn(['dict','coll']).values()].map(verbd => (
                        <VerbdRow key={verbd.get('id')} verbd={verbd} strings={props.strings} />
                    ))}
                    </tbody>
                </table>
            break
        case VerbdPanelLevel.PAST_TENSE:
            verbdTable =
                <table id="verbd-list">
                    <thead>
                    <tr>
                        <th>Base</th>
                        <th>Past Tense</th>
                        <th> </th>
                    </tr>
                    </thead>
                    <tbody>
                    {[...props.verbd.getIn(['dict','coll']).values()].map(verbd => (
                        <VerbdRow key={verbd.get('id')} verbd={verbd} strings={props.strings} />
                    ))}
                    </tbody>
                </table>
            break
        default:
            // verbdTable already has a suitable default. Do nothing.

    }

    return(verbdTable)
}

export default VerbdTable
