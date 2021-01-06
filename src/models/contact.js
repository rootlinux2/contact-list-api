import mongoose from 'mongoose';
import mongoosePaginator from 'mongoose-paginate-v2';

const { Schema } = mongoose;
const ContactSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  details: {
    type: String,
    required: true
  },
  url: {
    type: String,
    default: '/'
  },
  method: {
    type: String,
    default: 'GET'
  },
  group: {
    type: String,
    default: 'listar'
  },
  createdAt: {
    type: Date,
    default: new Date()
  },
  updatedAt: {
    type: Date,
    default: new Date()
  },
  deleted: {
    type: Date,
    default: null
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'Users'
  },
  updatedBy: {
    type: Schema.Types.ObjectId,
    ref: 'Users'
  }
});

PermissionSchema.plugin(mongoosePaginator);
export default PermissionSchema;
