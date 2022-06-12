const router = require('express').Router();
const bulletinBoardCommentController = require('./bulletinBoardComment_controller');



router.get('/getBulletinBoarComment',  bulletinBoardCommentController.getBulletinBoarComment); // 게시글 댓글 가져오기
router.post('/saveBulletinBoarComment',  bulletinBoardCommentController.saveBulletinBoarComment); // 게시글 댓글 등록
router.post('/saveBulletinBoarReplyComment',  bulletinBoardCommentController.saveBulletinBoarReplyComment); // 게시글 답글 등록



module.exports = router;
