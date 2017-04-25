// @flow
import React from 'react'

import NPRow from './NPRow'

function NPTable(props:Object):Object {

    let npTable:Object
    //const level = props.level.getIn(['currentAppLevelConfig','npPanel'])
    /*if( level >= NPPanelLevel.PLURALIZATION) {
        npTable =
            <table id="np-list">
                <thead>
                    <tr>
                        <th>Base</th>
                        <th>Plural</th>
                        <th> </th>
                    </tr>
                </thead>
                <tbody>
                    {[...props.nouns.values()].reverse().map(noun => (
                        <NPRow
                            key={noun.id}
                            editing={props.editingNoun}
                            level={level}
                            noun={noun}
                            onDeleteNoun={props.onDeleteNoun}
                            onClickEditNP={props.onClickEditNP}
                            strings = {props.strings}
                        />
                    ))}
                </tbody>
            </table>
    } else if( level >= NPPanelLevel.BASE) {*/

    npTable =
            <table id="np-list">
                <thead>
                    <tr>
                        <th>Noun Phrase</th>
                        <th> </th>
                    </tr>
                </thead>
                <tbody>
                    {[...props.np.getIn(['dict','coll']).values()].map(np => (
                        <NPRow key={np.get('id')} np={np} strings={props.strings} />
                    ))}
                </tbody>
            </table>
    //}

    return(npTable)
}

export default NPTable
