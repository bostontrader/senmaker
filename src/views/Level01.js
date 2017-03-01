import React from 'react'
import NounAddForm from './nouns/NounAddForm'
import NounEditForm from './nouns/NounEditForm'
import NounPanel from './nouns/NounPanel'
import NounTable from './nouns/NounTable'

function Level01(props) {

    return(
        <div className="container">
            <NounPanel {...props} />
            <div className="row">
                <p>Can you add a new noun?</p>
                <p>Can you delete a noun from this list?</p>
                <p>Can you change the spelling of a noun?</p>
            </div>
        </div>
    )



    // What should be displayed in the noun add/edit panel?
    /*let nounAddEditPanel = <div></div>
    if(props.editingNoun.id) {
        nounAddEditPanel = <NounEditForm {...props} />
    } else if (props.editingNoun.add) {
        nounAddEditPanel = <NounAddForm {...props} />
    } else {
        // Do nothing
    }

    return(
        <div className="container">
            <div className="row">
                <h1>Nouns</h1>
                <p>The things around us are called <strong>nouns</strong>.</p>
                <p>When we write nouns must know how many of something we are writing about.  For example are we writing about one cat or more than one cat?</p>
                <p>If we are writing about only one of something, then we use the base form of the noun.</p>
                <p>If we are writing about more than one, then we use the plural form of the noun.</p>
            </div>
            <div className="row">
                <div className="one-half column">
                    <button onClick={props.onAddNoun}>Add new noun</button>
                    <MainNoun {...props} />
                </div>
                <div className="one-half column">
                    {nounAddEditPanel}
                </div>
            </div>
            <div className="row">
                <p>Can you add a new noun?</p>
                <p>Can you delete a noun from this list?</p>
                <p>Can you change the spelling of a noun?</p>
            </div>
        </div>
    )*/
    /*return (
        <div className="container">

            <div className="row">
                <h1>Nouns</h1>
                <p>The things around us are called <strong>nouns</strong>.</p>
                <p>When we write nouns must know how many of something we are writing about.  For example are we writing about one cat or more than one cat?</p>
                <p>If we are writing about only one of something, then we use the base form of the noun.</p>
                <p>If we are writing about more than one, then we use the plural form of the noun.</p>
            </div>

            <div className="row">
                <div className="one-half column">
                    <button onClick={props.onAddNoun}>Add new noun</button>
                    <MainNoun {...props} />
                </div>
                <div className="one-half column">
                    {nounAddEditPanel}
                </div>
            </div>

        </div>
    )*/
}

function MainNoun(props) {
    if (props.nouns.size === 0) {
        return null
    }

    return (
        <section id="main">
            <NounTable {...props} />
        </section>
    )
}

export default Level01
