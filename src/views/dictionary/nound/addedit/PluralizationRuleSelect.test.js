import React from 'react'
import renderer from 'react-test-renderer'
import PluralizationRuleSelect from './PluralizationRuleSelect'

it('renders correctly', () => {
    const tree = renderer.create(
        <PluralizationRuleSelect />
    ).toJSON()
    expect(tree).toMatchSnapshot()
})
