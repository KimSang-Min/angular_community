const mongoose = require('mongoose');

const bulletinBoardCommentScehma = mongoose.Schema(
	{
		bulletinBoard_id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'BulletinBoard',
		},
        writer_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Member',
        },
        writer_name: {
            type: String,
        },
		comment: {
            type: String,
        },
        reply: [
            {
                _id: false,
                reply_id: {
                    type: Object,
                },
                reply_name: {
                    type: String,
                },
                reply_comment: {
                    type: String
                }
            }
        ] 
	},
	{
		timestamps: true
	}
);

const BulletinBoardComment = mongoose.model('BulletinBoardComment', bulletinBoardCommentScehma);

module.exports = BulletinBoardComment;


