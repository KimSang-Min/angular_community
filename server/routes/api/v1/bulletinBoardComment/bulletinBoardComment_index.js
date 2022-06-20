const router = require('express').Router();
const bulletinBoardCommentController = require('./bulletinBoardComment_controller');



router.get('/getBulletinBoardComment', bulletinBoardCommentController.getBulletinBoardComment); // 게시글 댓글 가져오기
router.post('/saveBulletinBoardComment', bulletinBoardCommentController.saveBulletinBoardComment); // 게시글 댓글 등록
router.post('/saveBulletinBoardReplyComment', bulletinBoardCommentController.saveBulletinBoardReplyComment); // 게시글 답글 등록
router.delete('/deleteBulletinBoardComment', bulletinBoardCommentController.deleteBulletinBoardComment); // 게시글 댓글 삭제
router.delete('/deleteBulletinBoardReplyComment', bulletinBoardCommentController.deleteBulletinBoardReplyComment); // 게시글 답글 삭제




module.exports = router;
