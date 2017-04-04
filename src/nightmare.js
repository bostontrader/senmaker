var Nightmare = require('nightmare')
var nightmareNound = require('./nightmareNound')
var nightmareVerbd = require('./nightmareVerbd')
var nightmareDefiniteness = require('./nightmareDefiniteness')

describe('In the beginning...', () => {

    const url = 'http://localhost:8081'

    /**
     * Our primary task to to push buttons, enter text, and walk our way through the app. Our secondary task
     * is to verify that certain elements appear or vanish based on these actions.  It's tempting
     * to h/o/p/e believe that the unit testing covers this. But doing so here, in certain important
     * cases, eases our nerves re: is unit testing thorough enough?
     *
     */
    it('Should work correctly', (done) => {
        const nightmare = new Nightmare({show:true, width:600, height:800})
        const delay = 250 // delay between steps

        // test reset at the end
        nightmare.goto(url).wait(delay)

        // 00. Verify that we can switch between languages and that the correct language switch is
        //    displayed.
            
        // 00.1 By default the language starts at zh.  Verify that we _can_ see the enFlag, but _not_ the zhFlag.
        .evaluate(function() {
            return document.querySelector('#enFlag') !== null
        }).then( enFlagFound => {
            if (!enFlagFound)
                throw('enFlagFound was not found')
        })

        // Now look for the zh flag
        .then( res => {
            return nightmare
                .evaluate(function () {
                    return document.querySelector('#zhFlag') === null
                })
        })
        .then( zhFlagNotFound => {
            if (!zhFlagNotFound)
                throw('zhFlagFound was found, but it shouldn\'t be there.')
        })

        // 00.2 Now switch to english. Verify that we _can_ see the zhFlag, but _not_ the enFlag.
        .then( res => {
            return nightmare
                .click('#enFlag').wait(delay)

                // Verify that we can see the zhFlag
                .evaluate(function () {
                    return document.querySelector('#zhFlag') !== null
                })
        }).then( zhFlagFound => {
            if (!zhFlagFound)
                throw('zhFlagFound was not found')
        })
        .then( res => {
            return nightmare
                .evaluate(function () {
                    return document.querySelector('#enFlag') === null
                })
        })
        .then( enFlagNotFound => {
            if (!enFlagNotFound)
                throw('enFlagFound was found, but it shouldn\'t be there.')
        })

        // 0. Now answer the intro lesson question. Can I see the checkmark?
        .then( res => {
            return nightmare
                .click('#iunderstandCheck').wait(delay)
                .evaluate(function () {
                    return document.querySelector('#iunderstandCheck') !== null
                })
        })
        .then( iunderstandCheck => {
            if (!iunderstandCheck)
                throw('iunderstandCheck was not found')
        })

        .then( res => {return nightmareNound(nightmare, delay)})
        .then( res => {return nightmareVerbd(nightmare, delay)})
        .then( res => {return nightmareDefiniteness(nightmare, delay)})
        .then(resolve => {done()})
        .catch(err => {console.log(err),done()})

    }).timeout(20000)

})
