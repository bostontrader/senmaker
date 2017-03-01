import React from 'react'

import NounItem from './NounItem'

function NounTable(props) {

    let nounTable = <div></div>
    if( props.level >= 2) {
        nounTable =
            <table id="noun-list">
                <thead>
                <tr>
                    <th>Base</th>
                    <th>Plural</th>
                    <th> </th>
                </tr>
                </thead>
                <tbody>
                {[...props.nouns.values()].reverse().map(noun => (
                    <NounItem
                        key={noun.id}
                        editing={props.editingNoun}
                        noun={noun}
                        onDeleteNoun={props.onDeleteNoun}
                        onEditNoun={props.onEditNoun}
                    />
                ))}
                </tbody>
            </table>
    } else if( props.level >= 1) {
        nounTable =
            <table id="noun-list">
                <thead>
                <tr>
                    <th>Noun</th>
                    <th> </th>
                </tr>
                </thead>
                <tbody>
                {[...props.nouns.values()].reverse().map(noun => (
                    <NounItem
                        key={noun.id}
                        editing={props.editingNoun}
                        noun={noun}
                        level={props.level}
                        onDeleteNoun={props.onDeleteNoun}
                        onEditNoun={props.onEditNoun}
                    />
                ))}
                </tbody>
            </table>
    }

    return(nounTable)
}

export default NounTable
