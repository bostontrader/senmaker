// @flow
import React from 'react'

import VerbdActions from '../../../../data/dictionary/verbd/VerbdActions'
//import PastTenseRuleSelect from '../PastTenseRuleSelect'

function VerbdEditForm(props:Object):Object {

    const style:Object = {
        border: '1px solid black',
        margin: '5px'
    }

    const s:Object = props.strings

    const onClickSave:Function = () => VerbdActions.onClickSaveVerbd({
        id: props.verbd.getIn(['addedit','verbd','id']),
        base: props.verbd.getIn(['addedit','verbd','base']),
        //pastTense: props.verbd.getIn(['addedit','verbd','pastTense'])
    })
    const onDelete:Function = () => VerbdActions.onClickDeleteVerbd(props.verbd.getIn(['addedit','verbd','id']))

    let verbdEditForm:Object

    /*if(props.app.getIn(['level','currentLevel'])) {
        verbdEditForm =
            <div>
                <label htmlFor='base'>Base</label>
                <input id='base' name='base' type='text'
                    value={props.verbd.getIn(['addedit','verbd','base'])}
                    onChange={(e)=>VerbdActions.onChangeBase(e.target.value)}
                />
                <label htmlFor='pastTense'>Past Tense</label>
                <input id='pastTense' name='pastTense' type='text'
                    value={props.verbd.getIn(['addedit','verbd','pastTense'])}
                    onChange={(e)=>VerbdActions.onChangePastTense(e.target.value)}
                />
                <PastTenseRuleSelect pastTense_rule={0}/>

                <button id='save-verbd' onClick={onClickSave}>{s.save}</button>
                <button id='cancel'     onClick={VerbdActions.onClickCancel}>{s.cancel}</button>
            </div>

    } else {*/
        verbdEditForm =
            <div id="verbd-edit-form" style={style}>
                <label htmlFor='base'>Base</label>
                <input id='base' name='base' type='text'
                    value={props.verbd.getIn(['addedit','verbd','base'])}
                    onChange={(e)=>VerbdActions.onChangeBase(e.target.value)}
                />
                <button id='save-verbd'   onClick={onClickSave}>{s.save}</button>
                <button id='delete-verbd' onClick={onDelete}>{s.delete}</button>
                <button id='cancel'       onClick={VerbdActions.onClickCancel}>{s.cancel}</button>
            </div>
    //}

    return verbdEditForm

}

export default VerbdEditForm
