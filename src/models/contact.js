import mongoose from 'mongoose';
import mongoosePaginator from 'mongoose-paginate-v2';

const { Schema } = mongoose;
const ContactSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    default: '+0 000 000 000 00',
    required: true
  },
  email: {
    type: String,
    required: true
  }
});

ContactSchema.plugin(mongoosePaginator);
export default ContactSchema;
