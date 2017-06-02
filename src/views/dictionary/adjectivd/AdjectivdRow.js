// @flow
import React from 'react'

import Adjectivd        from '../../../data/dictionary/adjectivd/Adjectivd'
import AdjectivdActions from '../../../data/dictionary/adjectivd/AdjectivdActions'

function AdjectivdRow(props:Object):Object {

    let {adjectivd}:Object = props

    const onClickEditAdjectivd:Function = () => AdjectivdActions.onClickEditAdjectivd(adjectivd)
    const editButton:Object = <button id={'id'+adjectivd.id} type="button" onClick={onClickEditAdjectivd} >{props.strings.get('strings').misc.edit}</button>

    return(
        <tr>
            <td>{adjectivd.base}</td>
            <td>{editButton}</td>
        </tr>
    )

}

export default AdjectivdRow
