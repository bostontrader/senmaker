const Nightmare = require('nightmare')
const should = require('chai').should()

describe('Starting at Level00', function () {

    this.timeout(2000)

    const url = 'http://localhost:8081'

    it('Should work correctly', function (done) {

        let nightmare = new Nightmare()

        nightmare
            .goto(url)
            .click('#iUnderstand')
            .click('#level-next')
            done()


    })


})



