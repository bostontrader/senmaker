import React from 'react'

import NPRow from './NPRow'

function NPTable(props) {

    let npTable = null
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
                        <th>Noun</th>
                        <th> </th>
                    </tr>
                </thead>
                <tbody>
                    {[...props.np.getIn(['dict','coll']).values()].map(noun => (
                        <NPRow key={noun.get('id')} noun={noun} strings={props.strings} />
                    ))}
                </tbody>
            </table>
    //}

    return(npTable)
}

export default NPTable
