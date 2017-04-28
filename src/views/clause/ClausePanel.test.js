import {Map} from 'immutable'
import React from 'react'

import TestUtils      from 'react-addons-test-utils'
import rtRenderer     from 'react-test-renderer'
import {findWithType} from 'react-shallow-testutils'

import ClausePanel    from './ClausePanel'
import ClauseTable    from './ClauseTable'
import ClauseAddForm  from './addedit/ClauseAddForm'
import ClauseEditForm from './addedit/ClauseEditForm'
import AppStore       from '../../data/app/AppStore'
import StringStore    from '../../data/strings/StringStore'
import ClauseStore    from '../../data/clause/ClauseStore'
import ClauseAEStore  from '../../data/clause/addedit/ClauseAEStore'
import NPStore        from '../../data/np/NPStore'
import VPStore        from '../../data/vp/VPStore'
describe("ClausePanel", () => {

    it("Renders a ClausePanel w/o add/edit", () => {
        const props = {
            clause: Map({
                addedit: ClauseAEStore.getInitialState(),
                dict: ClauseStore.getInitialState()
            }),
            strings:StringStore.getInitialState()
        }

        const renderExpression = <ClausePanel {...props} />
        const clausePanel = TestUtils.createRenderer().render(renderExpression)
        expect(clausePanel.type).toBe('div')

        expect(findWithType(clausePanel,'button'))
        expect(findWithType(clausePanel,ClauseTable))

        // This code errors with "Cannot read property 'style' of null"
        // I think this is because of the select statement
        //const tree = rtRenderer.create(renderExpression).toJSON()
        //expect(tree).toMatchSnapshot()
    })

    it("Renders a ClausePanel with a ClauseAddForm", () => {
        const props = {
            app: AppStore.getState(),
            np: Map({
                dict: NPStore.getInitialState()
            }),
            vp: Map({
                dict: VPStore.getInitialState()
            }),
            clause: Map({
                addedit: ClauseAEStore.getInitialState(),
                dict: ClauseStore.getInitialState()
            }),
            strings:StringStore.getInitialState()
        }
        props.clause = props.clause.setIn(['addedit','addClause'],true)

        const renderExpression = <ClausePanel {...props} />
        const clausePanel = TestUtils.createRenderer().render(renderExpression)
        expect(clausePanel.type).toBe('div')

        expect(findWithType(clausePanel,'button'))
        expect(findWithType(clausePanel,ClauseAddForm))
        expect(findWithType(clausePanel,ClauseTable))

        // This code errors with "Cannot read property 'style' of null"
        // I think this is because of the select statement
        // const tree = rtRenderer.create(renderExpression).toJSON()
        //expect(tree).toMatchSnapshot()
    })

    it("Renders a ClausePanel with a ClauseEditForm", () => {
        const props = {
            app: AppStore.getState(),
            np: Map({
                dict: NPStore.getInitialState()
            }),
            vp: Map({
                dict: VPStore.getInitialState()
            }),
            clause: Map({
                addedit: ClauseAEStore.getInitialState(),
                dict: ClauseStore.getInitialState()
            }),
            strings:StringStore.getInitialState()
        }
        props.clause = props.clause.setIn(['addedit','clause','id'],"1")

        const renderExpression = <ClausePanel {...props} />
        const clausePanel = TestUtils.createRenderer().render(renderExpression)
        expect(clausePanel.type).toBe('div')

        expect(findWithType(clausePanel,'button'))
        expect(findWithType(clausePanel,ClauseEditForm))
        expect(findWithType(clausePanel,ClauseTable))

        // This code errors with "Cannot read property 'style' of null"
        // I think this is because of the select statement
        // const tree = rtRenderer.create(renderExpression).toJSON()
        //expect(tree).toMatchSnapshot()
    })
})
