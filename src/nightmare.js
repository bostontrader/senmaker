var Nightmare = require('nightmare')
//const should = require('chai').should()

describe('Starting at Level00', () => {

    //this.timeout(30000)

    const url = 'http://localhost:8081'

    it('Should work correctly', (done) => {

        var nightmare = new Nightmare({show:true, width:600, height:800})

        nightmare
            .goto(url)
            .wait(250)
            .click('#iUnderstand') .wait(250)
            .click('#level-next') .wait(250)       // goto level 01

            .click('#add-noun') .wait(250)
            .type('#base', 'carrot'). wait(250)
            .click('#save') .wait(250)

            // edit a noun
            .click('#n-1') .wait(250)
            .type('#base', 'beaver'). wait(250)
            .click('#save') .wait(250)

            .click('#n-1') .wait(250)
            .click('#delete') .wait(250)

            .click('#level-next') .wait(250)       // goto level 02
            .click('#add-verb') .wait(250)
            .type('#base', 'eat'). wait(250)
            .click('#save') .wait(250)

            // edit a verb
            .click('#v-1') .wait(1000)
            .type('#base', 'run'). wait(2000)
            .click('#save') .wait(1000)

            .click('#v-1') .wait(1000)
            .click('#delete') .wait(1000)
            .click('#level-next') .wait(1000)       // goto level 03

            .end()
            .then(function(result){
                //result.should.equal(false)
                done()
            })
            //.catch(function (error) {
                //console.error('failed:', error)
                //done()
            //})
    }).timeout(30000)
})
