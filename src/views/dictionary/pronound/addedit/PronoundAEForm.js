// @flow
import React from 'react'

import PronoundActions    from '../../../../data/dictionary/pronound/PronoundActions'
import {validatePronound} from '../../../../data/Validator'

function PronoundAEForm(props:Object):Object {

    const style:Object = {
        border: '1px solid black',
        margin: '5px'
    }

    const sm:Object = props.strings.get('strings').misc

    const onClickSave:Function = () => {
        const pronound:Object = props.pronound.getIn(['addedit','pronound'])
        validatePronound(pronound)
        PronoundActions.onClickSavePronound(pronound)
    }

    const baseControls:Object =
        <div>
            <label htmlFor='base'>Pronoun</label>
            <input id='base' name='base' type='text'
                   value={props.pronound.getIn(['addedit','pronound','base'])}
                   onChange={(e)=>PronoundActions.onChangeBase(e.target.value)}
            />
        </div>

    const onDelete:Function = () => PronoundActions.onClickDeletePronound(props.pronound.getIn(['addedit','pronound','id']))

    const buttonSave:Object   = <button id='save-pronound'   onClick={onClickSave}>{sm.save}</button>
    const buttonDelete:Object = <button id='delete-pronound' onClick={onDelete}>{sm.delete}</button>
    const buttonCancel:Object = <button id='cancel'          onClick={PronoundActions.onClickCancel}>{sm.cancel}</button>

    const theButtons:Object = (props.pronound.getIn(['addedit','addPronound'])) ?
        <div>{buttonSave}{buttonCancel}</div> : <div>{buttonSave}{buttonDelete}{buttonCancel}</div>

    return(
        <div id='pronound-addedit-form' style={style}>
            {baseControls}
            {theButtons}
        </div>
    )

}

export default PronoundAEForm
