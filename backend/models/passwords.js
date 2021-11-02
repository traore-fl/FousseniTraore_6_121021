var passwordValidator = require('password-validator');

var passwordSchema = new passwordValidator();

passwordSchema
.is().min(8)
.is().max(30)
.has().uppercase(1)
.has().lowercase(1)
.has().digits(1)
.has().symbols(1)
.has().not().spaces()

module.exports = passwordSchema;