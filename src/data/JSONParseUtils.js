// @flow
import {validateClause} from './Validator'
import {validateNound}  from './Validator'
import {validateNP}     from './Validator'
import {validateVP}     from './Validator'
import Clause           from './clause/Clause'
import Nound            from './dictionary/nound/Nound'
import Verbd            from './dictionary/verbd/Verbd'
import NP               from './np/NP'
import VP               from './vp/VP'

// Given an original Map of Maps which purport to be Clause, return a new Map of Clause Records.
const MakeMapOfClause = (originalMap:Object) => {
    return originalMap.map(clause => {
        let newClause = Clause(clause)
        newClause = newClause.set('np', NP(clause.get('np')))
        newClause = newClause.set('vp', VP(clause.get('vp')))
        validateClause(newClause)
        return newClause
    })
}

// Given an original Map which purports to be a Clause, return a new Clause Record.
const MakeClause = (originalMap:Object) => {
    let newClause = Clause(originalMap)
    const n = newClause.get('np')
    newClause = newClause.set('np', NP(newClause.get('np')))
    newClause = newClause.set('vp', VP(newClause.get('vp')))
    validateClause(newClause)
    return newClause
}

// Given an original Map of Maps which purport to be NP, return a new Map of NP Records.
const MakeMapOfNP = (originalMap:Object) => {
    return originalMap.map(np => {
        let newNP = NP(np)
        newNP = newNP.set('nound', Nound(np.get('nound')))
        validateNP(newNP)
        return newNP
    })
}

// Given an original Map of Maps which purport to be Nound, return a new Map of Nound Records.
const MakeMapOfNound = (originalMap:Object) => {
    return originalMap.map(np => {
        let newNound = Nound(np)
        //newNound = newNound.set('nound', Nound(np.get('nound')))
        validateNound(newNound)
        return newNound
    })
}

// Given an original Map which purports to be a Nound, return a new Nound Record.
const MakeNound = (originalMap:Object) => {
    let newNound = Nound(originalMap)
    validateNound(newNound)
    return newNound
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

export {MakeMapOfClause}
export {MakeClause}

export {MakeMapOfNound}
export {MakeNound}

export {MakeMapOfNP}
export {MakeNP}

export {MakeMapOfVP}
export {MakeVP}
