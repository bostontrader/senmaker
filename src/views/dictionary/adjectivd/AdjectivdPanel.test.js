import {Map} from 'immutable'
import React from 'react'

import TestUtils      from 'react-addons-test-utils'
import rtRenderer     from 'react-test-renderer'
import {findWithType} from 'react-shallow-testutils'

import AdjectivdAddForm  from './addedit/AdjectivdAddForm'
import AdjectivdEditForm from './addedit/AdjectivdEditForm'
import AdjectivdPanel    from './AdjectivdPanel'
import AdjectivdTable    from './AdjectivdTable'
import AdjectivdStore    from '../../../data/dictionary/adjectivd/AdjectivdStore'
import AdjectivdAEStore  from '../../../data/dictionary/adjectivd/addedit/AdjectivdAEStore'
import StringStore   from '../../../data/strings/StringStore'

describe("AdjectivdPanel", function() {

    beforeEach(function() {
        this.props = {
            adjectivd: Map({
                addedit: AdjectivdAEStore.getInitialState(),
                dict: AdjectivdStore.getInitialState()
            }),
            strings:StringStore.getInitialState()
        }
    })

    it("Renders a AdjectivdPanel w/o add/edit", function() {
        const renderExpression = <AdjectivdPanel {...this.props} />
        const adjectivdPanel = TestUtils.createRenderer().render(renderExpression)
        expect(adjectivdPanel.type).toBe('div')

        expect(findWithType(adjectivdPanel,'button'))
        expect(findWithType(adjectivdPanel,AdjectivdTable))

        const tree = rtRenderer.create(renderExpression).toJSON()
        expect(tree).toMatchSnapshot()
    })

    it("Renders a AdjectivdPanel with a AdjectivdAddForm", function() {
        this.props.adjectivd = this.props.adjectivd.setIn(['addedit','addAdjectivd'],true)

        const renderExpression = <AdjectivdPanel {...this.props} />
        const adjectivdPanel = TestUtils.createRenderer().render(renderExpression)
        expect(adjectivdPanel.type).toBe('div')

        expect(findWithType(adjectivdPanel,'button'))
        expect(findWithType(adjectivdPanel,AdjectivdAddForm))
        expect(findWithType(adjectivdPanel,AdjectivdTable))

        const tree = rtRenderer.create(renderExpression).toJSON()
        expect(tree).toMatchSnapshot()
    })

    it("Renders a AdjectivdPanel with a AdjectivdEditForm", function() {
        this.props.adjectivd = this.props.adjectivd.setIn(['addedit','adjectivd','id'],"1")

        const renderExpression = <AdjectivdPanel {...this.props} />
        const adjectivdPanel = TestUtils.createRenderer().render(renderExpression)
        expect(adjectivdPanel.type).toBe('div')

        expect(findWithType(adjectivdPanel,'button'))
        expect(findWithType(adjectivdPanel,AdjectivdEditForm))
        expect(findWithType(adjectivdPanel,AdjectivdTable))

        const tree = rtRenderer.create(renderExpression).toJSON()
        expect(tree).toMatchSnapshot()
    })
})


/*import {Map} from 'immutable'
import React from 'react'

import TestUtils      from 'react-addons-test-utils'
import rtRenderer     from 'react-test-renderer'
import {findWithType} from 'react-shallow-testutils'

import AdjectivdPanel    from './AdjectivdPanel'
import AdjectivdTable    from './AdjectivdTable'
import AdjectivdAddForm  from './addedit/AdjectivdAddForm'
import AdjectivdEditForm from './addedit/AdjectivdEditForm'
import AdjectivdStore    from '../../../data/dictionary/adjectivd/AdjectivdStore'
import AdjectivdAEStore  from '../../../data/dictionary/adjectivd/addedit/AdjectivdAEStore'
import StringStore       from '../../../data/strings/StringStore'

describe("AdjectivdPanel", function() {
    
    beforeEach(function() {
        this.props = {
            adjectivd: Map({
                addedit: AdjectivdAEStore.getInitialState(),
                dict: AdjectivdStore.getInitialState()
            }),
            strings:StringStore.getInitialState()
        }
    })
    
    it("Renders a AdjectivdPanel w/o add/edit", function() {
        const renderExpression = <AdjectivdPanel {...this.props} />
        const adjectivePanel = TestUtils.createRenderer().render(renderExpression)
        expect(adjectivePanel.type).toBe('div')

        expect(findWithType(adjectivePanel,'button'))
        expect(findWithType(adjectivePanel,AdjectivdTable))

        const tree = rtRenderer.create(renderExpression).toJSON()
        expect(tree).toMatchSnapshot()
    })

    it("Renders a AdjectivdPanel with a AdjectivdAddForm", function() {
        this.props.adjectivd = this.props.adjectivd.setIn(['addedit','addAdjectivd'],true)
        const renderExpression = <AdjectivdPanel {...this.props} />
        const adjectivePanel = TestUtils.createRenderer().render(renderExpression)
        expect(adjectivePanel.type).toBe('div')

        expect(findWithType(adjectivePanel,'button'))
        expect(findWithType(adjectivePanel,AdjectivdAddForm))
        expect(findWithType(adjectivePanel,AdjectivdTable))

        const tree = rtRenderer.create(renderExpression).toJSON()
        expect(tree).toMatchSnapshot()
    })

    it("Renders a AdjectivdPanel with a AdjectivdEditForm", function() {
        this.props.adjectivd = this.props.adjectivd.setIn(['addedit','adjectivd','id'],"0") // don't let this string become falsey

        const renderExpression = <AdjectivdPanel {...this.props} />
        const adjectivePanel = TestUtils.createRenderer().render(renderExpression)
        expect(adjectivePanel.type).toBe('div')

        expect(findWithType(adjectivePanel,'button'))
        expect(findWithType(adjectivePanel,AdjectivdEditForm))
        expect(findWithType(adjectivePanel,AdjectivdTable))

        const tree = rtRenderer.create(renderExpression).toJSON()
        expect(tree).toMatchSnapshot()
    })
})
*/