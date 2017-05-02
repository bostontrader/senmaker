var Nightmare = require('nightmare')

const VerbdTest = (nightmare, delay) => {
    return nightmare
        //.click('#lesson-next').wait(delay)
        //.click('#lesson-next').wait(delay)

        .click('#add-verbd').wait(delay)
        .click('#verbd-addedit-form #cancel').wait(delay)

        // The verbdAddForm should now go away.
        .evaluate(function () {
            return document.querySelector('#verbd-addedit-form') === null
        })  

        .then(
            verbd_add_form_gone => {
                if (!verbd_add_form_gone)
                    throw('verbd-addedit-form has not gone away after cancel')
            })
        .then( res => {
            return nightmare
                .click('#add-verbd').wait(delay)
                .type('#base', 'karrot').wait(delay)
                .click('#save-verbd').wait(delay)

                // The VerbdAddForm should now go away.
                .evaluate(function() {
                    return document.querySelector('#verbd-addedit-form') === null
                })
        })
        .then(verbd_add_form_gone => {
            if (!verbd_add_form_gone)
                throw('verbd-addedit-form has not gone away after save')
        })
        .then( res => {
            return nightmare
                .evaluate(function() {
                    return document.querySelector('#insertVerbdCheck') !== null
                })
        })
        .then(insertVerbdCheckFound => {
            if (!insertVerbdCheckFound)
                throw('insertVerbdCheck did not appear after save')
        })

        .then( res => {
            return nightmare
                .click('#id1').wait(delay)
                .click('#cancel').wait(delay)
                .evaluate(function() {
                    return document.querySelector('#verbd-addedit-form') === null
                })
        })
        .then(verbd_edit_form_gone => {
            if (!verbd_edit_form_gone)
                throw('verbd-addedit-form has not gone away after cancel')
        })

        .then( res => {
            return nightmare
                .click('#id1').wait(delay)
                .type('#base', 'beaver').wait(delay)
                .click('#save-verbd').wait(delay)
                .evaluate(function() {
                    return document.querySelector('#verbd-addedit-form') === null
                })
        })
        .then(verbd_edit_form_gone => {
            if (!verbd_edit_form_gone)
                throw('verbd-addedit-form has not gone away after save')
        })
        .then( res => {
            return nightmare
                .evaluate(function() {
                    return document.querySelector('#updateVerbdCheck') !== null
                })
        })
        .then(updateVerbdCheckFound => {
            if (!updateVerbdCheckFound)
                throw('updateVerbdCheck did not appear after save')
        })
        .then( res => {
            return nightmare
                .click('#id1').wait(delay)
                .click('#delete-verbd').wait(delay)
                .evaluate(function() {
                    return document.querySelector('#verbd-addedit-form') === null
                })
        })
        .then(verbd_edit_form_gone => {
            if (!verbd_edit_form_gone)
                throw('verbd-addedit-form has not gone away after delete')
        })
        .then( res => {
            return nightmare
                .evaluate(function() {
                    return document.querySelector('#deleteVerbdCheck') !== null
                })
        })
        .then(deleteVerbdCheckFound => {
            if (!deleteVerbdCheckFound)
                throw('deleteVerbdCheck did not appear after delete')
        })

}

module.exports = VerbdTest
