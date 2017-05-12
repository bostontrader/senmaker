import AppActionTypes from './AppActionTypes'
import AppStore     from './AppStore'
import initialState from '../../data/StateGetter'

import syllabus            from '../Syllabus'

describe('AppStore', () => {

    it('ON_APP_RESET', () => {

        // Do anything, doesn't matter what, to change the state away from the initial condition
        let newState = AppStore.reduce(initialState.getIn(['app']), {type: AppActionTypes.ON_LESSON_NEXT})
        expect(initialState.getIn(['app'])).not.toBe(newState)

        newState = AppStore.reduce(newState, {type: AppActionTypes.ON_APP_RESET})
        expect(initialState.getIn(['app'])).toBe(newState)
    })


    /**
     * Starting from the beginning verify that we can step through all the lessons until the end.
     */
    it('ON_LESSON_NEXT, ON_LESSON_PREVIOUS', () => {

        let newState = initialState.getIn(['app'])
        const lessonCount  = Object.keys(syllabus).length

        let currentLevel = 0
        let currentLesson = newState.getIn(['level','currentLesson'])

        let syllabusEntry = syllabus[currentLesson]

        while(currentLevel < lessonCount ) {
            expect(newState.getIn(['level','currentLevel'])).toBe(currentLevel)
            expect(newState.getIn(['level','currentLesson'])).toBe(currentLesson)
            expect(newState.getIn(['level','firstLesson'])).toBe( currentLevel === 0 )
            expect(newState.getIn(['level','lastLesson'])) .toBe( !syllabusEntry.next )

            newState = AppStore.reduce(newState, {type: AppActionTypes.ON_LESSON_NEXT})

            currentLevel++
            currentLesson = newState.getIn(['level','currentLesson'])
            currentLesson = newState.getIn(['level','currentLesson'])
            syllabusEntry = syllabus[syllabusEntry.next]
        }

        // currentLevel is too high as an artifact of the operation of the while loop.  Fix.
        currentLevel--

        // One more time at the end, nothing should change.
        newState = AppStore.reduce(newState, {type: AppActionTypes.ON_LESSON_NEXT})

        expect(newState.getIn(['level','currentLevel'])).toBe(currentLevel)
        expect(newState.getIn(['level','currentLesson'])).toBe(currentLesson)
        expect(newState.getIn(['level','firstLesson'])).toBe(false)
        expect(newState.getIn(['level','lastLesson'])).toBe(true)


        // Now step backwards until the first lesson.
        syllabusEntry = syllabus[currentLesson]

        while(currentLevel >= 0 ) {
            expect(newState.getIn(['level','currentLevel'])).toBe(currentLevel)
            expect(newState.getIn(['level','currentLesson'])).toBe(currentLesson)
            expect(newState.getIn(['level','firstLesson'])).toBe( currentLevel === 0 )
            expect(newState.getIn(['level','lastLesson'])) .toBe( !syllabusEntry.next )

            newState = AppStore.reduce(newState, {type: AppActionTypes.ON_LESSON_PREVIOUS})

            currentLevel--
            currentLesson = newState.getIn(['level','currentLesson'])
            syllabusEntry = syllabus[syllabusEntry.prev]
        }

        // currentLevel is too low as an artifact of the operation of the while loop.  Fix.
        currentLevel++

        // One more time at the end, nothing should change.
        newState = AppStore.reduce(newState, {type: AppActionTypes.ON_LESSON_PREVIOUS})
        expect(newState.getIn(['level','currentLevel'])).toBe(currentLevel)
        expect(newState.getIn(['level','currentLesson'])).toBe(currentLesson)
        expect(newState.getIn(['level','firstLesson'])).toBe(true)
        expect(newState.getIn(['level','lastLesson'])).toBe(false)
    })

})
