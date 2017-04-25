// @flow
import {validateNP} from './Validator'
import {validateVP} from './Validator'
import Nound        from './dictionary/nound/Nound'
import Verbd        from './dictionary/verbd/Verbd'
import NP           from './np/NP'
import VP           from './vp/VP'

// Given an original Map of Maps which purport to be NP, return a new Map of NP Records.
const MakeMapOfNP = (originalMap:Object) => {
    return originalMap.map(np => {
        let newNP = NP(np)
        newNP = newNP.set('nound', Nound(np.get('nound')))
        validateNP(newNP)
        return newNP
    })
}

// Given an original Map which purports to be a NP, return a new NP Record.
const MakeNP = (originalMap:Object) => {
    let newNP = NP(originalMap)
    newNP = newNP.set('nound', Nound(originalMap.get('nound')))
    validateNP(newNP)
    return newNP
}

// Given an original Map of Maps which purport to be VP, return a new Map of VP Records.
const MakeMapOfVP = (originalMap:Object) => {
    return originalMap.map(vp => {
        let newVP = VP(vp)
        newVP = newVP.set('verbd', Verbd(vp.get('verbd')))
        validateVP(newVP)
        return newVP
    })
}

// Given an original Map which purports to be a VP, return a new VP Record.
const MakeVP = (originalMap:Object) => {
    let newVP = VP(originalMap)
    newVP = newVP.set('verbd', Verbd(originalMap.get('verbd')))
    validateVP(newVP)
    return newVP
}

export {MakeMapOfNP}
export {MakeNP}
export {MakeMapOfVP}
export {MakeVP}
