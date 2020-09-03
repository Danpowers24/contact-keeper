const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
// bring in authorization middleware
const auth = require('./middleware/auth');

const User = require('../models/User');
const Contact = require('../models/Contact');
const { request } = require('express');


// @route    GET api/contacts
// @desc     Get all users contacts
// @access   Private

router.get('/', auth, async (req, res) => {
    try {
        // search through the Contact model to find the contacts belonging to the user, and sort by date, most recent first
        const contacts =  await Contact.find({ user: req.user.id }).sort({ date: -1 })
        res.json(contacts)
    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server Error')
    }
});

// @route    POST api/contacts
// @desc     Add new contact
// @access   Private

router.post('/', [ auth, [
    check('name', 'Name is required').not().isEmpty()
]], async (req, res) => {
    const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }

    const { name, email, phone, type } = req.body

        try {
            const newContact = new Contact({
                name,
                email,
                phone,
                type,
                user: req.user.id
            })

            const contact = await newContact.save()

            res.json(contact)
        } catch (err) {
            console.error(err.message)
            res.status(500).send('Server Error')
        }

});

// @route    PUT api/contacts/:id
// @desc     Update contact
// @access   Private

router.put('/:id', auth, async (req, res) => {
    const { name, email, phone, type } = req.body

    // Build a contact object based on input
    const contactFields = {}
    if (name) contactFields.name = name
    if (email) contactFields.email = email
    if (phone) contactFields.phone = phone
    if (type) contactFields.type = type

    try {
        let contact = await Contact.findById(req.params.id)

        if (!contact) return res.status(404).json({ msg: 'Contact not found' })

        // Make sure user owns contact, so that each user can only edit their own
        if (contact.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'Not Authorized' })
        }
        
        // doing the update
        // search the Contact model to find the contact matching the id that we search for, 
        
        contact = await Contact.findByIdAndUpdate(
            // it takes in the contact id
            req.params.id, 
            // set the contact fields that we described above
            { $set: contactFields }, 
            // set another options object, if it doesn't exist with these params, then we will create a new contact with the inputted params
            { new: true })

        // then we will send along the contact
        res.json(contact)

    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server Error')
    }
});

// @route    DELETE api/contacts/:id
// @desc     Delete contact
// @access   Private

router.delete('/:id', auth, async (req, res) => {
    try {
        let contact = await Contact.findById(req.params.id)

        if (!contact) return res.status(404).json({ msg: 'Contact not found' })

        // Make sure user owns contact, so that each user can only edit their own
        if (contact.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'Not Authorized' })
        }
        
        // Deleting...
        // search the Contact model to find the contact matching the id that we search for, then use the remove method to delete
        await Contact.findByIdAndRemove(req.params.id)

        // this will return the contact that we deleted
        res.json(contact)

    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server Error')
    }
});

module.exports = router;