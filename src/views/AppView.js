import React from 'react'

import PluralizationSelect from './PluralizationSelect'

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

function NounForm(props) {

    return (
        <form>
            <label htmlFor='base'>Base</label><input name='base' type='text' value={props.editing.base} />
            <PluralizationSelect pluralization_rule={props.editing.pluralization_rule}/>
            <br />
            <input type='submit' value={props.editing.id?"Save (id = " +props.editing.id+ ")":"Add"}/>
            {props.editing.id?<button >Delete</button>:""}
            {props.editing.id?<button >Cancel</button>:""}
        </form>
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