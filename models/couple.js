const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const coupleSchema = new Schema({
  name:{ type: String, required: true},
  gallery: [{type: Schema.Types.ObjectId, ref: 'Gallery'}],
  tasks: [{type: Schema.Types.ObjectId, ref: 'Task'}],
  stories: [{type: Schema.Types.ObjectId, ref: 'Story'}],
  calendar: [{type: Schema.Types.ObjectId, ref: 'Calendar'}],
  members:[{type: Schema.Types.ObjectId, ref: 'User'}],
}, 
{
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  },
});

const Couple = mongoose.model('Couple', coupleSchema);

module.exports = Couple;