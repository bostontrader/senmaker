import React from 'react'

import NounAddForm from './nouns/NounAddForm'
import NounEditForm from './nouns/NounEditForm'
import NounTable from './nouns/NounTable'

function AppView(props) {

    // What should be displayed in the add/edit panel?
    let addeditPanel = <div></div>
    if(props.editing.id) {
        addeditPanel = <NounEditForm {...props} />
    } else if (props.editing.add) {
        addeditPanel = <NounAddForm {...props} />
    } else {
        // Do nothing
    }

    return (

    <div>
        <div className="one-half column">
            <button onClick={props.onAdd}>Add new noun</button>
            <Main {...props} />
        </div>
        <div className="one-half column">
            {addeditPanel}
        </div>
    </div>
    )
}

function Main(props) {
    if (props.nouns.size === 0) {
        return null
    }

    return (
        <section id="main">
            <NounTable {...props} />
        </section>
    )
}

export default AppView
