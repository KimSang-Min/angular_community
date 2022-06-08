const router = require('express').Router();
const bulletinBoardController = require('./bulletinBoard_controller');
const multer = require('multer');

// 프로필 이미지 업데이트
const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, 'uploads/bulletinBoardFile/temp');
    },
    filename(req, file, cb) {
        // fileName = encodeURI(file.originalname);
        cb(null, `${Date.now()}_${file.originalname}`);

        // cb(null, `${file.originalname}`);
    }
});
const upload = multer({ storage });


router.get('/getbulletinBoardList',  bulletinBoardController.getbulletinBoardList); // 게시글 가져오기
router.post('/upload', upload.any(), bulletinBoardController.upload); // 게시글 업로드 
router.get('/getbulletinBoardDetail',  bulletinBoardController.getbulletinBoardDetail); // 게시글 상세보기
router.post('/recommendation',  bulletinBoardController.recommendation); // 게시글 추천
router.post('/opposite',  bulletinBoardController.opposite); // 게시글 반대





module.exports = router;
