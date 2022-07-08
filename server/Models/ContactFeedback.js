const mongoose = require('mongoose');

const ContactModel = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    profession: {
        type: String,
        required: true
    },
    feedback: {
        type: String,
        required: true
    }
});

const ContactFeedback = new mongoose.model('contact-feedback',ContactModel);

module.exports = ContactFeedback;