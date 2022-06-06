const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');

const bulletinBoardScehma = mongoose.Schema(
	{
        number: {
            type: Number
        },
		title: {
			type: String
		},
        content: {
            type: String
        },
        writer: {
            _id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Member',
            },
            email: {
                type: String
            },
            name: {
                type: String
            },
            isManager: {
                type: Boolean, 
            }
        },
        originalFileName: {
            type: String
        },
        fileName: {
            type: String
        },
        filePath: {
            type: String
        },
        fileSize: {
            type: String
        },
        file: {
            type: Buffer
        },       
        numberOfViews: {
            type: Number
        },
        recommendation: {
            type: Number
        },
        opposite: {
            type: Number
        }
        
	},
	{
		timestamps: true
	}
);

const BulletinBoard = mongoose.model('BulletinBoard', bulletinBoardScehma);

module.exports = BulletinBoard;


