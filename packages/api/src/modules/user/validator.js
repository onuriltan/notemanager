/* eslint-disable no-useless-escape */
const { check, validationResult } = require('express-validator')

exports.validateRegisterWithEmail = [
  check('email').notEmpty().withMessage('Email required.'),
  check('email').isEmail().withMessage('Email is not valid.'),
  check('password').notEmpty().withMessage('Password required.'),
  check('password2').notEmpty().withMessage('Repeat password required.'),
  check('password', 'Passwords does not match.')
    .exists()
    .custom((password, { req }) => password === req.body.password2),
  check('password2', 'Passwords does not match.')
    .exists()
    .custom((password2, { req }) => password2 === req.body.password),
  check('password')
    .isLength({ min: 10, max: 20 })
    .withMessage('Password length should between 10 and 20'),
  check('password2')
    .isLength({ min: 10, max: 20 })
    .withMessage('Password length should between 10 and 20'),
  check('password')
    .matches(/[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/)
    .withMessage('Password should have at least one special character.'),
  check('password')
    .matches(/[a-z]/)
    .withMessage('Password should have at least one lowercase character.'),
  check('password')
    .matches(/[A-Z]/)
    .withMessage('Password should have at least one uppercase character.'),
  check('password')
    .matches(/[0-9]/)
    .withMessage('Password should have at least one number.'),
  check('password2')
    .matches(/[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/)
    .withMessage('Password should have at least one special character.'),
  check('password2')
    .matches(/[a-z]/)
    .withMessage('Password should have at least one lowercase character.'),
  check('password2')
    .matches(/[A-Z]/)
    .withMessage('Password should have at least one uppercase character.'),
  check('password2')
    .matches(/[0-9]/)
    .withMessage('Password should have at least one number.'),
]
exports.validateLoginWithEmail = [
  check('email').notEmpty().withMessage('Email required.'),
  check('email').isEmail().withMessage('Email is not valid.'),
  check('password').notEmpty().withMessage('Password required.'),
  check('password')
    .isLength({ min: 10, max: 20 })
    .withMessage('Password length should between 10 and 20'),
]

exports.validateChangePassword = [
  check('email').notEmpty().withMessage('Email required.'),
  check('email').isEmail().withMessage('Email is not valid.'),
  check('oldPassword').notEmpty().withMessage('Password required.'),
  check('newPassword').notEmpty().withMessage('Repeat password required.'),
  check('oldPassword', 'Passwords does not match.')
    .exists()
    .custom((password, { req }) => password !== req.body.password2),
  check('newPassword', 'Passwords does not match.')
    .exists()
    .custom((password2, { req }) => password2 !== req.body.password),
  check('oldPassword')
    .isLength({ min: 10, max: 20 })
    .withMessage('Password length should between 10 and 20'),
  check('newPassword')
    .isLength({ min: 10, max: 20 })
    .withMessage('Password length should between 10 and 20'),
  check('oldPassword')
    .matches(/[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/)
    .withMessage('Password should have at least one special character.'),
  check('oldPassword')
    .matches(/[a-z]/)
    .withMessage('Password should have at least one lowercase character.'),
  check('oldPassword')
    .matches(/[A-Z]/)
    .withMessage('Password should have at least one uppercase character.'),
  check('oldPassword')
    .matches(/[0-9]/)
    .withMessage('Password should have at least one number.'),
  check('newPassword')
    .matches(/[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/)
    .withMessage('Password should have at least one special character.'),
  check('newPassword')
    .matches(/[a-z]/)
    .withMessage('Password should have at least one lowercase character.'),
  check('newPassword')
    .matches(/[A-Z]/)
    .withMessage('Password should have at least one uppercase character.'),
  check('newPassword')
    .matches(/[0-9]/)
    .withMessage('Password should have at least one number.'),
]

exports.returnValidationErrors = function (req, res, next) {
  const validationErrors = validationResult(req)
  const errors = {} // instead of sending errors as arrays, send object with keys, easier search
  validationErrors.array().forEach((error) => {
    errors[error.param] = error.msg
  })
  if (!validationErrors.isEmpty()) {
    return res.status(422).json({ fieldErrors: errors })
  }
  next()
}
