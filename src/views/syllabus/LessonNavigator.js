import React from 'react'
import AppActions from '../../data/AppActions'

/**
The LessonNavigator is responsible for displaying the control to navigate
 between lessons.  This obviously means next and previous lessons, but it also does reset.
 */
function LessonNavigator(props) {

    const style = {
        border: '1px solid black',
        margin: '5px'
    }

    const s = props.strings.lessonNavigator

    const previousButton = (props.app.getIn(['level','firstLesson'])) ? '' :
        <button id="lesson-previous" onClick={props.onLevelPrevious}>{s.previousLevel}</button>


    const currentLesson  = props.app.getIn(['level','currentLesson'])
    const currentQuizPassed = props.quiz.getIn([currentLesson,'passed'])

    // If we have passed the quiz for this lesson and are not yet on the last lesson,
    // then there is another lesson to proceed to.
    const onClickNext = AppActions.lessonNext
    let nextButton = ''
    if( currentQuizPassed && !props.app.getIn(['level','lastLesson'])) {
        //nextButton = <button id="lesson-next" onClick={props.onLevelNext}>{s.nextLevel}</button>
        nextButton = <button id="lesson-next" onClick={onClickNext}>{s.nextLevel}</button>
    }

    // Always have a reset button.  Maybe we don't want this if the state has just been reset
    // but that's of minor importance.
    const resetButton = //(props.level.get('minLevel') && !currentQuizState) ? '' :
        <button id="level-reset" onClick={props.onLevelReset}>{s.reset}</button>

    return (
        <div className="lesson-navigator" style={style}>
            <p>{s.level} {props.app.getIn(['level','currentLevel'])}</p>
            {previousButton}
            {nextButton}
            {resetButton}
            <img onClick={props.onLangEng} src="/img/us_flag.gif" width="28" height="20" alt=""/>
            <img onClick={props.onLangChn} src="/img/chinese_flag.gif" width="28" height="20" alt=""/>
        </div>
    )

}

export default LessonNavigator
