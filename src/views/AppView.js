import React from 'react'

import NounForm from './NounForm'

function AppView(props) {
    return (

    <div>
        <div className="one-half column">
            <Main {...props} />
        </div>
        <div className="one-half column">
            <NounForm {...props} />
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
                        onStartEditingNoun={props.onStartEditingNoun}
                        onStopEditingNoun={props.onStopEditingNoun}
                        onToggleNoun={props.onToggleNoun}
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
                <button type="button"  onClick={onEditNoun}>Edit</button>
            </td>

        </tr>
    )
}

export default AppView