// @flow
/**
Detect the availability of HTML5 local storage.
 */

const localStorageAvailable:boolean = (() => {
    try {
        const storage = window['localStorage'], x = '__storage_test__'
        storage.setItem(x, x)
        storage.removeItem(x)
        return true
    } catch(e) {
        return false
    }}) ()

/*
Take an originalStateObject containing state deserialized from storage, for a particular
store and convert it to the most recent store format if necessary and possible.

Doing so will require the array of successive initial states which also contains conversion functions
for converting from one version to the next.
 */
const migrate:Function = (originalStateObject:Object, initialStates):Object => {

    const currentInitialState:Object = initialStates.slice(-1)[0]
    const originalVersion:number = originalStateObject.get('v')

    // If the version is undefined then we start fresh
    if(originalVersion === undefined) return currentInitialState

    // If the version is the most recent then use it
    if (originalVersion === currentInitialState.get('v')) return originalStateObject

    // Else migrate from the originalFormt to the current version
    const currentVersion:number = currentInitialState.get('v')
    let p = originalVersion
    while(p < currentVersion)
        console.log(p) // presently nobody has an advanced version

    return originalStateObject
}

export {localStorageAvailable}
export {migrate}
