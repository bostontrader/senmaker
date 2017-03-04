import React from 'react'

import TestUtils         from 'react-addons-test-utils'
import rtRenderer        from 'react-test-renderer'

import LevelControl from './LevelControl'

describe("LevelControl", () => {

    it("is a new test", () => {


        const props = {level:{app:0}}
        const renderExpression = <LevelControl {...props} />
        const levelControl = TestUtils.renderIntoDocument(renderExpression)
        //const todo = TestUtils.findRenderedDOMComponentWithTag(levelControl, 'button')
        expect(true)
    })

    it("correctly renders the LevelControl", () => {
        const props = {level:{app:0}}
        const renderExpression = <LevelControl {...props} />
        const levelControl = TestUtils.createRenderer().render(renderExpression)
        expect(levelControl.type).toBe('div')

        const tree = rtRenderer.create(renderExpression).toJSON()
        expect(tree).toMatchSnapshot()



        //it("renders an h1", function () {
        //var component = TestUtils.renderIntoDocument(
        //<MyComponent />
        //);

        //var h1 = TestUtils.findRenderedDOMComponentWithTag(
            //levelControl, 'h1'
        //);

        //expect(h1.getDOMNode().textContent)
        //.toEqual("A title");
        //});






    })

})
