// @flow
import React from 'react'
import {Radio}      from 'react-radio-group'
import {RadioGroup} from 'react-radio-group'

import NoundSelect     from '../../dictionary/nound/NoundSelect'
import NPActions       from '../../../data/np/NPActions'
import {validateVerbd} from '../../../data/Validator'
import {validateNP}    from '../../../data/Validator'
import {NPPanelLevel}  from '../../../data/np/NPConstants'

function NPAEForm(props:Object):?Object {

    const style:Object = {
        border: '1px solid black',
        margin: '5px'
    }

    const s:Object = props.strings

    const onClickSave = () => {
        const np:Object = props.np.getIn(['addedit','np'])
        validateNP(np)
        NPActions.onClickSaveNP(np)
    }

    const onDelete:Function = () => NPActions.onClickDeleteNP(props.np.getIn(['addedit','np','id']))

    const buttonSave:Object   = <button id='save-np'   onClick={onClickSave}>{s.save}</button>
    const buttonDelete:Object = <button id='delete-np' onClick={onDelete}>{s.delete}</button>
    const buttonCancel:Object = <button id='cancel'    onClick={NPActions.onClickCancel}>{s.cancel}</button>

    // add mode or edit mode?
    const theButtons:Object = (props.np.getIn(['addedit','np','id'])) ?
        <div>{buttonSave}{buttonDelete}{buttonCancel}</div> : <div>{buttonSave}{buttonCancel}</div>

    // should be nound because we want a select list of nound!
    const selectOptions = props.nound.getIn(['dict','coll']).toArray().map(function(nound) {
        return {value:nound.get('id'), label:nound.get('base')}
    })
    const selectedValue:string = props.np.getIn(['addedit','np','nound','id'])

    const onChangeNound = (id) => {
        NPActions.onChangeSelectedNound(props.nound.getIn(['dict','coll',id]))
    }

    let npAEForm:?Object = null

    switch(props.npPanelLevel) {

        case NPPanelLevel.L1:
            npAEForm =
                <div style={style}>
                    <NoundSelect options={selectOptions} value={selectedValue} onChange={onChangeNound} />
                    <RadioGroup name="definiteness" selectedValue={props.np.getIn(['addedit','np','definiteness'])} onChange={(e)=>{NPActions.onChangeDefiniteness(e)}}>
                        <Radio value="definite" />Definite
                        <Radio value="indefinite" />Indefinite
                    </RadioGroup>
                    <p id="generatedText">{props.np.getIn(['addedit','np','generatedText'])}</p>
                </div>
            break

        case NPPanelLevel.L2:
            npAEForm =
                <div style={style}>
                    <NoundSelect options={selectOptions} value={selectedValue} onChange={onChangeNound} />
                    <RadioGroup name="definiteness" selectedValue={props.np.getIn(['addedit','np','definiteness'])} onChange={(e)=>{NPActions.onChangeDefiniteness(e)}}>
                        <Radio value="definite" />Definite
                        <Radio value="indefinite" />Indefinite
                    </RadioGroup>
                    <p id="generatedText">{props.np.getIn(['addedit','np','generatedText'])}</p>
                    {theButtons}
                </div>
            break

        case NPPanelLevel.ADJECTIVES:
            npAEForm =
                <div style={style}>
                    <NoundSelect options={selectOptions} value={selectedValue} onChange={onChangeNound} />
                    <RadioGroup name="definiteness" selectedValue={props.np.getIn(['addedit','np','definiteness'])} onChange={(e)=>{NPActions.onChangeDefiniteness(e)}}>
                        <Radio value="definite" />Definite
                        <Radio value="indefinite" />Indefinite
                    </RadioGroup>
                    <p id="generatedText">{props.np.getIn(['addedit','np','generatedText'])}</p>
                    {theButtons}
                </div>
            break

        default:
            // npAEForm already has a suitable default. Do nothing.

    }

    return npAEForm

}

export default NPAEForm