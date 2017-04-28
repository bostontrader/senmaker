// @flow
import React from 'react'

import ClauseRow from './ClauseRow'

function ClauseTable(props:Object):Object {

    let clauseTable:Object
    //const level = props.level.getIn(['currentAppLevelConfig','clausePanel'])
    /*if( level >= VPPanelLevel.PLURALIZATION) {
        clauseTable =
            <table id="clause-list">
                <thead>
                    <tr>
                        <th>Base</th>
                        <th>Plural</th>
                        <th> </th>
                    </tr>
                </thead>
                <tbody>
                    {[...props.verbs.values()].reverse().map(verb => (
                        <ClauseRow
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

    clauseTable =
            <table id="clause-list">
                <thead>
                    <tr>
                        <th>Clause</th>
                        <th> </th>
                    </tr>
                </thead>
                <tbody>
                    {[...props.clause.getIn(['dict','coll']).values()].map(clause => (
                        <ClauseRow key={clause.get('id')} clause={clause} strings={props.strings} />
                    ))}
                </tbody>
            </table>
    //}

    return(clauseTable)
}

export default ClauseTable
