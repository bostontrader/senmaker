import React from 'react'
import VerbAddForm from './verbs/VerbAddForm'
import VerbEditForm from './verbs/VerbEditForm'
import VerbTable from './verbs/VerbTable'

function Level02(props) {

    // What should be displayed in the verb add/edit panel?
    let verbAddEditPanel = <div></div>
    if(props.editingVerb.id) {
        verbAddEditPanel = <VerbEditForm {...props} />
    } else if (props.editingVerb.add) {
        verbAddEditPanel = <VerbAddForm {...props} />
    } else {
        // Do nothing
    }

    return(
        <div className="container">

            <div className="row">
                <h1>Verbs</h1>
                <div className="one-half column">
                    <button onClick={props.onAddVerb}>Add new verb</button>
                    <MainVerb {...props} />
                </div>
                <div className="one-half column">
                    {verbAddEditPanel}
                </div>
            </div>
        </div>
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
}

export default Level02

