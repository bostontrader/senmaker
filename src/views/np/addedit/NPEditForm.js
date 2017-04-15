import React from 'react'

import NPAEActions from '../../../data/np/addedit/NPAEActions'
//import {NPPanelLevel} from '../../../../data/dictionary/np/NPConstants'
//import PluralizationRuleSelect from './PluralizationRuleSelect'

function NPEditForm(props) {

    const style = {
        border: '1px solid black',
        margin: '5px'
    }

    const onClickSave = () => NPAEActions.onClickSaveNP({
        id: props.np.getIn(['addedit','np','id']),
        base: props.np.getIn(['addedit','np','base'])
    })
    const onDelete = () => NPAEActions.onClickDeleteNP(props.np.getIn(['addedit','np','id']))
    const s = props.strings

    let npEditForm = null

    //if(props.level.getIn(['currentAppLevelConfig','npPanel']) >= NPPanelLevel.PLURALIZATION) {
        /*npEditForm =
            <div>
                <label htmlFor='base'>Base</label>
                <input id='base' name='base' type='text' value={props.np.getIn(['addedit','noun','base'])} onChange={(e)=>props.np.getIn(['onChangeNounBase'])(e.target.value)}/>
                <PluralizationRuleSelect pluralization_rule={0}/>
                <input id='save-np' type='submit' value={s.save}/>
                <button id='delete-np' onClick={onDelete}>{s.delete}</button>
                <button onClick={props.onCancelNoun}>{s.cancel}</button>
            </div>*/
    //} else if(props.level.getIn(['currentAppLevelConfig','npPanel']) >= NPPanelLevel.BASE) {
        npEditForm =
            <div id="np-edit-form" style={style}>
                <label htmlFor='base'>Base</label>
                <input id='base' name='base' type='text'
                    value={props.np.getIn(['addedit','np','base'])}
                    onChange={(e)=>NPAEActions.onChangeBase(e.target.value)}
                />
                <button id='save-np'   onClick={onClickSave}>{s.save}</button>
                <button id='delete-np' onClick={onDelete}>{s.delete}</button>
                <button id='cancel'       onClick={NPAEActions.onClickCancel}>{s.cancel}</button>
            </div>
    //}

    return npEditForm

}

export default NPEditForm
