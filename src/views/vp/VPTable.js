// @flow
import React from 'react'

import VPRow from './VPRow'

function VPTable(props:Object):Object {

    let vpTable:Object
    //const level = props.level.getIn(['currentAppLevelConfig','vpPanel'])
    /*if( level >= VPPanelLevel.PLURALIZATION) {
        vpTable =
            <table id="vp-list">
                <thead>
                    <tr>
                        <th>Base</th>
                        <th>Plural</th>
                        <th> </th>
                    </tr>
                </thead>
                <tbody>
                    {[...props.verbs.values()].reverse().map(verb => (
                        <VPRow
                            key={verb.id}
                            editing={props.editingNoun}
                            level={level}
                            verb={verb}
                            onDeleteNoun={props.onDeleteNoun}
                            onClickEditVP={props.onClickEditVP}
                            strings = {props.strings}
                        />
                    ))}
                </tbody>
            </table>
    } else if( level >= VPPanelLevel.BASE) {*/

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
    //}

    return(vpTable)
}

export default VPTable
