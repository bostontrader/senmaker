// @flow
import React from 'react'

import AdjectivdActions from '../../../../data/dictionary/adjectivd/AdjectivdActions'

function AdjectivdEditForm(props:Object):Object {

    const style:Object = {
        border: '1px solid black',
        margin: '5px'
    }

    const s:Object = props.strings

    const onClickSave:Function = () => AdjectivdActions.onClickSaveAdjectivd({
        id: props.adjectivd.getIn(['addedit','adjectivd','id']),
        base: props.adjectivd.getIn(['addedit','adjectivd','base']),
    })
    const onDelete:Function = () => AdjectivdActions.onClickDeleteAdjectivd(props.adjectivd.getIn(['addedit','adjectivd','id']))

    let adjectivdEditForm:Object =
        <div id="adjectivd-edit-form" style={style}>
            <label htmlFor='base'>Base</label>
            <input id='base' name='base' type='text'
                   value={props.adjectivd.getIn(['addedit','adjectivd','base'])}
                   onChange={(e)=>AdjectivdActions.onChangeBase(e.target.value)}
            />
            <button id='save-adjectivd'   onClick={onClickSave}>{s.save}</button>
            <button id='delete-adjectivd' onClick={onDelete}>{s.delete}</button>
            <button id='cancel'       onClick={AdjectivdActions.onClickCancel}>{s.cancel}</button>
        </div>

    return adjectivdEditForm

}

export default AdjectivdEditForm
