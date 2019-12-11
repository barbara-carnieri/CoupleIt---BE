const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskSchema = new Schema({
  name:{ type: String, required: true},
  description: { type: String, required: true},
  coupleId: { type: Schema.Types.ObjectId, ref: 'Couple'},
}, 
{
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  },
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;