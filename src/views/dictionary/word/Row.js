import React          from 'react'
import ReactTestUtils from 'react-dom/test-utils'
import rtRenderer     from 'react-test-renderer'

import StringStore from '../../../data/strings/StringStore'

const testFunction = (Row, wordType, examples) => {

    const ucWordType = wordType.charAt(0).toUpperCase() + wordType.slice(1)
    const rowName  = ucWordType + 'Row'
    const article = ('aeiou'.indexOf(wordType.charAt(0))) ? 'a' : 'an'
    
    it('Renders ' + article + ' ' + rowName + '.', () => {
        const props = {[wordType]:examples.a, strings: StringStore.getInitialState()}
        const renderExpression = <Row {...props} />
        const wordRow = ReactTestUtils.createRenderer().render(renderExpression)
        expect(wordRow.type).toBe('tr')
        expect(wordRow.props.children.length).toBe(2)  // base, edit
        
        const tree = rtRenderer.create(renderExpression).toJSON()
        expect(tree).toMatchSnapshot()
    })
     
}

export {testFunction}
