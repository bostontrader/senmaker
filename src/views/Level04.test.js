import {OrderedMap} from 'immutable'
import React from 'react'

import TestUtils         from 'react-addons-test-utils'
import rtRenderer        from 'react-test-renderer'

import Level04 from './Level04'
import {VerbPanelLevel} from '../data/verbs/VerbConstants'

describe("Level04", () => {

    it("correctly renders the Level04", () => {
        const props = {level:{currentAppLevel:{app: 1, verbPanel:VerbPanelLevel.BASE}, minLevel:false, maxLevel:false, quiz:false}, editingVerb:{id:'', add:''}, verbs:OrderedMap()}
        const renderExpression = <Level04 {...props} />
        const levelControl = TestUtils.createRenderer().render(renderExpression)
        expect(levelControl.type).toBe('div')

        const tree = rtRenderer.create(renderExpression).toJSON()
        expect(tree).toMatchSnapshot()
    })

})
