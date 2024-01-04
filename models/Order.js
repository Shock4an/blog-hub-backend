import mongoose from 'mongoose';

const OrderSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  price: {
    type: Number,
    required: true
  },
  items: [{
    item: {
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Item',
      required: true,
    },
    count: {
      type: Number,
      required: true,
    }
  }]
}, {
  timestamps: true,
})

export default mongoose.model("Order", OrderSchema);