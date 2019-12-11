const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: String,
  password: String,
  email: {
    type: String,
    required: true,
    unique: true
  },
  photoUrl: String,
  coupleId: {type: Schema.Types.ObjectId, ref: 'Couple'},
}, 
{
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;