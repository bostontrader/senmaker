import React from 'react'
import renderer from 'react-test-renderer'
import TenseSelect from './PastTenseRuleSelect'

it('renders correctly', () => {
    const tree = renderer.create(
        <TenseSelect />
    ).toJSON()
    expect(tree).toMatchSnapshot()
})

