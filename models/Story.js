const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const storySchema = new Schema({
  date:{ type: String, required: true},
  title:{ type: String, required: true},
  description:{ type: String, required: true},
  type: { type: String, required: true},
  coupleId: { type: Schema.Types.ObjectId, ref: 'Couple'},
}, 
{
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  },
});

const Story = mongoose.model('Story', storySchema);

module.exports = Story;