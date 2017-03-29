import AppActionTypes from './AppActionTypes'
import AppStore from './AppStore'

import NoundActionTypes     from './dictionary/nound/NoundActionTypes'
import {PluralizationRule}  from './dictionary/nound/NoundConstants'
import NoundAEActionTypes   from './dictionary/nound/addedit/NoundAEActionTypes'
import VerbdAEActionTypes   from './dictionary/verbd/addedit/VerbdAEActionTypes'
import {DefinitenessSelect} from './nouni/NouniConstants'
import NouniAEActionTypes   from './nouni/addedit/NouniAEActionTypes'

describe('AppStore', function() {

    beforeEach(function() {
        // Always start with the initial state.
        this.state = AppStore.getInitialState()

        // This "dispatches" an action to our store. We can bypass the dispatcher
        // and just call the store's reduce function directly.
        this.dispatch = action => {
            this.state = AppStore.reduce(this.state, action)
        }
    })

    describe('Nouni', function() {
        it('ON_CHANGE_SELECTED_NOUND', function() {
            expect(this.state.getIn(['level','quizQuestions','noundChanged'])).toBe(false)

            this.dispatch({
                type: NoundActionTypes.ON_CHANGE_SELECTED_NOUND,
                nound: {id:'n-666', base: 'box', plural: 'boxes', pluralization_rule: PluralizationRule.Append_es}
            })
            expect(this.state.get('mostRecentlySelectedNound')).toEqual(
                {id:'n-666', base: 'box', plural: 'boxes', pluralization_rule: PluralizationRule.Append_es}
            )
            expect(this.state.getIn(['level','quizQuestions','noundChanged'])).toBe(true)

        })

        it('ON_CHANGE_DEFINITENESS', function() {
            expect(this.state.getIn(['level','quizQuestions','definitenessChanged'])).toBe(false)
            this.dispatch({
                type: NouniAEActionTypes.ON_CHANGE_DEFINITENESS,
                newDefiniteness: DefinitenessSelect.Definite
            })
            expect(this.state.getIn(['level','quizQuestions','definitenessChanged'])).toBe(true)
        })
    })

    describe('Nound', function() {

        beforeEach(function() {
            // We know that this is a new record because nound has no id.
            // This store will only set the insertNound flag and thus the actual
            // nound value is otherwise unimportant.
            this.clickSaveNoundNew = () => {
                this.dispatch({
                    type: NoundAEActionTypes.CLICK_SAVE_NOUND,
                    nound: {}
                })
            }

            // We know that this is an update to an existing record because nound has an id.
            // This store will only set the updateNound flag and thus the actual
            // nound value is otherwise unimportant.
            this.clickSaveNoundEdit = () => {
                this.dispatch({
                    type: NoundAEActionTypes.CLICK_SAVE_NOUND,
                    nound: {id:0}
                })
            }

            // This store will only set the deleteNound flag and thus the actual
            // nound id is unimportant
            this.clickDeleteNound = () => {
                this.dispatch({
                    type: NoundAEActionTypes.CLICK_DELETE_NOUND,
                    id: 0
                })
            }

        })

        it('CLICK_SAVE_NOUND, new nound', function() {
            expect(this.state.getIn(['level','quizQuestions','insertNound'])).toBe(false)
            this.clickSaveNoundNew()
            expect(this.state.getIn(['level','quizQuestions','insertNound'])).toBe(true)
        })

        it('CLICK_SAVE_NOUND, edit nound', function() {
            expect(this.state.getIn(['level','quizQuestions','updateNound'])).toBe(false)
            this.clickSaveNoundEdit()
            expect(this.state.getIn(['level','quizQuestions','updateNound'])).toBe(true)
        })


        it('CLICK_DELETE_NOUND', function() {
            expect(this.state.getIn(['level','quizQuestions','deleteNound'])).toBe(false)
            this.clickDeleteNound()
            expect(this.state.getIn(['level','quizQuestions','deleteNound'])).toBe(true)
        })

        // The Level01 quiz should pass, regardless of the order the
        // requirements were met.  As a practical matter, don't try all the
        // permutations, just two of them.
        it('CLICK_SAVE_NOUND and CLICK_DELETE_NOUND in order A', function() {
            this.dispatch({type: AppActionTypes.LEVEL_NEXT})
            const currentLevel = this.state.getIn(['level','currentLevel'])
            let currentQuizState = this.state.getIn(['level','quizResults',currentLevel])
            expect(currentQuizState).toBe(undefined)

            this.clickSaveNoundNew()
            currentQuizState = this.state.getIn(['level','quizResults',currentLevel])
            expect(currentQuizState).toBe(undefined)

            this.clickSaveNoundEdit()
            currentQuizState = this.state.getIn(['level','quizResults',currentLevel])
            expect(currentQuizState).toBe(undefined)

            this.clickDeleteNound()
            currentQuizState = this.state.getIn(['level','quizResults',currentLevel])
            expect(currentQuizState).toBe(true)
        })

        it('CLICK_SAVE_NOUND and CLICK_DELETE_NOUND in order B', function() {
            this.dispatch({type: AppActionTypes.LEVEL_NEXT})
            const currentLevel = this.state.getIn(['level','currentLevel'])
            let currentQuizState = this.state.getIn(['level','quizResults',currentLevel])
            expect(currentQuizState).toBe(undefined)

            this.clickSaveNoundNew()
            currentQuizState = this.state.getIn(['level','quizResults',currentLevel])
            expect(currentQuizState).toBe(undefined)

            this.clickDeleteNound()
            currentQuizState = this.state.getIn(['level','quizResults',currentLevel])
            expect(currentQuizState).toBe(undefined)

            this.clickSaveNoundEdit()
            currentQuizState = this.state.getIn(['level','quizResults',currentLevel])
            expect(currentQuizState).toBe(true)
        })
    })

    describe('Verbd', function() {

        beforeEach(function() {
            // We know that this is a new record because verbd has no id.
            // This store will only set the insertVerbd flag and thus the actual
            // verbd value is otherwise unimportant.
            this.clickSaveVerbdNew = () => {
                this.dispatch({
                    type: VerbdAEActionTypes.CLICK_SAVE_VERBD,
                    verbd: {}
                })
            }

            // We know that this is an update to an existing record because verbd has an id.
            // This store will only set the updateVerbd flag and thus the actual
            // verbd value is otherwise unimportant.
            this.clickSaveVerbdEdit = () => {
                this.dispatch({
                    type: VerbdAEActionTypes.CLICK_SAVE_VERBD,
                    verbd: {id:0}
                })
            }

            // This store will only set the deleteVerbd flag and thus the actual
            // verbd id is unimportant
            this.clickDeleteVerbd = () => {
                this.dispatch({
                    type: VerbdAEActionTypes.CLICK_DELETE_VERBD,
                    id: 0
                })
            }

        })

        it('CLICK_SAVE_VERBD, new verbd', function() {
            expect(this.state.getIn(['level','quizQuestions','insertVerbd'])).toBe(false)
            this.clickSaveVerbdNew()
            expect(this.state.getIn(['level','quizQuestions','insertVerbd'])).toBe(true)
        })

        it('CLICK_SAVE_VERBD, edit verbd', function() {
            expect(this.state.getIn(['level','quizQuestions','updateVerbd'])).toBe(false)
            this.clickSaveVerbdEdit()
            expect(this.state.getIn(['level','quizQuestions','updateVerbd'])).toBe(true)
        })


        it('CLICK_DELETE_VERBD', function() {
            expect(this.state.getIn(['level','quizQuestions','deleteVerbd'])).toBe(false)
            this.clickDeleteVerbd()
            expect(this.state.getIn(['level','quizQuestions','deleteVerbd'])).toBe(true)
        })

        // The Level02 quiz should pass, regardless of the order the
        // requirements were met.  As a practical matter, don't try all the
        // permutations, just two of them.
        it('CLICK_SAVE_VERBD and CLICK_DELETE_VERBD in order A', function() {
            this.dispatch({type: AppActionTypes.LEVEL_NEXT})
            const currentLevel = this.state.getIn(['level','currentLevel'])
            let currentQuizState = this.state.getIn(['level','quizResults',currentLevel])
            expect(currentQuizState).toBe(undefined)

            this.clickSaveVerbdNew()
            currentQuizState = this.state.getIn(['level','quizResults',currentLevel])
            expect(currentQuizState).toBe(undefined)

            this.clickSaveVerbdEdit()
            currentQuizState = this.state.getIn(['level','quizResults',currentLevel])
            expect(currentQuizState).toBe(undefined)

            this.clickDeleteVerbd()
            currentQuizState = this.state.getIn(['level','quizResults',currentLevel])
            expect(currentQuizState).toBe(true)
        })

        it('CLICK_SAVE_VERBD and CLICK_DELETE_VERBD in order B', function() {
            this.dispatch({type: AppActionTypes.LEVEL_NEXT})
            const currentLevel = this.state.getIn(['level','currentLevel'])
            let currentQuizState = this.state.getIn(['level','quizResults',currentLevel])
            expect(currentQuizState).toBe(undefined)

            this.clickSaveVerbdNew()
            currentQuizState = this.state.getIn(['level','quizResults',currentLevel])
            expect(currentQuizState).toBe(undefined)

            this.clickDeleteVerbd()
            currentQuizState = this.state.getIn(['level','quizResults',currentLevel])
            expect(currentQuizState).toBe(undefined)

            this.clickSaveVerbdEdit()
            currentQuizState = this.state.getIn(['level','quizResults',currentLevel])
            expect(currentQuizState).toBe(true)
        })
    })

})
