var Nightmare = require('nightmare')

//var nightmareIntro        = require('./nightmareIntro')
//var nightmareLanguage = require('./nightmareLanguage')
var NoundTest         = require('./NoundTest')
//var VerbdTest         = require('./VerbdTest')
//var AdjectivdTest     = require('./AdjectivdTest')

//var nightmareAdjectivd    = require('./VerbdTest')
//var nightmareDefiniteness = require('./nightmareDefiniteness')

describe('Full Test...', () => {

    const url = 'http://localhost:8081'

    /**
     * Our primary task to to push buttons, enter text, and walk our way through the app. Our secondary task
     * is to verify that certain elements appear or vanish based on these actions.  It's tempting
     * to h/o/p/e believe that the unit testing covers this. But doing so here, in certain important
     * cases, eases our nerves re: is unit testing thorough enough?
     *
     */
    it('Should work correctly', (done) => {
        const nightmare = new Nightmare({show:true, width:600, height:800, zoomFactor: 0.5})
        //const delayA = 10
        const delayB = 250
        const delayC = 1000


        nightmare.goto(url).wait(delayC)
        /*.then(result => {
            return nightmare.evaluate(function() {
                return document.querySelector('#enFlag') !== null
            })
        })
        .then( enFlagFound => {
            if (!enFlagFound)
                throw('enFlagFound was not found')
        })
        .then( res => {return nightmareLanguage(nightmare, delayC)})
        //.then( res => {return nightmareIntro(nightmare, delayC)})


        // Advance to NoundTest
        .then( res => {
            return nightmare.click('#lesson-next').wait(delayB)
        })
        .then( res => {return NoundTest(nightmare, delayB)})
        // Rewind to the beginning
        .then( res => {
            return nightmare.click('#lesson-previous').wait(delayC)
        })



        // Advance to VerbdTest
        .then( res => {
            return nightmare
                .click('#lesson-next').wait(delayC)
                .click('#lesson-next').wait(delayC)
        })
        .then( res => {return VerbdTest(nightmare, delayB)})
        // Rewind to the beginning
        .then( res => {
            return nightmare
                .click('#lesson-previous').wait(delayC)
                .click('#lesson-previous').wait(delayC)
        })


        // Advance to AdjectivdTest
        .then( res => {
            return nightmare
                .click('#lesson-next').wait(delayC)
                .click('#lesson-next').wait(delayC)
                .click('#lesson-next').wait(delayC)
        })
        .then( res => {return AdjectivdTest(nightmare, delayB)})
        // Rewind to the beginning
        .then( res => {
            return nightmare
                .click('#lesson-previous').wait(delayC)
                .click('#lesson-previous').wait(delayC)
                .click('#lesson-previous').wait(delayC)
        })*/
        .then(result => {
            done()
        })
        
        


    }).timeout(16000)

})
