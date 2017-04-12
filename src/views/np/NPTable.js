import React from 'react'

//import {NPPanelLevel} from '../../../data/dictionary/np/NPConstants'
//import NPRow from './NPRow'

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
                    {[...props.nps.values()].reverse().map(np => (
                        <NPRow
                            key={np.id}
                            editing={props.editingNoun}
                            level={level}
                            np={np}
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
                        <th>Noun Phrases</th>
                        <th> </th>
                    </tr>
                </thead>
                <tbody>
                    {[...props.np.getIn(['nps']).values()].map(np => (
                        <NPRow key={np.get('id')} np={np} strings={props.strings} />
                    ))}
                </tbody>
            </table>
    //

    return npTable

}

export default NPTable
