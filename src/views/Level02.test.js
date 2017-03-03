import {OrderedMap} from 'immutable'
import React from 'react'

import TestUtils         from 'react-addons-test-utils'
import rtRenderer        from 'react-test-renderer'

import Level02 from './Level02'
import {VerbPanelLevel} from '../data/verbs/VerbConstants'

describe("Level02", () => {

    it("correctly renders the Level02", () => {
        const props = {level:{app: 2, verbPanel:VerbPanelLevel.BASE}, editingVerb:{id:'', add:''}, verbs:OrderedMap()}
        const renderExpression = <Level02 {...props} />
        const levelControl = TestUtils.createRenderer().render(renderExpression)
        expect(levelControl.type).toBe('div')

        const tree = rtRenderer.create(renderExpression).toJSON()
        expect(tree).toMatchSnapshot()
    })

})
