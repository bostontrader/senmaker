import Immutable from 'immutable'
import React from 'react'
import ReactTestUtils from 'react-addons-test-utils'
import renderer from 'react-test-renderer'
import VerbTable from './VerbTable'

it('renders correctly', () => {

    let props = {'verbs':Immutable.OrderedMap()}

    const tree = renderer.create(
        <VerbTable {...props} />
    ).toJSON()
    expect(tree).toMatchSnapshot()
})

it('the html is ok', () => {

    let props = {'verbs':Immutable.OrderedMap()}

    const renderer = ReactTestUtils.createRenderer();
    renderer.render(<VerbTable {...props} />);
    const result = renderer.getRenderOutput();

    expect(result.type).toBe('table')
})

