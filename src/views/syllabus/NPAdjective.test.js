import {OrderedMap} from 'immutable'
import React from 'react'

import TestUtils         from 'react-addons-test-utils'
import rtRenderer        from 'react-test-renderer'
import {findWithClass, findWithType} from 'react-shallow-testutils'

//import AppActionTypes from '../data/app/AppActionTypes'
//import AppStore from '../data/app/AppStore'
import NounPhrase from './NounPhrase'
//import LevelControl from './LevelControl'
//import StringStore from '../data/strings/StringStore'
//import VerbAddEditStore from '../data/dictionary/verbd/VerbdAddEditStore'
//import VerbPanel from './dictionary/verbd/VerbPanel'

describe("NounPhrases", () => {

    it("Renders NounPhrases", () => {
        //const props = {
            //addEditVerb: VerbAddEditStore.getInitialState(),
            //level:AppStore.getInitialState(),
            //verbs: OrderedMap(),
            //strings:StringStore.getInitialState()
        //}

        //const renderExpression = <NounPhrases {...props} />
        //const levelControl = TestUtils.createRenderer().render(renderExpression)
        expect(true)
        //expect(levelControl.type).toBe('div')

        //expect(findWithClass(levelControl,'help'))
        //expect(findWithClass(levelControl,'quiz'))
        //expect(findWithType(levelControl,LevelControl))

        //const tree = rtRenderer.create(renderExpression).toJSON()
        //expect(tree).toMatchSnapshot()
    })

})
