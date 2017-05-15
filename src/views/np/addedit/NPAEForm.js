// @flow
import React from 'react'
import {Radio}      from 'react-radio-group'
import {RadioGroup} from 'react-radio-group'

import AdjectivdSelect from '../../dictionary/adjectivd/AdjectivdSelect'
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

    const onClickSave:Function = () => {
        const np:Object = props.np.getIn(['addedit','np'])
        validateNP(np)
        NPActions.onClickSaveNP(np)
    }

    const onDelete:Function = () => NPActions.onClickDeleteNP(props.np.getIn(['addedit','np','id']))

    const buttonSave:Object   = <button id='save-np'   onClick={onClickSave}>{s.save}</button>
    const buttonDelete:Object = <button id='delete-np' onClick={onDelete}>{s.delete}</button>
    const buttonCancel:Object = <button id='cancel'    onClick={NPActions.onClickCancel}>{s.cancel}</button>

    // add mode or edit mode?
    const theButtons:Object = (props.np.getIn(['addedit','addNP'])) ?
        <div>{buttonSave}{buttonCancel}</div> : <div>{buttonSave}{buttonDelete}{buttonCancel}</div>

    // should be nound because we want a select list of nound!
    const availableNounds:Array<Object> = props.nound.getIn(['dict','coll']).toArray().map(function(nound) {
        return {value:nound.get('id'), label:nound.get('base')}
    })
    const selectedNound:string = props.np.getIn(['addedit','np','nound','id'])

    // should be adjectivd because we want a select list of adjectivd!
    const availableAdjectivds:Array<Object> = props.adjectivd.getIn(['dict','coll']).toArray().map(function(adjectivd) {
        return {value:adjectivd.get('id'), label:adjectivd.get('base')}
    })

    //const selectedAdjectivds:Array<string> = ['1','3']
    const selectedAdjectivds:Array<string> = Array.from(props.np.getIn(['addedit','np','adjectivds']), adjectivd =>
        adjectivd.get('id')
    )

    const onChangeNound:Function = (id) => {NPActions.onChangeSelectedNound(props.nound.getIn(['dict','coll',id]))}
    const onChangeAdjectivd:Function = (ids) => {
        // ids is an array of objects. Use this to build an array of Adjectivd
        NPActions.onChangeSelectedAdjectivds(
            ids.map( (id) => {return props.adjectivd.getIn(['dict','coll',id.value])})
        )
    }

    const radioDefiniteness:Object =
        <RadioGroup name="definiteness" selectedValue={props.np.getIn(['addedit','np','definiteness'])} onChange={(e)=>{NPActions.onChangeDefiniteness(e)}}>
            <Radio id='definite'   value="definite" />Definite
            <Radio id='indefinite' value="indefinite" />Indefinite
        </RadioGroup>

    let npAEForm:?Object = null

    switch(props.npPanelLevel) {

        case NPPanelLevel.L1:
            npAEForm =
                <div style={style}>
                    <NoundSelect options={availableNounds} value={selectedNound} onChange={onChangeNound} />
                    {radioDefiniteness}
                    <p id="generatedText">{props.np.getIn(['addedit','np','generatedText'])}</p>
                </div>
            break

        case NPPanelLevel.L2:
            npAEForm =
                <div style={style}>
                    <NoundSelect options={availableNounds} value={selectedNound} onChange={onChangeNound} />
                    {radioDefiniteness}
                    <p id="generatedText">{props.np.getIn(['addedit','np','generatedText'])}</p>
                    {theButtons}
                </div>
            break

        case NPPanelLevel.ADJECTIVES:
            npAEForm =
                <div style={style}>
                    <NoundSelect options={availableNounds} value={selectedNound} onChange={onChangeNound} />
                    {radioDefiniteness}
                    <AdjectivdSelect options={availableAdjectivds} value={selectedAdjectivds}   onChange={onChangeAdjectivd} />

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
