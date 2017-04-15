import React from 'react'

//import {VerbdPanelLevel} from '../../../data/dictionary/verbd/VerbdConstants'
import VerbdRow from './VerbdRow'

function VerbdTable(props) {

    let verbdTable = null
    /*const level = props.level.getIn(['currentAppLevelConfig','verbdPanel'])
    if( level >= VerbdPanelLevel.PAST_TENSE) {
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
                    {[...props.verbs.values()].reverse().map(verb => (
                        <VerbdRow
                            key={verb.id}
                            editing={props.editingVerb}
                            level={level}
                            verb={verb}
                            onDeleteVerb={props.onDeleteVerb}
                            onEditVerb={props.onEditVerb}
                            strings = {props.strings}
                        />
                    ))}
                </tbody>
            </table>
    } else if (level >= VerbdPanelLevel.BASE) {*/

        verbdTable =
            <table id="verbd-list">
                <thead>
                    <tr>
                        <th>Verb</th>
                        <th> </th>
                    </tr>
                </thead>
                <tbody>
                    {[...props.verbd.getIn(['dict','coll']).values()].map(verb => (
                        <VerbdRow key={verb.get('id')} verb={verb} strings={props.strings} />
                    ))}
                </tbody>
            </table>
    //}

    return(verbdTable)

}

export default VerbdTable
