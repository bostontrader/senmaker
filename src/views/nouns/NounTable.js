import React from 'react'

import {NounPanelLevel} from '../../data/nouns/NounConstants'
import NounItem from './NounItem'

function NounTable(props) {

    let nounTable = <div>Noun Table</div>
    const level = props.level.getIn(['currentAppLevelConfig','nounPanel'])
    if( level >= NounPanelLevel.PLURALIZATION) {
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
                            level={level}
                            noun={noun}
                            onDeleteNoun={props.onDeleteNoun}
                            onEditNoun={props.onEditNoun}
                            strings = {props.strings}
                        />
                    ))}
                </tbody>
            </table>
    } else if( level >= NounPanelLevel.BASE) {
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
                            level={level}
                            onDeleteNoun={props.onDeleteNoun}
                            onEditNoun={props.onEditNoun}
                            strings = {props.strings}
                        />
                    ))}
                </tbody>
            </table>
    }

    return(nounTable)
}

export default NounTable
