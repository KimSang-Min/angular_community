const router = require('express').Router();
const adDashBoardController = require('./adDashBoard_contoller');



/*-----------------------------------
	API
-----------------------------------*/
const adDashBoardCtrl = require('./adDashBoard_contoller');



/* Get member Info */
router.get('/getMemberData', adDashBoardCtrl.getMemberData);


module.exports = router;
