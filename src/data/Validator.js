// @flow
// Various functions intended to validate the structure and content of the several objects.

const validateAdjectivd = (adjectivd:Object):boolean => {
    if(adjectivd.constructor.name !== 'Record') {
        // This is coming from Clause -> NP -> Adjectivd.  Make clause is not doing the adjectivd
        console.log('Adjectivd must be of type Record.  Instead it is a ',adjectivd.constructor.name)
        console.log(adjectivd)
        //throw('adjectivd.constructor.name==='+adjectivd.constructor.name)
    }
    if(typeof(adjectivd.get('id')) !== 'string') {
        console.log('Adjectivd id must be a string.  Instead it is a ',typeof(adjectivd.get('id')))
        //throw('up')
    }
    return true
}

const validateClause = (clause:Object):boolean => {
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

const validateNound = (nound:Object):boolean => {
    if(nound.constructor.name !== 'Record') {
        // This is coming from Clause -> NP -> Nound.  Make clause is not doing the nound
        console.log('Nound must be of type Record.  Instead it is a ',nound.constructor.name)
        console.log(nound)
        //throw('nound.constructor.name==='+nound.constructor.name)
    }
    if(typeof(nound.get('id')) !== 'string') {
        console.log('Nound id must be a string.  Instead it is a ',typeof(nound.get('id')))
        //throw('up')
    }
    return true
}

const validateNP = (vp:Object):boolean => {
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

const validateVerbd = (verbd:Object):boolean => {
    if(verbd.constructor.name !== 'Record') {
        console.log('Verbd must be of type Record.  Instead it is a ',verbd.constructor.name)
        console.log(verbd)
        //throw('verbd.constructor.name==='+verbd.constructor.name)
    }
    if(typeof(verbd.get('id')) !== 'string') {
        console.log('Verbd id must be a string.  Instead it is a ',typeof(verbd.get('id')))
        //throw('up')
    }
    return true
}

const validateVP = (vp:Object):boolean => {
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
export {validateClause}
export {validateNound}
export {validateNP}
export {validateVerbd}
export {validateVP}
