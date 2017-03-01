import React from 'react'

import VerbItem from './VerbItem'

function VerbTable(props) {

    return (

        <table id="verb-list">
            <thead>
            <tr>
                <th>Base</th>
                <th>Past Tense</th>
                <th></th>

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
    )
}

/*function VerbItem(props) {
    const {verb} = props;
    const onEditVerb = () => props.onEditVerb(verb)

    return (
        <tr>
            <td>
                {verb.base}
            </td>
            <td>
                {verb.pastTense}
            </td>
            <td>
                <button type="button"  onClick={onEditVerb} >Edit</button>
            </td>

        </tr>
    )
}*/

export default VerbTable
