



/*-------------------------------------------------
	Get Member Info
-------------------------------------------------*/
exports.getMemberData = async (req, res) => {
	console.log(`
--------------------------------------------------  
  API  : getMemberData
  router.get('/getMemberData', adDashBoardController.getMemberData);
--------------------------------------------------`);
    
    const dbModels = global.DB_MODELS;

    try {
        const members = await dbModels.Member.find().lean();

        const memberLength = members.length;
     

    

   

        res.status(201).send({
            message: 'member Length',
            memberLength
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            error
        });
    }

};
