let _counter = 1

/**
 * This is a simple counter for providing unique ids.
 */
const Counter = {
    increment() {
        return 'v-' + String(_counter++)
    }
}

export default Counter
