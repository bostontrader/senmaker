import AppActionTypes from './AppActionTypes'
import AppStore       from './AppStore'

import NoundActionTypes    from '../dictionary/nound/NoundActionTypes'
import {PluralizationRule} from '../dictionary/nound/NoundConstants'
import syllabus            from '../Syllabus'

describe('AppStore', function() {

    beforeEach(function() {
        this.state = AppStore.getInitialState()

        this.dispatch = action => {
            this.state = AppStore.reduce(this.state, action)
        }
    })


    describe('Misc', function() {

        //it('ON_APP_RESET', function() {
            //const oldState = this.state
            //this.dispatch({
                //type: AppActionTypes.ON_LESSON_NEXT
            //})
            //expect(oldState).not.toBe(this.state)

            //this.dispatch({
                //type: AppActionTypes.ON_APP_RESET
            //})
            //expect(oldState).toBe(this.state)
        //})

        /**
         * Starting from the beginning verify that we can step through all the lessons until the end.
         */
        it('ON_LESSON_NEXT, ON_LESSON_PREVIOUS', function() {

            const lessonCount  = Object.keys(syllabus).length

            let currentLevel = 0
            let currentLesson = this.state.getIn(['level','currentLesson'])
            let syllabusEntry = syllabus[currentLesson]

            while(currentLevel < lessonCount ) {
                expect(this.state.getIn(['level','currentLevel'])).toBe(currentLevel)
                expect(this.state.getIn(['level','currentLesson'])).toBe(currentLesson)

                expect(this.state.getIn(['level','firstLesson'])).toBe( currentLevel === 0 )
                expect(this.state.getIn(['level','lastLesson'])) .toBe( !syllabusEntry.next )

                this.dispatch({
                    type: AppActionTypes.ON_LESSON_NEXT
                })

                currentLevel++
                currentLesson = this.state.getIn(['level','currentLesson'])
                syllabusEntry = syllabus[syllabusEntry.next]
            }

            // currentLevel is too high as an artifact of the operation of the while loop.  Fix.
            currentLevel--

            // One more time at the end, nothing should change.
            this.dispatch({
                type: AppActionTypes.ON_LESSON_NEXT
            })
            expect(this.state.getIn(['level','currentLevel'])).toBe(currentLevel)
            expect(this.state.getIn(['level','currentLesson'])).toBe(currentLesson)
            expect(this.state.getIn(['level','firstLesson'])).toBe(false)
            expect(this.state.getIn(['level','lastLesson'])).toBe(true)


            // Now step backwards until the first lesson.
            syllabusEntry = syllabus[currentLesson]

            while(currentLevel >= 0 ) {
                expect(this.state.getIn(['level','currentLevel'])).toBe(currentLevel)
                expect(this.state.getIn(['level','currentLesson'])).toBe(currentLesson)

                expect(this.state.getIn(['level','firstLesson'])).toBe( currentLevel === 0 )
                expect(this.state.getIn(['level','lastLesson'])) .toBe( !syllabusEntry.next )

                this.dispatch({
                    type: AppActionTypes.ON_LESSON_PREVIOUS
                })

                currentLevel--
                currentLesson = this.state.getIn(['level','currentLesson'])
                syllabusEntry = syllabus[syllabusEntry.prev]
            }

            // currentLevel is too low as an artifact of the operation of the while loop.  Fix.
            currentLevel++

            // One more time at the end, nothing should change.
            this.dispatch({
                type: AppActionTypes.ON_LESSON_PREVIOUS
            })
            expect(this.state.getIn(['level','currentLevel'])).toBe(currentLevel)
            expect(this.state.getIn(['level','currentLesson'])).toBe(currentLesson)
            expect(this.state.getIn(['level','firstLesson'])).toBe(true)
            expect(this.state.getIn(['level','lastLesson'])).toBe(false)
        })

    })

    //describe('Nound', function() {

        //it('ON_CHANGE_SELECTED_NOUND', function() {
            //this.dispatch({
                //type: NoundActionTypes.ON_CHANGE_SELECTED_NOUND,
                //nound: {id:'n-666', base: 'box', plural: 'boxes', pluralization_rule: PluralizationRule.Append_es}
            //})
            //console.log('AppStore.test',this.state)
            //expect(this.state.get('mostRecentlySelectedNound')).toEqual(
                //{id:'n-666', base: 'box', plural: 'boxes', pluralization_rule: PluralizationRule.Append_es}
            //)
        //})

    //})

})
