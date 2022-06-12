var fs = require("fs");
var path = require('path');
const { promisify } = require('util');





// 댓글 등록
exports.saveBulletinBoarComment = async (req, res) => {
    console.log(`
--------------------------------------------------
  User : ${req.decoded._id}
  router.post('/saveBulletinBoarComment',  bulletinBoardCommentController.saveBulletinBoarComment);
--------------------------------------------------`);

    const dbModels = global.DB_MODELS;

    const data = req.body;

    const commentData = {
        bulletinBoard_id: data.bulletinBoard_id,
        writer_id: data.writer_id,
        writer_name: data.writer_name,
        comment: data.comment
    }


    try {

        const comment = await dbModels.BulletinBoardComment(commentData)
        await comment.save();

        return res.send(
            comment
        );
    } catch (err) {
        console.log(err);
        return res.status(500).send('db Error');
    }
};


// 댓글 가져오기
exports.getBulletinBoarComment = async (req, res) => {
    console.log(`
--------------------------------------------------
  User : ${req.decoded._id}
  router.post('/getBulletinBoarComment',  bulletinBoardCommentController.getBulletinBoarComment);
--------------------------------------------------`);

    const dbModels = global.DB_MODELS;

    const data = req.query;


    try {

        const bulletinBoardCommentList = await dbModels.BulletinBoardComment.find({ bulletinBoard_id: data._id }, { bulletinBoard_id: 0 });

        if (!bulletinBoardCommentList) {
            return res.status(401).send({
                message: 'An error has occurred'
            });
        }

        return res.send(
            bulletinBoardCommentList
        );
    } catch (err) {
        console.log(err);
        return res.status(500).send('db Error');
    }
};



// 답글 등록
exports.saveBulletinBoarReplyComment = async (req, res) => {
    console.log(`
--------------------------------------------------
  User : ${req.decoded._id}
  router.post('/saveBulletinBoarReplyComment',  bulletinBoardCommentController.saveBulletinBoarReplyComment);
--------------------------------------------------`);

    const dbModels = global.DB_MODELS;

    const data = req.body;


    try {

        const updateReplyComment = await dbModels.BulletinBoardComment.findOneAndUpdate({
                _id: data.comment_id 
            },
            {
                $push: { 
                    reply: {
                        'comment_id': data.comment_id,
                        'reply_id': data.writer_id,
                        'reply_name': data.writer_name,
                        'reply_comment': data.replyComment,
                    }
                }
            },
            {
                upsert: true ,
            }
        );


        console.log(updateReplyComment)

        return res.send({
            message: 'Success saved reply comment'
        });
    } catch (err) {
        console.log(err);
        return res.status(500).send('db Error');
    }
};



