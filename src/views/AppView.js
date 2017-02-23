import React from 'react'

import NounAddForm from './NounAddForm'
import NounEditForm from './NounEditForm'

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

            <table id="noun-list">
                <thead>
                <tr>
                    <th></th>
                    <th>Base</th>
                    <th>Plural</th>
                    <th></th>

                </tr>
                </thead>
                <tbody>
                {[...props.nouns.values()].reverse().map(noun => (
                    <NounItem
                        key={noun.id}
                        editing={props.editing}
                        noun={noun}
                        onDeleteNoun={props.onDeleteNoun}
                        onEditNoun={props.onEditNoun}
                    />
                ))}
                </tbody>
            </table>
        </section>
    )
}

function NounItem(props) {
    const {noun} = props;
    const onEditNoun = () => props.onEditNoun(noun)

    return (
        <tr>
            <td>

            </td>
            <td>
                {noun.base}
            </td>
            <td>
                {noun.plural}
            </td>
            <td>
                <button type="button"  onClick={onEditNoun} >Edit</button>
            </td>

        </tr>
    )
}

export default AppView