import React from 'react'
import rtRenderer from 'react-test-renderer'

import AppContainer from './AppContainer'

describe('AppContainer', () => {

    // What is there to even test here?  All the action takes place on lower levels.
    // Test that instead.
    it('\'s Alive!', () => {
        expect(rtRenderer.create(<AppContainer />).toJSON()).toMatchSnapshot()
    })

})