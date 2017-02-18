import React from 'react';

import classnames from 'classnames';

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


// stateless functional components cannot have ref
function NounForm(props) {
    //console.log('AppView.NounForm props=',props)

    const select =
        <div>
            <label htmlFor='pluralization_rule'>Pluralization Rule</label>
            <select  name='pluralization_rule' value={props.editing.pluralization_rule}>
                <option value='0'>Append -s</option>
                <option value='1'>Append -es</option>
            </select>
        </div>


    return (
        <form>
            <label htmlFor='base'>Base</label><input name='base' type='text' value={props.editing.base} />
            {select}
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