const mongoose = require('mongoose');
const Schema = mongoose.Schema; // Saves the Reference to the Schema Constructor
const ArticleSchema = new Schema({ //Constructor for scapped article object.
  title: {
      type: String,
      required: true,
      unique: true
  },
  link: {
      type: String,
      required: true,
      unique: true
  },
  summary: {
      type: String,
      required: true,
      unique: true
  },
  timestamp: {
      type: Date, 
      default: Date.now
  },
  saved: {
      type: Boolean,
      default: false
  },
  note: [
      {
          type: Schema.Types.ObjectId,
          ref: 'Note'
      }
  ]
});



module.exports = Article; 