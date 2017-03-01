import React from 'react'

function NounItem(props) {
    const {noun} = props;
    const onEditNoun = () => props.onEditNoun(noun)

    let nounItem = <div>noun item</div>
    if( props.level >= 2) {
        nounItem =
            <tr>
                <td>{noun.base}</td>
                <td>{noun.plural}</td>
                <td><button type="button" onClick={onEditNoun} >Edit</button></td>
            </tr>
    } else if( props.level >= 1) {
        nounItem =
            <tr>
                <td>{noun.base}</td>
                <td><button type="button" onClick={onEditNoun} >Edit</button></td>
            </tr>
    }

    return (nounItem)

}

export default NounItem
