// @flow
import React from 'react'

import DeterminerdActions    from '../../../../data/dictionary/determinerd/DeterminerdActions'
import {validateDeterminerd} from '../../../../data/Validator'

function DeterminerdAEForm(props:Object):Object {

    const style:Object = {
        border: '1px solid black',
        margin: '5px'
    }

    const sm:Object = props.strings.get('strings').misc

    const onClickSave:Function = () => {
        const determinerd:Object = props.determinerd.getIn(['addedit','determinerd'])
        validateDeterminerd(determinerd)
        DeterminerdActions.onClickSaveDeterminerd(determinerd)
    }

    const baseControls:Object =
        <div>
            <label htmlFor='base'>Noun</label>
            <input id='base' name='base' type='text'
                value={props.determinerd.getIn(['addedit','determinerd','base'])}
                onChange={(e)=>DeterminerdActions.onChangeBase(e.target.value)}
            />
        </div>

    const onDelete:Function = () => DeterminerdActions.onClickDeleteDeterminerd(props.determinerd.getIn(['addedit','determinerd','id']))

    const buttonSave:Object   = <button id='save-determinerd'   onClick={onClickSave}>{sm.save}</button>
    const buttonDelete:Object = <button id='delete-determinerd' onClick={onDelete}>{sm.delete}</button>
    const buttonCancel:Object = <button id='cancel'             onClick={DeterminerdActions.onClickCancel}>{sm.cancel}</button>

    const theButtons:Object = (props.determinerd.getIn(['addedit','addDeterminerd'])) ?
        <div>{buttonSave}{buttonCancel}</div> : <div>{buttonSave}{buttonDelete}{buttonCancel}</div>

    return(
        <div id='determinerd-addedit-form' style={style}>
            {baseControls}
            {theButtons}
        </div>
    )

}

export default DeterminerdAEForm
