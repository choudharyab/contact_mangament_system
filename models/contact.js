var Model = require('./base');
var Contact = Model.extend({
    
    tableName: 'contact',
    hasTimestamps: true,

   

});

module.exports = Contact;