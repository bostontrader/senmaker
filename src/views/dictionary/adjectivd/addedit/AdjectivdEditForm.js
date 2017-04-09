import React from 'react'

import AdjectivdAEActions from '../../../../data/dictionary/adjectivd/addedit/AdjectivdAEActions'

function AdjectivdEditForm(props) {

    const style = {
        border: '1px solid black',
        margin: '5px'
    }

    const onClickSave = () => AdjectivdAEActions.onClickSaveAdjectivd({
        id: props.adjectivd.getIn(['addEditAdjectivd','adjectivd','id']),
        base: props.adjectivd.getIn(['addEditAdjectivd','adjectivd','base'])
    })
    const onDelete = () => AdjectivdAEActions.onClickDeleteAdjectiv(props.adjectivd.getIn(['addEditAdjectivd','adjectivd','id']))
    const s = props.strings

    let adjectivdEditForm = null

    //if(props.level.getIn(['currentAppLevelConfig','adjectivdPanel']) >= AdjectivdPanelLevel.PLURALIZATION) {
        /*adjectivdEditForm =
            <div>
                <label htmlFor='base'>Base</label>
                <input id='base' name='base' type='text' value={props.adjectivd.getIn(['addEditAdjectivd','adjectiv','base'])} onChange={(e)=>props.adjectivd.getIn(['onChangeAdjectivBase'])(e.target.value)}/>
                <PluralizationRuleSelect pluralization_rule={0}/>
                <input id='save-adjectivd' type='submit' value={s.save}/>
                <button id='delete-adjectivd' onClick={onDelete}>{s.delete}</button>
                <button onClick={props.onCancelAdjectiv}>{s.cancel}</button>
            </div>*/
    //} else if(props.level.getIn(['currentAppLevelConfig','adjectivdPanel']) >= AdjectivdPanelLevel.BASE) {
        adjectivdEditForm =
            <div id="adjectivd-edit-form" style={style}>
                <label htmlFor='base'>Base</label>
                <input id='base' name='base' type='text' value={props.adjectivd.getIn(['addEditAdjectivd','adjectivd','base'])} onChange={(e)=>AdjectivdAEActions.onChangeBase(e.target.value)}/>
                <button id='save-adjectivd'   onClick={onClickSave}>{s.save}</button>
                <button id='delete-adjectivd' onClick={onDelete}>{s.delete}</button>
                <button id='cancel'       onClick={AdjectivdAEActions.onClickCancel}>{s.cancel}</button>
            </div>
    //}

    return adjectivdEditForm

}

export default AdjectivdEditForm
