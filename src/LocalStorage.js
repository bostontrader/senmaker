/**
Detect the availability of HTML5 local storage.
 */

const localStorageAvailable = (() => {
    try {
        const storage = window['localStorage'], x = '__storage_test__'
        storage.setItem(x, x)
        storage.removeItem(x)
        return true
    } catch(e) {
        return false
    }})()

export {localStorageAvailable}
