import React from 'react'

//import {NoundPanelLevel} from '../../../data/dictionary/nound/NoundConstants'
import NoundRow from './NoundRow'

function NoundTable(props) {

    let noundTable = null
    //const level = props.level.getIn(['currentAppLevelConfig','noundPanel'])
    /*if( level >= NoundPanelLevel.PLURALIZATION) {
        noundTable =
            <table id="nound-list">
                <thead>
                    <tr>
                        <th>Base</th>
                        <th>Plural</th>
                        <th> </th>
                    </tr>
                </thead>
                <tbody>
                    {[...props.nouns.values()].reverse().map(noun => (
                        <NoundRow
                            key={noun.id}
                            editing={props.editingNoun}
                            level={level}
                            noun={noun}
                            onDeleteNoun={props.onDeleteNoun}
                            onClickEditNound={props.onClickEditNound}
                            strings = {props.strings}
                        />
                    ))}
                </tbody>
            </table>
    } else if( level >= NoundPanelLevel.BASE) {*/

    noundTable =
            <table id="nound-list">
                <thead>
                    <tr>
                        <th>Noun</th>
                        <th> </th>
                    </tr>
                </thead>
                <tbody>
                    {[...props.nound.getIn(['dict','coll']).values()].map(noun => (
                        <NoundRow key={noun.get('id')} noun={noun} strings={props.strings} />
                    ))}
                </tbody>
            </table>
    //}

    return(noundTable)
}

export default NoundTable
