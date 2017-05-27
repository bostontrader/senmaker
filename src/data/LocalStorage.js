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
        console.log(p++, currentVersion) // presently nobody has an advanced version

    return originalStateObject
}

const migrateNG:Function = (currentFormat:Object, mutators:Array<Function>, factoryReset:Object):Object => {
    console.log('currentFormat',currentFormat)
    let currentVersion: number = currentFormat.getIn(['v'])
    console.log('currentVersion',currentVersion)
    // If the currentVersion is undefined then we start fresh
    if (currentVersion === undefined) {
        console.log('return factoryReset')
        return factoryReset
    }


    // If the currentVersion is the most recent then so is currentFormat.  Return that.
    console.log(mutators.length)
    console.log(currentVersion === mutators.length)
    if (currentVersion === mutators.length) {
        console.log('return currentformat', currentFormat)
        return currentFormat
    }

    // Else migrate from the currentFormat to the latest format.

    console.log('time to migrate')
    let newState:Object = currentFormat
    while(currentVersion < mutators.length) {
        newState = mutators[currentVersion](newState)
        console.log('cv=', currentVersion++)
        console.log(newState)
    }
    return currentFormat
}

export {localStorageAvailable}
export {migrate}
export {migrateNG}
