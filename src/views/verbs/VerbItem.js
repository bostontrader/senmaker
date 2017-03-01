import React from 'react'

function VerbItem(props) {
    const {verb} = props;
    const onEditVerb = () => props.onEditVerb(verb)

    let verbItem = <div>verb item</div>
    if( props.level >= 2) {
        verbItem =
            <tr>
                <td>{verb.base}</td>
                <td>{verb.pastTense}</td>
                <td><button type="button"  onClick={onEditVerb} >Edit</button></td>

            </tr>
    } else if( props.level >= 1) {
        verbItem =
            <tr>
                <td>{verb.base}</td>
                <td><button type="button" onClick={onEditVerb} >Edit</button></td>
            </tr>
    }

    return (verbItem)


    /*
     const {verb} = props;
     const onEditVerb = () => props.onEditVerb(verb)

     return (
     <tr>
     <td>
     {verb.base}
     </td>
     <td>
     {verb.pastTense}
     </td>
     <td>
     <button type="button"  onClick={onEditVerb} >Edit</button>
     </td>

     </tr>
     )
     */

}

export default VerbItem
