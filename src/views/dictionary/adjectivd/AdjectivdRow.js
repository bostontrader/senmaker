import React from 'react'

import AdjectivdAEActions    from '../../../data/dictionary/adjectivd/addedit/AdjectivdAEActions'

function AdjectivdRow(props) {
    const {adjectiv} = props
    //const onClickEditAdjectivd = () => props.onClickEditAdjectivd(adjectiv)
    const onClickEditAdjectivd = () => AdjectivdAEActions.onClickEditAdjectivd(adjectiv)
    //const onClickSave = () => props.adjectivd.getIn(['onClickSaveAdjectivd'])({base: props.adjectivd.getIn(['addEditAdjectivd','adjectivd','base'])})

    let adjectivdRow = <div>adjectiv item</div>
    //if( props.level >= AdjectivdPanelLevel.PLURALIZATION) {
        /*adjectivdRow =
            <tr>
                <td>{adjectiv.base}</td>
                <td>{adjectiv.plural}</td>
                <td><button id={adjectiv.id} type="button" onClick={onClickEditAdjectivd} >{props.strings.edit}</button></td>
            </tr>*/
    //} else if( props.level >= AdjectivdPanelLevel.BASE) {
        adjectivdRow =
            <tr>
                <td>{adjectiv.base}</td>
                <td><button id={adjectiv.id} type="button" onClick={onClickEditAdjectivd} >{props.strings.edit}</button></td>
            </tr>
    //}

    return (adjectivdRow)

}

export default AdjectivdRow
