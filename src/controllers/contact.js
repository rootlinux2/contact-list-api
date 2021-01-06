/* eslint-disable no-underscore-dangle */
import mongoose from 'mongoose';
import contactSchema from '../models/contact';


const Contact = mongoose.model('Contact', contactSchema);

export async function getContacts(req, res, next) {
  try {
    let { page, limit } = req.body;
    page = page || 1;
    limit = limit || 100;
    
    const options = { page, limit };
    res.result = await Contact.paginate({}, options);
    next();
  } catch (error) {
    next(error);
  }
}

export async function addContact(req, res, next) {
  try {
    const contact = new Contact(req.body);
    res.result = await contact.save();
    next();
  } catch (error) {
    next(error);
  }
}

export async function getContact(req, res, next) {
  try {
    res.result = await Contact.findOne({ _id: req.params._id });
    next();
  } catch (error) {
    next(error);
  }
}

export async function updateContact(req, res, next) {
  try {
    res.result = await Contact.findOneAndUpdate({ _id: req.params._id }, req.body, {
      new: true
    });
    next();
  } catch (error) {
    next(error);
  }
}
export async function deleteContact(req, res, next) {
  try {    
    res.result = await Contact.findOneAndUpdate({ _id: req.params._id }, req.body, {
      new: true
    });
    next();
  } catch (error) {
    next(error);
  }
}
