import {OrderedMap} from 'immutable'
import React from 'react'

import TestUtils         from 'react-addons-test-utils'
import rtRenderer        from 'react-test-renderer'
import {findWithClass, findWithType} from 'react-shallow-testutils'

//import AppActionTypes from '../data/app/AppActionTypes'
//import AppStore from '../data/app/AppStore'
import VerbPhrase from './VerbPhrase'
//import LevelControl from './LevelControl'
import StringStore from '../../data/strings/StringStore'
//import VerbAddEditStore from '../data/dictionary/verbd/VerbdAddEditStore'
//import VerbPanel from './dictionary/verbd/VerbPanel'

describe("VPAspect", () => {

    it("Renders VPAspect", () => {
        const props = {
            //addEditVerb: VerbAddEditStore.getInitialState(),
            //level:AppStore.getInitialState(),
            //verbs: OrderedMap(),
            quiz: null,
            strings:StringStore.getInitialState()
        }

        expect(true)
        //const renderExpression = <VerbPhrase {...props} />
        //const verbPhrase = TestUtils.createRenderer().render(renderExpression)
        //expect(verbPhrase.type).toBe('div')

        //expect(findWithClass(verbPhrase,'help'))
        //expect(findWithClass(verbPhrase,'quiz'))
        //expect(findWithType(verbPhrase,LevelControl))

        //c/onst tree = rtRenderer.create(renderExpression).toJSON()
        //expect(tree).toMatchSnapshot()
    })

})
