var Nightmare = require('nightmare')
//const should = require('chai').should()

describe('Starting at Level00', () => {


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

        nightmare.goto(url)

            .click('#iUnderstand')
            .click('#level-next')      // goto level 01

            .click('#add-nound')
            .click('#nound-add-form #cancel')

            // The NoundAddForm should now go away.
            .evaluate(function() {
                return document.querySelector('#nound-add-form') === null
            })
            .then(
                nound_add_form_gone => {
                    if (!nound_add_form_gone)
                        throw('nound-add-form has not gone away after cancel')
                    return nightmare
                        .click('#add-nound')
                        .type('#base', 'carrot')
                        .click('#save-nound') .wait(1000)

                        // The NoundAddForm should now go away.
                        .evaluate(function() {
                            return document.querySelector('#nound-add-form') === null
                        })
                }
            )
            .then(nound_add_form_gone => {
                if (!nound_add_form_gone)
                    throw('nound-add-form has not gone away after save')
                return nightmare
                    .evaluate(function() {
                        return document.querySelector('#insertNoundCheck') !== null
                    })
            })
            .then(insertNoundCheckFound => {
                if (!insertNoundCheckFound)
                    throw('insertNoundCheck did not appear after save')
                return nightmare
                    .click('#n-1')
                    .click('#cancel').wait(1000)
                    .evaluate(function() {
                        return document.querySelector('#nound-edit-form') === null
                    })
            })
            .then(nound_edit_form_gone => {
                if (!nound_edit_form_gone)
                    throw('nound-edit-form has not gone away after cancel')
                return nightmare
                    .click('#n-1') .wait(250)
                    .type('#base', 'beaver'). wait(250)
                    .click('#save-nound') .wait(250)
                    .evaluate(function() {
                        return document.querySelector('#nound-edit-form') === null
                    })
            })
            .then(nound_edit_form_gone => {
                if (!nound_edit_form_gone)
                    throw('nound-edit-form has not gone away after save')
                return nightmare
                    .evaluate(function() {
                        return document.querySelector('#updateNoundCheck') !== null
                    })
            })
            .then(updateNoundCheckFound => {
                if (!updateNoundCheckFound)
                    throw('updateNoundCheck did not appear after save')
                return nightmare
                    .click('#n-1') .wait(250)
                    .click('#delete-nound') .wait(250)
                    .evaluate(function() {
                        return document.querySelector('#nound-edit-form') === null
                    })
            })
            .then(nound_edit_form_gone => {
                if (!nound_edit_form_gone)
                    throw('nound-edit-form has not gone away after delete')
                return nightmare
                    .evaluate(function() {
                        return document.querySelector('#deleteNoundCheck') !== null
                    })
            })
            .then(deleteNoundCheckFound => {
                if (!deleteNoundCheckFound)
                    throw('deleteNoundCheck did not appear after delete')
            })
            .then(res=>{
                return nightmare
                    .click('#level-next')      // goto level 02

                    .click('#add-verbd')
                    .click('#verbd-add-form #cancel').wait(250)

                    // The VerbdAddForm should now go away.
                    .evaluate(function() {
                        return document.querySelector('#verbd-add-form') === null
                    })
            })


            .then(
                verbd_add_form_gone => {
                    if (!verbd_add_form_gone)
                        throw('verbd-add-form has not gone away after cancel')
                    return nightmare
                        .click('#add-verbd') .wait(250)
                        .type('#base', 'jump'). wait(1000)
                        .click('#save-verbd') .wait(1000)

                        // The VerbdAddForm should now go away.
                        .evaluate(function() {
                            return document.querySelector('#verbd-add-form') === null
                        })
                }
            )
            .then(verbd_add_form_gone => {
                if (!verbd_add_form_gone)
                    throw('verbd-add-form has not gone away after save')
                return nightmare
                    .evaluate(function() {
                        return document.querySelector('#insertVerbdCheck') !== null
                    })
            })
            .then(insertVerbdCheckFound => {
                if (!insertVerbdCheckFound)
                    throw('insertVerbdCheck did not appear after save')
                return nightmare
                    .click('#v-1') .wait(1000)
                    .click('#cancel').wait(1000)
                    .evaluate(function() {
                        return document.querySelector('#verbd-edit-form') === null
                    })
            })
            .then(verbd_edit_form_gone => {
                if (!verbd_edit_form_gone)
                    throw('verbd-edit-form has not gone away after cancel')
                return nightmare
                    .click('#v-1') .wait(250)
                    .type('#base', 'beaver'). wait(250)
                    .click('#save-verbd') .wait(250)
                    .evaluate(function() {
                        return document.querySelector('#verbd-edit-form') === null
                    })
            })
            .then(verbd_edit_form_gone => {
                if (!verbd_edit_form_gone)
                    throw('verbd-edit-form has not gone away after save')
                return nightmare
                    .evaluate(function() {
                        return document.querySelector('#updateVerbdCheck') !== null
                    })
            })
            .then(updateVerbdCheckFound => {
                if (!updateVerbdCheckFound)
                    throw('updateVerbdCheck did not appear after save')
                return nightmare
                    .click('#v-1') .wait(250)
                    .click('#delete-verbd') .wait(250)
                    .evaluate(function() {
                        return document.querySelector('#verbd-edit-form') === null
                    })
            })
            .then(verbd_edit_form_gone => {
                if (!verbd_edit_form_gone)
                    throw('verbd-edit-form has not gone away after delete')
                return nightmare
                    .evaluate(function() {
                        return document.querySelector('#deleteVerbdCheck') !== null
                    })
            })
            .then(deleteVerbdCheckFound => {
                if (!deleteVerbdCheckFound)
                    throw('deleteVerbdCheck did not appear after delete')
            })
            .then(resolve => {
                done()
            })
            .catch(err => {console.log(err),done()})
    }).timeout(15000)

})
