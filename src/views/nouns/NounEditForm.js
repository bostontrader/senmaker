import React from 'react'
import PluralizationSelect from './PluralizationSelect'

function NounEditForm(props) {

    const onChange = () => {}
    const onDelete = () => props.onDeleteNoun(props.editingNoun.id)


    let nounEditForm = <div>noun edit form</div>
    const level = 2
    if( level >= 2) {
        nounEditForm =
            <div>
                <label htmlFor='base'>Base</label><input name='base' type='text' value={props.editingNoun.base}  onChange={onChange}/>
                <PluralizationSelect pluralization_rule={props.editingNoun.pluralization_rule}/>
                <br />
                <input type='submit' value={"Save (id = " +props.editingNoun.id+ ")"}/>
                <button onClick={onDelete}>Delete</button>
                <button onClick={props.onCancelNoun}>Cancel</button>
            </div>
    } else if( level >= 1) {
        nounEditForm =
            <div>
                <label htmlFor='base'>Base</label><input name='base' type='text' value={props.editingNoun.base}  onChange={onChange}/>
                <br />
                <input type='submit' value={"Save (id = " +props.editingNoun.id+ ")"}/>
                <button onClick={onDelete}>Delete</button>
                <button onClick={props.onCancelNoun}>Cancel</button>
            </div>
    }

    return (nounEditForm)


    /*return (
        <div>
            <label htmlFor='base'>Base</label><input name='base' type='text' value={props.editingNoun.base}  onChange={onChange}/>
            <PluralizationSelect pluralization_rule={props.editingNoun.pluralization_rule}/>
            <br />
            <input type='submit' value={"Save (id = " +props.editingNoun.id+ ")"}/>
            <button onClick={onDelete}>Delete</button>
            <button onClick={props.onCancelNoun}>Cancel</button>
        </div>
    )*/

}

export default NounEditForm
