// @flow
import {validateAdjectivd} from './Validator'
import {validateAdverbd}   from './Validator'
import {validateClause}    from './Validator'
import {validateNound}     from './Validator'
import {validateNP}        from './Validator'
import {validateVerbd}     from './Validator'
import {validateVP}        from './Validator'
import Clause              from './clause/Clause'
import Adjectivd           from './dictionary/adjectivd/Adjectivd'
import Adverbd             from './dictionary/adverbd/Adverbd'
import Nound               from './dictionary/nound/Nound'
import Verbd               from './dictionary/verbd/Verbd'
import NP                  from './np/NP'
import VP                  from './vp/VP'

// Given an original Map of Maps which purport to be Adjectivd, return a new Map of Adjectivd Records.
const MakeMapOfAdjectivd:Function = (originalMap:Object):Object => {
    return originalMap.map(np => {
        let newAdjectivd:Object = Adjectivd(np)
        //newAdjectivd = newAdjectivd.set('nound', Adjectivd(np.get('nound')))
        //validateAdjectivd(newAdjectivd)
        return newAdjectivd
    })
}

// Given an original Map which purports to be a Adjectivd, return a new Adjectivd Record.
const MakeAdjectivd:Function = (originalMap:Object):Object => {
    let newAdjectivd:Object = Adjectivd(originalMap)
    //validateAdjectivd(newAdjectivd)
    return newAdjectivd
}

// Given an original Map of Maps which purport to be Adjectivd, return a new Map of Adjectivd Records.
const MakeMapOfAdverbd:Function = (originalMap:Object):Object => {
    return originalMap.map(np => {
        let newAdverbd:Object = Adverbd(np)
        //newAdverbd = newAdverbd.set('nound', Adverbd(np.get('nound')))
        //validateAdverbd(newAdverbd)
        return newAdverbd
    })
}

// Given an original Map which purports to be a Adverbd, return a new Adverbd Record.
const MakeAdverbd:Function = (originalMap:Object):Object => {
    let newAdverbd:Object = Adverbd(originalMap)
    //validateAdverbd(newAdverbd)
    return newAdverbd
}

// Clause
// Given an original Map of Maps which purport to be Clause, return a new Map of Clause Records.
const MakeMapOfClause:Function = (originalMap:Object):Object => {
    return originalMap.map(clause => {
        let newClause:Object = Clause(clause)
        newClause = newClause.set('np', NP(clause.get('np')))
        newClause = newClause.set('vp', VP(clause.get('vp')))
        validateClause(newClause)
        return newClause
    })
}

// Given an original Map which purports to be a Clause, return a new Clause Record.
const MakeClause:Function = (originalMap:Object):Object => {
    let newClause:Object = Clause(originalMap)
    const n:Object = newClause.get('np')
    newClause = newClause.set('np', NP(newClause.get('np')))
    newClause = newClause.set('vp', VP(newClause.get('vp')))
    validateClause(newClause)
    return newClause
}


// Nound
// Given an original Map of Maps which purport to be Nound, return a new Map of Nound Records.
const MakeMapOfNound:Function = (originalMap:Object):Object => {
    return originalMap.map(np => {
        let newNound:Object = Nound(np)
        //newNound = newNound.set('nound', Nound(np.get('nound')))
        validateNound(newNound)
        return newNound
    })
}

// Given an original Map which purports to be a Nound, return a new Nound Record.
const MakeNound:Function = (originalMap:Object):Object => {
    let newNound:Object = Nound(originalMap)
    validateNound(newNound)
    return newNound
}


// NP
// Given an original Map of Maps which purport to be NP, return a new Map of NP Records.
const MakeMapOfNP:Function = (originalMap:Object):Object => {
    return originalMap.map(np => {
        let newNP:Object = NP(np)
        newNP = newNP.set('nound', Nound(np.get('nound')))
        validateNP(newNP)
        return newNP
    })
}

// Given an original Map which purports to be a NP, return a new NP Record.
const MakeNP:Function = (originalMap:Object):Object => {
    let newNP:Object = NP(originalMap)
    newNP = newNP.set('nound', Nound(originalMap.get('nound')))
    validateNP(newNP)
    return newNP
}


// Given an original Map of Maps which purport to be Verbd, return a new Map of Verbd Records.
const MakeMapOfVerbd:Function = (originalMap:Object):Object => {
    return originalMap.map(np => {
        let newVerbd:Object = Verbd(np)
        //newVerbd = newVerbd.set('nound', Verbd(np.get('nound')))
        validateVerbd(newVerbd)
        return newVerbd
    })
}

// Given an original Map which purports to be a Verbd, return a new Verbd Record.
const MakeVerbd:Function = (originalMap:Object):Object => {
    let newVerbd:Object = Verbd(originalMap)
    validateVerbd(newVerbd)
    return newVerbd
}


// VP
// Given an original Map of Maps which purport to be VP, return a new Map of VP Records.
const MakeMapOfVP:Function = (originalMap:Object):Object => {
    return originalMap.map(vp => {
        let newVP:Object = VP(vp)
        newVP = newVP.set('verbd', Verbd(vp.get('verbd')))
        validateVP(newVP)
        return newVP
    })
}

// Given an original Map which purports to be a VP, return a new VP Record.
const MakeVP:Function = (originalMap:Object):Object => {
    let newVP:Object = VP(originalMap)
    newVP = newVP.set('verbd', Verbd(originalMap.get('verbd')))
    validateVP(newVP)
    return newVP
}

export {MakeMapOfAdjectivd}
export {MakeAdjectivd}

export {MakeMapOfAdverbd}
export {MakeAdverbd}

export {MakeMapOfClause}
export {MakeClause}

export {MakeMapOfNound}
export {MakeNound}

export {MakeMapOfNP}
export {MakeNP}

export {MakeMapOfVerbd}
export {MakeVerbd}

export {MakeMapOfVP}
export {MakeVP}
