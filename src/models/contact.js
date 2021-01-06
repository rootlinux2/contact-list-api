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
    default: '/'
  },
  email: {
    type: String,
    default: 'GET'
  }
});

ContactSchema.plugin(mongoosePaginator);
export default ContactSchema;
