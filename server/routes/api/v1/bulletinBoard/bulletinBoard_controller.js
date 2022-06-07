var fs = require("fs");
var path = require('path');
const { promisify } = require('util');
const unlinkAsync = promisify(fs.unlink);
const sharp = require('sharp');
const s3 = global.AWS_S3.s3;
const bucket = global.AWS_S3.bucket;




// 게시글 가져오기
exports.getbulletinBoardList = async (req, res) => {
    console.log(`
--------------------------------------------------
  User : ${req.decoded._id}
  router.post('/getbulletinBoardList', bulletinBoardController.getbulletinBoardList);
--------------------------------------------------`);

    const dbModels = global.DB_MODELS;

	try {

		const bulletinBoardList = await dbModels.BulletinBoard.find().sort({"_id": -1});

		if (!bulletinBoardList) {
			return res.status(401).send({
				message: 'An error has occurred'
			});
		}

		return res.send(
            bulletinBoardList
        );
	} catch (err) {
		console.log(err);
		return res.status(500).send('db Error');
	}
};





// 게시글 업로드
exports.upload = async (req, res) => {
    console.log(`
--------------------------------------------------
  User : ${req.decoded._id}
  router.post('/upload', upload.any(), bulletinBoardController.upload);
--------------------------------------------------`);

    const dbModels = global.DB_MODELS;

    const writerInfo = await dbModels.Member.findOne(
        {
            _id: req.decoded._id
        });

    const bulletinBoardList = await dbModels.BulletinBoard.find()



    try {
        if (req.body.upload_file != '') {
            try {
                
            } catch (error) {
                
            }
            // 파일시스템에서 파일 열기
            fs.open(req.files[0].path, "r", function (err, fd) {
                // binary 데이터를 저장하기 위해 파일 사이즈 만큼의 크기를 갖는 Buffer 객체 생성
                const buffer = Buffer.alloc(req.files[0].size);
                fs.read(fd, buffer, 0, buffer.length, null, function (err, bytes, buffer) {
                    const obj = {
                        "number": bulletinBoardList.length + 1,
                        "title": req.body.title,
                        "content": req.body.content,
                        "writer._id": writerInfo._id,
                        "writer.email": writerInfo.email,
                        "writer.name": writerInfo.name,
                        "writer.isManager": writerInfo.isManager,
                        "originalFileName": req.files[0].originalname,
                        "fileName": req.files[0].filename,
                        "filePath": req.files[0].path,
                        "fileSize": req.files[0].size,
                        "file": buffer,
                        "numberOfViews": 0,
                        "recommendation": 0,
                        "opposite": 0,
                    };

                    const upload = dbModels.BulletinBoard(obj);
                    upload.save(async function (err) { // 저장
                        if (err) {
                            res.send(err);
                        } else {
                            res.send({
                                message: 'success upload',
                                fileName: req.files[0].filename
                            })
                        }
                        
                    });
                })
            })
            // fs.unlink(req.files[0].path, function () { }) // 파일 삭제)
            
        } else {
            const obj = {
                "number": bulletinBoardList.length + 1,
                "title": req.body.title,
                "content": req.body.content,
                "writer._id": writerInfo._id,
                "writer.email": writerInfo.email,
                "writer.name": writerInfo.name,
                "writer.isManager": writerInfo.isManager,
                "numberOfViews": 0,
                "recommendation": 0,
                "opposite": 0,
            };
            const upload = dbModels.BulletinBoard(obj);
            upload.save(function (err) { // 저장
                if (err) {
                    res.send(err);
                } else {
                    res.send({
                        message: 'success upload'
                    })
                }
            })
        }

    } catch (err) {
        console.log(err);
        return res.status(500).send('db Error');
    }
};


// 게시글 상세보기
exports.getbulletinBoardDetail = async (req, res) => {
    console.log(`
--------------------------------------------------
  User : ${req.decoded._id}
  router.get('/getbulletinBoardDetail', bulletinBoardController.getbulletinBoardDetail);
--------------------------------------------------`);

    const dbModels = global.DB_MODELS;

	try {
        

    
		const bulletinBoardInfo = await dbModels.BulletinBoard.findOneAndUpdate(
            {
                "_id": req.query._id
            }, 
            { 
                $inc: {numberOfViews: 1}  // 조회수 증가
            }
        );


        
        fs.writeFileSync(`./uploads/bulletinBoardFile/${bulletinBoardInfo.fileName}`, bulletinBoardInfo.file)

		if (!bulletinBoardInfo) {
			return res.status(401).send({
				message: 'An error has occurred'
			})
		}
        
        
        return res.send(
            bulletinBoardInfo
        )

        // db에 모든 작업이 올라간 후에 uploads에 있는 파일이 지워진다.
        // fs.unlink(`uploads/bulletinBoardFile/${bulletinBoardInfo.fileName}`, function () { }) // 파일 삭제)
        

        

		// return res.send(
        //     bulletinBoardInfo
        // )
	} catch (err) {
		console.log(err);
		return res.status(500).send('db Error');
	}
};
