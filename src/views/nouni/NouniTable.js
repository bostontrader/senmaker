import React from 'react'

//import {NouniPanelLevel} from '../../../data/dictionary/nouni/NouniConstants'
import NouniRow from './NouniRow'

function NouniTable(props) {

    let nouniTable = null
    //const level = props.level.getIn(['currentAppLevelConfig','nouniPanel'])
    /*if( level >= NouniPanelLevel.PLURALIZATION) {
        nouniTable =
            <table id="nouni-list">
                <thead>
                    <tr>
                        <th>Base</th>
                        <th>Plural</th>
                        <th> </th>
                    </tr>
                </thead>
                <tbody>
                    {[...props.nouns.values()].reverse().map(noun => (
                        <NouniRow
                            key={noun.id}
                            editing={props.editingNoun}
                            level={level}
                            noun={noun}
                            onDeleteNoun={props.onDeleteNoun}
                            onClickEditNouni={props.onClickEditNouni}
                            strings = {props.strings}
                        />
                    ))}
                </tbody>
            </table>
    } else if( level >= NouniPanelLevel.BASE) {*/

    nouniTable =
            <table id="nouni-list">
                <thead>
                    <tr>
                        <th>Noun</th>
                        <th> </th>
                    </tr>
                </thead>
                <tbody>
                    {[...props.nouni.getIn(['nouns']).values()].map(noun => (
                        <NouniRow key={noun.get('id')} noun={noun} strings={props.strings} />
                    ))}
                </tbody>
            </table>
    //}

    return(nouniTable)
}

export default NouniTable
