import React from 'react'

import AdjectivdActions from '../../../../data/dictionary/adjectivd/AdjectivdActions'



function AdjectivdAddForm(props) {

    const style = {
        border: '1px solid black',
        margin: '5px'
    }

    const onClickSave = () => AdjectivdActions.onClickSaveAdjectivd({
        base: props.adjectivd.getIn(['addedit','adjectivd','base'])
    })
    const s = props.strings

    let adjectivdAddForm = null

    //if(props.level.getIn(['currentAppLevelConfig', 'adjectivdPanel']) >= AdjectivdPanelLevel.PLURALIZATION) {
        /*adjectivdAddForm =
            <div>
                <label htmlFor='base'>Base</label>
                <input name='base' type='text'  />
                <PluralizationSelect pluralization_rule={0}/>
                <input type='submit' value={s.save} onClick={onInsert}/>
                <button onClick={props.onCancelAdjectiv}>{s.cancel}</button>
            </div>*/

    //} else if(props.level.getIn(['currentAppLevelConfig', 'adjectivdPanel']) >= AdjectivdPanelLevel.BASE) {
        adjectivdAddForm =
            <div id="adjectivd-add-form" style={style}>
                <label htmlFor='base'>Base</label>
                <input id='base' name='base' type='text'
                    value={props.adjectivd.getIn(['addedit','adjectivd','base'])}
                    onChange={(e)=>AdjectivdActions.onChangeBase(e.target.value)}
                />
                <button id='save-adjectivd' onClick={onClickSave}>{s.save}</button>
                <button id='cancel'         onClick={AdjectivdActions.onClickCancel}>{s.cancel}</button>
            </div>
    //}

    return adjectivdAddForm
}

export default AdjectivdAddForm
