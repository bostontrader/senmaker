import {Map} from 'immutable'

import VerbdStore       from './data/dictionary/verbd/VerbdStore'
import VerbdActionTypes from './data/dictionary/verbd/VerbdActionTypes'
import VerbdAEStore     from './data/dictionary/verbd/addedit/VerbdAEStore'
import {verbdExamples}  from './data/TestData'

//import React from 'react'

//import TestUtils         from 'react-addons-test-utils'
//import rtRenderer        from 'react-test-renderer'
//import {findWithType}    from 'react-shallow-testutils'
//import {findAllWithType} from 'react-shallow-testutils'

//import NPAEForm         from './addedit/NPAEForm'
//import NPPanel          from './NPPanel'
//import NPTable          from './NPTable'
//import AdjectivdStore   from '../../data/dictionary/adjectivd/AdjectivdStore'
//import AdjectivdAEStore from '../../data/dictionary/adjectivd/addedit/AdjectivdAEStore'
//import NoundStore       from '../../data/dictionary/nound/NoundStore'
//import NoundAEStore     from '../../data/dictionary/nound/addedit/NoundAEStore'
//import NPStore          from '../../data/np/NPStore'
//import NPAEStore        from '../../data/np/addedit/NPAEStore'
//import StringStore      from '../../data/strings/StringStore'


describe("NPPanel", function() {

    beforeEach(function() {
        this.state = {
            //adjectivd: Map({
                //addedit: AdjectivdAEStore.getInitialState(),
                //dict: AdjectivdStore.getInitialState()
            //}),
            //nound: Map({
                //addedit: NoundAEStore.getInitialState(),
                //dict: NoundStore.getInitialState()
            //}),
            //np: Map({
                //addedit: NPAEStore.getInitialState(),
                //dict: NPStore.getInitialState()
            //}),
            verbd: Map({
                addedit: VerbdAEStore.getInitialState(),
                dict: VerbdStore.getInitialState()
            })
        }

        this.dispatch = action => {this.state = VerbdStore.reduce(this.state, action)}

    })

    it("Know Grammar", function() {
        //console.log(this.state)
        //this.dispatch({type: VerbdActionTypes.INSERT_VERBD, verbd: verbdExamples.a})

        //                               past                present                 future
        // simple                        walked                walk                will walk
        // continuous                   walking         are walking          will be walking
        // perfect                   had walked         have walked         will have walked
        // perfect, continuous had been walking   have been walking   will have been walking


    })

})
