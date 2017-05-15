import {Map} from 'immutable'
import React from 'react'

import ReactTestUtils      from 'react-dom/test-utils'
import rtRenderer     from 'react-test-renderer'
import {findWithType} from 'react-shallow-testutils'

import AdjectivdAEForm  from './addedit/AdjectivdAEForm'
import AdjectivdPanel    from './AdjectivdPanel'
import AdjectivdTable    from './AdjectivdTable'
import AdjectivdStore    from '../../../data/dictionary/adjectivd/AdjectivdStore'
import AdjectivdAEStore  from '../../../data/dictionary/adjectivd/addedit/AdjectivdAEStore'
import StringStore   from '../../../data/strings/StringStore'

describe("AdjectivdPanel", function() {

    /*beforeEach(function() {
        this.props = {
            adjectivd: Map({
                addedit: AdjectivdAEStore.getInitialState(),
                dict: AdjectivdStore.getInitialState()
            }),
            strings:StringStore.getInitialState()
        }
    })*/

    it("Renders a AdjectivdPanel w/o add/edit", function() {
        //const renderExpression = <AdjectivdPanel {...this.props} />
        //const adjectivdPanel = ReactTestUtils.createRenderer().render(renderExpression)
        //expect(adjectivdPanel.type).toBe('div')

        //expect(findWithType(adjectivdPanel,'button'))
        //expect(findWithType(adjectivdPanel,AdjectivdTable))

        //const tree = rtRenderer.create(renderExpression).toJSON()
        //expect(tree).toMatchSnapshot()
    })

    /*it("Renders a AdjectivdPanel with an AdjectivdAEForm in add mode", function() {
        this.props.adjectivd = this.props.adjectivd.setIn(['addedit','addAdjectivd'],true)

        const renderExpression = <AdjectivdPanel {...this.props} />
        const adjectivdPanel = ReactTestUtils.createRenderer().render(renderExpression)
        expect(adjectivdPanel.type).toBe('div')

        expect(findWithType(adjectivdPanel,'button'))
        expect(findWithType(adjectivdPanel,AdjectivdAEForm))
        expect(findWithType(adjectivdPanel,AdjectivdTable))

        const tree = rtRenderer.create(renderExpression).toJSON()
        expect(tree).toMatchSnapshot()
    })

    it("Renders a AdjectivdPanel with an AdjectivdAEForm in edit mode", function() {
        this.props.adjectivd = this.props.adjectivd.setIn(['addedit','adjectivd','id'],"1")

        const renderExpression = <AdjectivdPanel {...this.props} />
        const adjectivdPanel = ReactTestUtils.createRenderer().render(renderExpression)
        expect(adjectivdPanel.type).toBe('div')

        expect(findWithType(adjectivdPanel,'button'))
        expect(findWithType(adjectivdPanel,AdjectivdAEForm))
        expect(findWithType(adjectivdPanel,AdjectivdTable))

        const tree = rtRenderer.create(renderExpression).toJSON()
        expect(tree).toMatchSnapshot()
    })*/
})
