let _counter = 1

/**
 * This is a simple counter for providing unique ids.
 */
const Counter = {
    increment() {
        return 'ni-' + String(_counter++)
    }
}

export default Counter
