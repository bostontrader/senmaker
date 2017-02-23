import React from 'react'

function NounTable(props) {

    return (

        <table id="noun-list">
            <thead>
            <tr>
                <th>Base</th>
                <th>Plural</th>
                <th></th>

            </tr>
            </thead>
            <tbody>
            {[...props.nouns.values()].reverse().map(noun => (
                <NounItem
                    key={noun.id}
                    editing={props.editing}
                    noun={noun}
                    onDeleteNoun={props.onDeleteNoun}
                    onEditNoun={props.onEditNoun}
                />
            ))}
            </tbody>
        </table>
    )
}

function NounItem(props) {
    const {noun} = props;
    const onEditNoun = () => props.onEditNoun(noun)

    return (
        <tr>
            <td>
                {noun.base}
            </td>
            <td>
                {noun.plural}
            </td>
            <td>
                <button type="button"  onClick={onEditNoun} >Edit</button>
            </td>

        </tr>
    )
}

export default NounTable


