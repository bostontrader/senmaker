import {findAll} from 'react-shallow-testutils'

// Count the number of elements with the given css_id.
const countWithId = (renderer, css_id) => {
    const n = findAll(renderer, (element) => {
        return (element && element.props && element.props.id===css_id)
    })
    return n.length
}

/*
 Given an array of actions to execute, enumerate all possible orders of execution
 and then sequentially pass each permutation to the testFunction to be executed.
 */
const heapsPermute = (actions, testFunction, n) => {
    n = n || actions.length // set n1 default to actions.length
    if (n === 1) {
        // If there is only one element in the actions, then just output that
        testFunction(actions)
    } else {
        for (let i = 1; i <= n; i += 1) {
            heapsPermute(actions, testFunction, n - 1)
            let j = (n % 2) ? 1 : i
            swap(actions, j - 1, n - 1); // -1 to account for javascript zero-indexing
        }
    }
}

// Swap two elements in an array
const swap = (array, pos1, pos2) => {
    const temp = array[pos1]
    array[pos1] = array[pos2]
    array[pos2] = temp
}

export {countWithId}
export {heapsPermute}
export {swap}
