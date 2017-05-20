// @flow
import React from 'react'

import {langCode}    from '../../data/I18NConstants'
import AppActions    from '../../data/app/AppActions'
import StringActions from '../../data/strings/StringActions'

/**
The LessonNavigator is responsible for displaying the control to navigate
 between lessons.  This obviously means next and previous lessons, but it also does reset and cheat.
 */
function LessonNavigator(props:Object):Object {

    const style:Object = {
        border: '1px solid black',
        margin: '5px'
    }

    const s:Object = props.strings.lessonNavigator

    const enFlag:Object | string = (props.strings.lang ===langCode.en) ? '' :
        <img id="enFlag" onClick={StringActions.onLangEN} src="/img/us_flag.gif" width="48" height="40" alt=""/>

    const zhFlag:Object | string = (props.strings.lang ===langCode.zh) ? '' :
        <img id="zhFlag" onClick={StringActions.onLangZH} src="/img/chinese_flag.gif" width="48" height="40" alt=""/>

    const levelIndicator:string = (props.strings.lang ===langCode.en) ?
        s.level + ' ' + props.app.getIn(['level','currentLevel']) :
        props.app.getIn(['level','currentLevel']) + ' ' + s.level

    const previousButton:Object | string = (props.app.getIn(['level','firstLesson'])) ? '' :
        <button id="lesson-previous" onClick={AppActions.onLessonPrevious}>{s.previousLevel}</button>

    const currentLesson:Object  = props.app.getIn(['level','currentLesson'])
    const currentQuizPassed:Object = props.quiz.getIn([currentLesson,'passed'])
    //const nextButton = ( currentQuizPassed && !props.app.getIn(['level','lastLesson'])) ?
        //<button id="lesson-next" onClick={AppActions.onLessonNext}>{s.nextLevel}</button> : ''
    const nextButton = <button id="lesson-next" onClick={AppActions.onLessonNext}>{s.nextLevel}</button>

    // Always have a reset button.  Maybe we don't want this if the state has just been reset
    // but that's of minor importance.
    const resetButton:Object = //(props.level.get('minLevel') && !currentQuizState) ? '' :
        <button id="level-reset" onClick={AppActions.onAppReset}>{s.reset}</button>

    // Only some lessons support the cheat button.
    const cheatButton:Object | string = (props.cheat) ?
        <button id="cheat" onClick={AppActions.onCheat()}>{'Cheat'}</button> : ''

    return (
        <div className="lesson-navigator" style={style}>
            <h3>{levelIndicator}. {props.strings[props.app.getIn(['level','currentLesson'])].title} {enFlag}{zhFlag}</h3>
            {previousButton}
            {nextButton}
            {resetButton}
            {cheatButton}
            v.0.9.8

        </div>
    )
}

export default LessonNavigator
