var Nightmare = require('nightmare')

//describe('In the beginning D...', () => {


    const AdjectivdTest = (nightmare, delay) => {
        return nightmare
            //.click('#lesson-next').wait(delay)
            //.click('#lesson-next').wait(delay)
            //.click('#lesson-next').wait(delay)

            .click('#add-adjectivd').wait(delay)
            .click('#adjectivd-addedit-form #cancel').wait(delay)

            // The adjectivdAddForm should now go away.
            .evaluate(function () {
                return document.querySelector('#adjectivd-addedit-form') === null
            })

            .then(adjectivd_add_form_gone => {
                if (!adjectivd_add_form_gone)
                    throw('adjectivd-addedit-form has not gone away after cancel')
            })
            .then( res => {
                return nightmare
                    .click('#add-adjectivd').wait(delay)
                    .type('#base', 'carrot').wait(delay)
                    .click('#save-adjectivd').wait(delay)

                    // The AdjectivdAddForm should now go away.
                    .evaluate(function() {
                        return document.querySelector('#adjectivd-addedit-form') === null
                    })
            })
            .then(adjectivd_add_form_gone => {
                if (!adjectivd_add_form_gone)
                    throw('adjectivd-addedit-form has not gone away after save')
            })
            .then( res => {
                return nightmare
                    .evaluate(function() {
                        return document.querySelector('#insertAdjectivdCheck') !== null
                    })
            })
            .then(insertAdjectivdCheckFound => {
                if (!insertAdjectivdCheckFound)
                    throw('insertAdjectivdCheck did not appear after save')
            })

            .then( res => {
                return nightmare
                    .click('#id1').wait(delay)
                    .click('#cancel').wait(delay)
                    .evaluate(function() {
                        return document.querySelector('#adjectivd-addeditedit-form') === null
                    })
            })
            .then(adjectivd_edit_form_gone => {
                if (!adjectivd_edit_form_gone)
                    throw('adjectivd-addeditedit-form has not gone away after cancel')
            })

            .then( res => {
                return nightmare
                    .click('#id1').wait(delay)
                    .type('#base', 'beaver').wait(delay)
                    .click('#save-adjectivd').wait(delay)
                    .evaluate(function() {
                        return document.querySelector('#adjectivd-addeditedit-form') === null
                    })
            })
            .then(adjectivd_edit_form_gone => {
                if (!adjectivd_edit_form_gone)
                    throw('adjectivd-addeditedit-form has not gone away after save')
            }).then( res => {
                return nightmare
                    .evaluate(function() {
                        return document.querySelector('#updateAdjectivdCheck') !== null
                    })
            })
            .then(updateAdjectivdCheckFound => {
                if (!updateAdjectivdCheckFound)
                    throw('updateAdjectivdCheck did not appear after save')
            }).then( res => {
                return nightmare
                    .click('#id1').wait(delay)
                    .click('#delete-adjectivd').wait(delay)
                    .evaluate(function() {
                        return document.querySelector('#adjectivd-addeditedit-form') === null
                    })
            })
            .then(adjectivd_edit_form_gone => {
                if (!adjectivd_edit_form_gone)
                    throw('adjectivd-addeditedit-form has not gone away after delete')
            })
            .then( res => {
                return nightmare
                    .evaluate(function() {
                        return document.querySelector('#deleteAdjectivdCheck') !== null
                    })
            })
            .then(deleteAdjectivdCheckFound => {
                if (!deleteAdjectivdCheckFound)
                    throw('deleteAdjectivdCheck did not appear after delete')
            })
    }

module.exports = AdjectivdTest
