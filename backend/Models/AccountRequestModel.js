const mongoose = require('mongoose')

const Schema = mongoose.Schema

const AccountRequestSchema = new Schema(
	{
		date: {
			type: Date,
			required: true
		},
		amount: {
			type: Number,
			required: true
		},
		narration: {
			type: String,
			required: true
		},
		requestType: {
			type: String
		},
		requestForm: {
			type: String
		},
		id: {
			type: String
		},

		status: {
			type: Boolean,
			default: true
		}
	},
	{ timestamps: true }
)

const AccountRequestModel = mongoose.model(
	'AccountRequest',
	AccountRequestSchema
)
module.exports = AccountRequestModel
