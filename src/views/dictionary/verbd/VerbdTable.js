import React from 'react'

//import {VerbdPanelLevel} from '../../../data/dictionary/verbd/VerbdConstants'
import VerbdRow from './VerbdRow'

function VerbdTable(props) {

    let verbdTable = null
    //const level = props.level.getIn(['currentAppLevelConfig','verbdPanel'])
    const level = props.app.getIn(['level','currentLevel'])
    //if( level >= VerbdPanelLevel.PAST_TENSE) {
    if (level >= 7) {
        verbdTable =
            <table id="verbd-list">
                <thead>
                    <tr>
                        <th>Base</th>
                        <th>Past Tense</th>
                        <th> </th>
                    </tr>
                </thead>
                <tbody>
                {[...props.verbd.getIn(['dict','coll']).values()].map(verb => (
                    <VerbdRow key={verb.get('id')} verb={verb} level={level} strings={props.strings} />
                ))}
                </tbody>
            </table>

    } else {

        verbdTable =
            <table id="verbd-list">
                <thead>
                    <tr>
                        <th>Verb</th>
                        <th> </th>
                    </tr>
                </thead>
                <tbody>
                    {[...props.verbd.getIn(['dict','coll']).values()].map(verb => (
                        <VerbdRow key={verb.get('id')} verb={verb} level={level} strings={props.strings} />
                    ))}
                </tbody>
            </table>
    }

    return(verbdTable)

}

export default VerbdTable
