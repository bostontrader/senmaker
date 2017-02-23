import React from 'react'
import ReactTestUtils from 'react-addons-test-utils'
import renderer from 'react-test-renderer'
import NounEditForm from './NounAddForm'
import PluralizationSelect from './PluralizationSelect'

it('renders correctly', () => {
    const tree = renderer.create(
        <NounEditForm editing={{base: ""}} />
    ).toJSON()
    expect(tree).toMatchSnapshot()
})

// NounAddForm

// if noun = {} empty...
// a base input that is empty, and pluralization_rule is not set, plural form is not there
// the add button is grayed out

// if nount != {}
// base input is something, pluralization rule is set, plural form has something


it('the html is ok', () => {
    const renderer = ReactTestUtils.createRenderer();
    renderer.render(<NounEditForm editing={{base: ""}} />);
    const result = renderer.getRenderOutput();

    expect(result.type).toBe('div')

})

