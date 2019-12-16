const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const gallerySchema = new Schema({
  title:{ type: String, required: true},
  photoUrl: { type: String, required: true},
  coupleId: { type: Schema.Types.ObjectId, ref: 'Couple'},
}, 
{
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  },
});

const Gallery = mongoose.model('Gallery', gallerySchema);

module.exports = Gallery;