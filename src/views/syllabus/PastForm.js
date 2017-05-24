// @flow
import React from 'react'

import LessonNavigator   from './LessonNavigator'
import VerbdPanel        from '../dictionary/verbd/VerbdPanel'
import {VerbdPanelLevel} from '../../data/dictionary/verbd/VerbdConstants'

function PastForm(props:Object):Object {

    const style:Object = {
        border: '1px solid black',
        margin: '5px'
    }

    const q:Object = props.quiz
    const s:Object = props.strings.get('strings').pastForm
    const sm:Object = props.strings.get('strings').misc

    return(
        <div>
            <LessonNavigator {...props} />
            <div id='help' style={style}>
                <p>{s.help10}</p>
                <p>{s.help11}</p>
            </div>
            <VerbdPanel verbdPanelLevel={VerbdPanelLevel.PAST_FORM} {...props} />
            <div id='quiz' style={style}>
                <h3>{sm.quiz}</h3>
                <table>
                    <tbody>

                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default PastForm
