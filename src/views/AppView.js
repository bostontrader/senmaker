import React from 'react'

import Level00 from './Level00'
import Level01 from './Level01'
import Level02 from './Level02'

import NounAddForm from './nouns/NounAddForm'
import NounEditForm from './nouns/NounEditForm'
import NounTable from './nouns/NounTable'

import VerbAddForm from './verbs/VerbAddForm'
import VerbEditForm from './verbs/VerbEditForm'
import VerbTable from './verbs/VerbTable'

function AppView(props) {

    let levelComponent

    switch(props.level) {

        case 0:
            levelComponent = <Level00 {...props} />
            break;

        case 1:
            levelComponent = <Level01 {...props} />
            break;

        case 2:
            levelComponent = <Level02 {...props} />
            break;

        default:
            levelComponent = <div>Unknown level</div>
    }


    // What should be displayed in the noun add/edit panel?
    /*let nounAddEditPanel = <div></div>
    if(props.editingNoun.id) {
        nounAddEditPanel = <NounEditForm {...props} />
    } else if (props.editingNoun.add) {
        nounAddEditPanel = <NounAddForm {...props} />
    } else {
        // Do nothing
    }*/

    // What should be displayed in the verb add/edit panel?
    let verbAddEditPanel = <div></div>
    if(props.editingVerb.id) {
        verbAddEditPanel = <VerbEditForm {...props} />
    } else if (props.editingVerb.add) {
        verbAddEditPanel = <VerbAddForm {...props} />
    } else {
        // Do nothing
    }
    
    return (

        <div className="container">

            <div className="row">
                {levelComponent}
            </div>

        </div>
    )

}

/*function MainNoun(props) {
    if (props.nouns.size === 0) {
        return null
    }

    return (
        <section id="main">
            <NounTable {...props} />
        </section>
    )
}

function MainVerb(props) {
    if (props.verbs.size === 0) {
        return null
    }

    return (
        <section id="main">
            <VerbTable {...props} />
        </section>
    )
}*/

export default AppView
