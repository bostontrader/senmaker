// @flow
import React from 'react'

import VPRow from './VPRow'

function VPTable(props:Object):?Object {

    let vpTable:?Object = null

    const vpRows:Object = [...props.vp.getIn(['dict','coll']).values()].map(vp => (
        <VPRow key={vp.get('id')} vp={vp} strings={props.strings} />
    ))

    if (vpRows.length > 0) {
        vpTable =
            <table id="vp-list">
                <thead>
                <tr>
                    <th>Verb Phrase</th>
                    <th> </th>
                </tr>
                </thead>
                <tbody>
                {[...props.vp.getIn(['dict','coll']).values()].map(vp => (
                    <VPRow key={vp.get('id')} vp={vp} strings={props.strings} />
                ))}
                </tbody>
            </table>
    }


    return(vpTable)
}

export default VPTable
