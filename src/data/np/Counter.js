let _counter = 1

/**
 * This is a simple counter for providing unique ids.
 */
const Counter = {
    increment() {
        return 'np-' + String(_counter++)
    }
}

export default Counter
