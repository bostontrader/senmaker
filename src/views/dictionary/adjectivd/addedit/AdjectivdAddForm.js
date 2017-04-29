// @flow
import React from 'react'

import AdjectivdActions    from '../../../../data/dictionary/adjectivd/AdjectivdActions'
import {validateAdjectivd} from '../../../../data/Validator'

function AdjectivdAddForm(props:Object):Object {

    const style:Object = {
        border: '1px solid black',
        margin: '5px'
    }

    const s:Object = props.strings

    const onClickSave:Function = () => {
        const adjectivd:Object = props.adjectivd.getIn(['addedit','adjectivd'])
        validateAdjectivd(adjectivd)
        AdjectivdActions.onClickSaveAdjectivd(adjectivd)
    }

    let adjectivdAddForm:Object =
        <div id='adjectivd-add-form' style={style}>
            <label htmlFor='base'>Base</label>
            <input id='base' name='base' type='text'
                   value={props.adjectivd.getIn(['addedit','adjectivd','base'])}
                   onChange={(e)=>AdjectivdActions.onChangeBase(e.target.value)}
            />
            <button id='save-adjectivd' onClick={onClickSave}>{s.save}</button>
            <button id='cancel'     onClick={AdjectivdActions.onClickCancel}>{s.cancel}</button>
        </div>

    return adjectivdAddForm
}

export default AdjectivdAddForm
