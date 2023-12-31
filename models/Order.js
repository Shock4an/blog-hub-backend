import mongoose from 'mongoose';

const OrderSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  items: [{
    type:mongoose.Schema.Types.ObjectId, 
    ref: 'Item',
    required: true,
  }]
}, {
  timestamps: true,
})

export default mongoose.model("Order", OrderSchema);