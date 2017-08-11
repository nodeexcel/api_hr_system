var form = require('../controller/formRoutes.js')
var express = require('express');
var router = express();

 router.route('/user/attendance/').post(form.attendance)

module.exports = router;