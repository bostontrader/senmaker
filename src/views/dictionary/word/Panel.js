import React from 'react'

import ReactTestUtils    from 'react-dom/test-utils'
import rtRenderer        from 'react-test-renderer'
import {findWithType}    from 'react-shallow-testutils'
import {findAllWithType} from 'react-shallow-testutils'

import initialState from '../../../data/StateGetter'

const testFunction = (Panel, Table, AEForm, wordType) => {

    const ucWordType = wordType.charAt(0).toUpperCase() + wordType.slice(1)
    const addKey = 'add' + ucWordType
    const panelName  = ucWordType + 'Panel'
    const aeFormName = ucWordType + 'AEForm'
    const article = ('aeiou'.indexOf(wordType.charAt(0))) ? 'a' : 'an'

    let state

    beforeEach(function() {
        state = {}
        state[wordType] = initialState[wordType]
        state.strings   = initialState.strings
    })

    it('Renders ' + article + ' ' + panelName + ' w/o add/edit', function() {
        const renderExpression = <Panel {...state} />
        const wordPanel = ReactTestUtils.createRenderer().render(renderExpression)
        expect(wordPanel.type).toBe('div')

        expect(findWithType(wordPanel,'button'))
        expect(findWithType(wordPanel,Table))

        // No AEForm
        const adjectivdAEForm = findAllWithType(wordPanel, AEForm)
        expect(adjectivdAEForm.length).toBe(0)

        const tree = rtRenderer.create(renderExpression).toJSON()
        expect(tree).toMatchSnapshot()
    })

    it('Renders ' + article + ' ' + panelName + ' with ' + article + ' ' + aeFormName + ' in add mode', function() {
        state[wordType] = state[wordType].setIn(['addedit',addKey],true)

        const renderExpression = <Panel {...state} />
        const wordPanel = ReactTestUtils.createRenderer().render(renderExpression)
        expect(wordPanel.type).toBe('div')

        expect(findWithType(wordPanel,'button'))
        expect(findWithType(wordPanel,AEForm))
        expect(findWithType(wordPanel,Table))

        const tree = rtRenderer.create(renderExpression).toJSON()
        expect(tree).toMatchSnapshot()
    })

    it('Renders ' + article + ' ' + panelName + ' with ' + article + ' ' + aeFormName + ' in edit mode', function() {
        state[wordType] = state[wordType].setIn(['addedit',wordType,'id'],'1')

        const renderExpression = <Panel {...state} />
        const wordPanel = ReactTestUtils.createRenderer().render(renderExpression)
        expect(wordPanel.type).toBe('div')

        expect(findWithType(wordPanel,'button'))
        expect(findWithType(wordPanel,AEForm))
        expect(findWithType(wordPanel,Table))

        const tree = rtRenderer.create(renderExpression).toJSON()
        expect(tree).toMatchSnapshot()
    })

}

export {testFunction}
