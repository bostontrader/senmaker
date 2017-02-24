import React from 'react'
import ReactTestUtils from 'react-addons-test-utils'
import renderer from 'react-test-renderer'
import VerbTable from './VerbTable'

it('renders correctly', () => {
    const tree = renderer.create(
        <VerbTable  />
    ).toJSON()
    expect(tree).toMatchSnapshot()
})

it('the html is ok', () => {
    const renderer = ReactTestUtils.createRenderer();
    renderer.render(<VerbTable  />);
    const result = renderer.getRenderOutput();

    expect(result.type).toBe('table')
})

