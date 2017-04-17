import React from 'react'

import AdjectivdActions from '../../../../data/dictionary/adjectivd/AdjectivdActions'



function AdjectivdEditForm(props) {

    const style = {
        border: '1px solid black',
        margin: '5px'
    }

    const onClickSave = () => AdjectivdActions.onClickSaveAdjectivd({
        id: props.adjectivd.getIn(['addedit','adjectivd','id']),
        base: props.adjectivd.getIn(['addedit','adjectivd','base'])
    })
    const onDelete = () => AdjectivdActions.onClickDeleteAdjectiv(props.adjectivd.getIn(['addedit','adjectivd','id']))
    const s = props.strings

    let adjectivdEditForm = null

    //if(props.level.getIn(['currentAppLevelConfig','adjectivdPanel']) >= AdjectivdPanelLevel.PLURALIZATION) {
        /*adjectivdEditForm =
            <div>
                <label htmlFor='base'>Base</label>
                <input id='base' name='base' type='text' value={props.adjectivd.getIn(['addedit','adjectiv','base'])} onChange={(e)=>props.adjectivd.getIn(['onChangeAdjectivBase'])(e.target.value)}/>
                <PluralizationRuleSelect pluralization_rule={0}/>
                <input id='save-adjectivd' type='submit' value={s.save}/>
                <button id='delete-adjectivd' onClick={onDelete}>{s.delete}</button>
                <button onClick={props.onCancelAdjectiv}>{s.cancel}</button>
            </div>*/
    //} else if(props.level.getIn(['currentAppLevelConfig','adjectivdPanel']) >= AdjectivdPanelLevel.BASE) {
        adjectivdEditForm =
            <div id="adjectivd-edit-form" style={style}>
                <label htmlFor='base'>Base</label>
                <input id='base' name='base' type='text'
                    value={props.adjectivd.getIn(['addedit','adjectivd','base'])}
                    onChange={(e)=>AdjectivdActions.onChangeBase(e.target.value)}
                />
                <button id='save-adjectivd'   onClick={onClickSave}>{s.save}</button>
                <button id='delete-adjectivd' onClick={onDelete}>{s.delete}</button>
                <button id='cancel'           onClick={AdjectivdActions.onClickCancel}>{s.cancel}</button>
            </div>
    //}

    return adjectivdEditForm

}

export default AdjectivdEditForm
