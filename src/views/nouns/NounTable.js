import React from 'react'

import {NounPanelLevel} from '../../data/nouns/NounConstants'
import NounItem from './NounItem'

function NounTable(props) {

    let nounTable = <div></div>
    if( props.level.nounPanel >= NounPanelLevel.PLURALIZATION) {
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
                            level={props.level.nounPanel}
                            noun={noun}
                            onDeleteNoun={props.onDeleteNoun}
                            onEditNoun={props.onEditNoun}
                        />
                    ))}
                </tbody>
            </table>
    } else if( props.level.nounPanel >= NounPanelLevel.BASE) {
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
                            level={props.level.nounPanel}
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
