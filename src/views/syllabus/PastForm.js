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

    /*const quizInsertVerbFlag = q.getIn(['verbd','insertPastForm']) ?
        <img id='insertPastFormCheck' className='checkmark' src='/img/Checked.png' alt='checkmark'/> : ''

    const quizUpdateVerbFlag = q.getIn(['verbd','updatePastForm']) ?
        <img id='updatePastFormCheck' className='checkmark' src='/img/Checked.png' alt='checkmark'/> : ''

    const quizDeleteVerbFlag = q.getIn(['verbd','deletePastForm']) ?
        <img id='deletePastFormCheck' className='checkmark' src='/img/Checked.png' alt='checkmark'/> : ''*/

    return(
        <div>
            <LessonNavigator {...props} />
            <div id='help' style={style}>
                <h1>Verb Past Form</h1>
                <p>{s.help10}</p>
                <p>{s.help11}</p>
                <p>{s.help12}</p>
                <p>{s.help13}</p>
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
