import {findAll} from 'react-shallow-testutils'

// Count the number of elements with the given css_id.
const countWithId = (renderer, css_id) => {
    const n = findAll(renderer, (element) => {
        return (element && element.props && element.props.id===css_id)
    })
    return n.length
}

export {countWithId}
