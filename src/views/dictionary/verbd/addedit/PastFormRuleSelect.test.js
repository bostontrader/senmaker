import React from 'react'
import renderer from 'react-test-renderer'
import PastFormRuleSelect from './PastFormRuleSelect'

it('renders correctly', () => {
    const tree = renderer.create(
        <PastFormRuleSelect />
    ).toJSON()
    expect(tree).toMatchSnapshot()
})
