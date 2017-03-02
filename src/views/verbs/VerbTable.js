import React from 'react'

import {VerbPanelLevel} from '../../data/verbs/VerbConstants'
import VerbItem from './VerbItem'

function VerbTable(props) {

    let verbTable = <div></div>
    if( props.level >= VerbPanelLevel.PAST_TENSE) {
        verbTable = <table id="verb-list">
            <thead>
            <tr>
                <th>Base</th>
                <th>Past Tense</th>
                <th> </th>
            </tr>
            </thead>
            <tbody>
            {[...props.verbs.values()].reverse().map(verb => (
                <VerbItem
                    key={verb.id}
                    editing={props.editingVerb}
                    level={props.level}
                    verb={verb}
                    onDeleteVerb={props.onDeleteVerb}
                    onEditVerb={props.onEditVerb}
                />
            ))}
            </tbody>
        </table>
    } else if (props.level >= VerbPanelLevel.BASE) {
        verbTable = <table id="verb-list">
            <thead>
            <tr>
                <th>Base</th>
                <th> </th>
            </tr>
            </thead>
            <tbody>
            {[...props.verbs.values()].reverse().map(verb => (
                <VerbItem
                    key={verb.id}
                    editing={props.editingVerb}
                    level={props.level}
                    verb={verb}
                    onDeleteVerb={props.onDeleteVerb}
                    onEditVerb={props.onEditVerb}
                />
            ))}
            </tbody>
        </table>
    }

    return verbTable

}

export default VerbTable
