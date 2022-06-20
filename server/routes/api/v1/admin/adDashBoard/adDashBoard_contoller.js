



/*-------------------------------------------------
	Get Member Info
-------------------------------------------------*/
exports.getMemberData = async (req, res) => {
	console.log(`
--------------------------------------------------  
  API  : getMemberData
  router.get('/getMemberData', adDashBoardController.getMemberData);
--------------------------------------------------`);
	console.log(req.query);

	// const criteria = {
	// 	email: req.body.email
	// };
	// const projection = '_id';
	// const adminData = {
	// 	email: req.body.email,
	// 	password: req.body.password,
	// 	name: req.body.name,
	// }

	// try {
	// 	const adminUser = await admin.findOne(criteria, projection).lean();

	// 	if (adminUser) {
	// 		return res.status(409).send({
	// 			message: 'duplicated'
	// 		})
	// 	}

	// 	const newAdmin = admin(adminData);

	// 	await newAdmin.save();

	// 	res.status(201).send({
	// 		message: 'created'
	// 	});
	// } catch (error) {
    //     console.log(error);
	// 	return res.status(500).send({
    //         error
	// 	});
	// }

};
