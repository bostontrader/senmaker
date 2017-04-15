import React from 'react'

import VerbdAEActions from '../../../../data/dictionary/verbd/addedit/VerbdAEActions'
//import {VerbdPanelLevel} from '../../../../data/dictionary/verbd/VerbdConstants'
//import PastTenseRuleSelect from '../PastTenseRuleSelect'

function VerbdEditForm(props) {

    const style = {
        border: '1px solid black',
        margin: '5px'
    }

    const onClickSave = () => VerbdAEActions.onClickSaveVerbd({
        id: props.verbd.getIn(['addedit','verbd','id']),
        base: props.verbd.getIn(['addedit','verbd','base'])
    })
    const onDelete = () => VerbdAEActions.onClickDeleteVerbd(props.verbd.getIn(['addedit','verbd','id']))
    const s = props.strings

    let verbdEditForm = null

    /*if(props.level.getIn(['currentAppLevelConfig','verbdPanel']) >= VerbdPanelLevel.PAST_TENSE) {
        verbdEditForm =
            <div id="verbd-edit-form">
                <label htmlFor='base'>Base</label>
                <input id='base' name='base' type='text' value={props.addEditVerb.getIn(['verb','base'])} onChange={(e)=>props.onChangeVerbBase(e.target.value)}/>
                <PastTenseRuleSelect pastTense_rule={props.editingVerb.pastTense_rule}/>
                <input id='save' type='submit' value={s.save}/>
                <button id='delete' onClick={onDelete}>{s.delete}</button>
                <button onClick={props.onCancelVerb}>{s.cancel}</button>
            </div>*/
    //} else if(props.level.getIn(['currentAppLevelConfig','verbdPanel']) >= VerbdPanelLevel.BASE) {
        verbdEditForm =
            <div id="verbd-edit-form" style={style}>
                <label htmlFor='base'>Base</label>
                <input id='base' name='base' type='text'
                    value={props.verbd.getIn(['addedit','verbd','base'])}
                    onChange={(e)=>VerbdAEActions.onChangeBase(e.target.value)}
                />
                <button id='save-verbd'   onClick={onClickSave}>{s.save}</button>
                <button id='delete-verbd' onClick={onDelete}>{s.delete}</button>
                <button id='cancel'       onClick={VerbdAEActions.onClickCancel}>{s.cancel}</button>
            </div>
    //}

    return verbdEditForm

}

export default VerbdEditForm
