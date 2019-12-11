const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const calendarSchema = new Schema({
  date:{ type: String, required: true},
  event:{ type: String, required: true},
  type: { type: String, required: true},
  coupleId: { type: Schema.Types.ObjectId, ref: 'Couple'},
}, 
{
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  },
});

const Calendar = mongoose.model('Calendar', calendarSchema);

module.exports = Calendar;