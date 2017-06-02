// @flow
// Various functions intended to validate the structure and content of the several objects.

// 1. The word types

const validateAdjectivd:Function = (adjectivd:Object):boolean => {
    if(adjectivd.constructor.name !== 'Record') {
        console.log('Adjectivd must be of type Record.  Instead it is a ',adjectivd.constructor.name)
        console.log(adjectivd)
    }
    if(typeof(adjectivd.get('id')) !== 'string') {
        console.log('Adjectivd id must be a string.  Instead it is a ',typeof(adjectivd.get('id')))
    }
    return true
}

const validateAdverbd:Function = (adverbd:Object):boolean => {
    //if(adverbd.constructor.name !== 'Record') {
        //console.log('Adverbd must be of type Record.  Instead it is a ',adverbd.constructor.name)
        //console.log(adverbd)
        //throw('adverbd.constructor.name==='+adverbd.constructor.name)
    //}
    //if(typeof(adverbd.get('id')) !== 'string') {
        //console.log('Adverbd id must be a string.  Instead it is a ',typeof(adverbd.get('id')))
        //throw('up')
    //}
    return true
}

const validateConjunctiond:Function = (conjunctiond:Object):boolean => {
    //if(conjunctiond.constructor.name !== 'Record') {
    //console.log('Conjunctiond must be of type Record.  Instead it is a ',conjunctiond.constructor.name)
    //console.log(conjunctiond)
    //throw('conjunctiond.constructor.name==='+conjunctiond.constructor.name)
    //}
    //if(typeof(conjunctiond.get('id')) !== 'string') {
    //console.log('Conjunctiond id must be a string.  Instead it is a ',typeof(conjunctiond.get('id')))
    //throw('up')
    //}
    return true
}

const validateDeterminerd:Function = (determinerd:Object):boolean => {
    //if(determinerd.constructor.name !== 'Record') {
    //console.log('Determinerd must be of type Record.  Instead it is a ',determinerd.constructor.name)
    //console.log(determinerd)
    //throw('determinerd.constructor.name==='+determinerd.constructor.name)
    //}
    //if(typeof(determinerd.get('id')) !== 'string') {
    //console.log('Determinerd id must be a string.  Instead it is a ',typeof(determinerd.get('id')))
    //throw('up')
    //}
    return true
}

const validateNound:Function = (nound:Object):boolean => {
    if(nound.constructor.name !== 'Record') {
        // This is coming from Clause -> NP -> Nound.  Make clause is not doing the nound
        //console.log('Nound must be of type Record.  Instead it is a ',nound.constructor.name)
        //console.log(nound)
        //throw('nound.constructor.name==='+nound.constructor.name)
    }
    if(typeof(nound.get('id')) !== 'string') {
        console.log('Nound id must be a string.  Instead it is a ',typeof(nound.get('id')))
        //throw('up')
    }
    return true
}


const validatePrepositiond:Function = (prepositiond:Object):boolean => {
    if(prepositiond.constructor.name !== 'Record') {
        console.log('Prepositiond must be of type Record.  Instead it is a ',prepositiond.constructor.name)
        console.log(prepositiond)
    }
    if(typeof(prepositiond.get('id')) !== 'string') {
        console.log('Prepositiond id must be a string.  Instead it is a ',typeof(prepositiond.get('id')))
    }
    return true
}

const validatePronound:Function = (pronound:Object):boolean => {
    //if(pronound.constructor.name !== 'Record') {
    // This is coming from Clause -> NP -> Pronound.  Make clause is not doing the pronound
    //console.log('Pronound must be of type Record.  Instead it is a ',pronound.constructor.name)
    //console.log(pronound)
    //throw('pronound.constructor.name==='+pronound.constructor.name)
    //}
    //if(typeof(pronound.get('id')) !== 'string') {
    //console.log('Pronound id must be a string.  Instead it is a ',typeof(pronound.get('id')))
    //throw('up')
    //}
    return true
}

const validateVerbd:Function = (verbd:Object):boolean => {
    if(verbd.constructor.name !== 'Record') {
        //console.log('Verbd must be of type Record.  Instead it is a ',verbd.constructor.name)
        //console.log(verbd)
        //throw('verbd.constructor.name==='+verbd.constructor.name)
    }
    if(typeof(verbd.get('id')) !== 'string') {
        console.log('Verbd id must be a string.  Instead it is a ',typeof(verbd.get('id')))
        //throw('up')
    }
    return true
}

// 2. Other

const validateClause:Function = (clause:Object):boolean => {
    if(clause.constructor.name !== 'Record') {
        console.log('Clause must be of type Record.  Instead it is a ',clause.constructor.name)
        console.log(clause)
        //throw('clause.constructor.name==='+clause.constructor.name)
    }
    if(typeof(clause.get('id')) !== 'string') {
        console.log('Clause id must be a string.  Instead it is a ',typeof(clause.get('id')))
        //throw('up')
    }

    if(!validateNP( clause.getIn(['np']))) throw('up')
    if(!validateVP( clause.getIn(['vp']))) throw('up')

    return true
}



const validateNP:Function = (vp:Object):boolean => {
    if(vp.constructor.name !== 'Record') {
        console.log('NP must be of type Record.  Instead it is a ',vp.constructor.name)
        console.log(vp)
        //throw('vp.constructor.name==='+vp.constructor.name)
    }
    if(typeof(vp.get('id')) !== 'string') {
        console.log('NP id must be a string.  Instead it is a ',typeof(vp.get('id')))
        //throw('up')
    }

    if(!validateNound( vp.getIn(['nound']))) throw('up')
    return true
}



const validateVP:Function = (vp:Object):boolean => {
    if(vp.constructor.name !== 'Record') {
        console.log('VP must be of type Record.  Instead it is a ',vp.constructor.name)
        console.log(vp)
        //throw('vp.constructor.name==='+vp.constructor.name)
    }
    if(typeof(vp.get('id')) !== 'string') {
        console.log('VP id must be a string.  Instead it is a ',typeof(vp.get('id')))
        //throw('up')
    }

    if(!validateVerbd( vp.getIn(['verbd']))) throw('up')
    return true
}

export {validateAdjectivd}
export {validateAdverbd}
export {validateConjunctiond}
export {validateDeterminerd}
export {validateNound}
export {validatePrepositiond}
export {validatePronound}
export {validateVerbd}


export {validateClause}
export {validateNP}
export {validateVP}
