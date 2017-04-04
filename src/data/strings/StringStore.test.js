import AppActionTypes    from '../app/AppActionTypes'
import StringActionTypes from './StringActionTypes'
import StringStore       from './StringStore'
import {langCode}        from '../I18NConstants'

describe('StringStore', function() {

    beforeEach(function() {
        this.state = StringStore.getInitialState()

        this.dispatch = action => {
            this.state = StringStore.reduce(this.state, action)
        }
    })

    it('ON_APP_RESET', function() {
        const oldState = this.state
        this.dispatch({
            type: StringActionTypes.ON_LANG_EN
        })
        expect(oldState).not.toBe(this.state)

        this.dispatch({
            type: AppActionTypes.ON_APP_RESET
        })
        expect(oldState).toBe(this.state)
    })

    it('Can change languages', function() {
        // By default we start with langCode.zh
        expect(this.state.lang).toBe(langCode.zh)

        this.dispatch({
            type: StringActionTypes.ON_LANG_EN
        })
        expect(this.state.lang).toBe(langCode.en)

        this.dispatch({
            type: StringActionTypes.ON_LANG_ZH
        })
        expect(this.state.lang).toBe(langCode.zh)
    })

})
