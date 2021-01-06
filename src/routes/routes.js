  
  import {
    getContacts,
    addContact,
    getContact,
    updateContact,
    deleteContact
  } from '../controllers/contact';
  import { returnJson } from '../utils';
  
  const routes = app => {
   
    app
      .route('/api/contact')
      .get(getContacts)
      .post(addContact);
    app
      .route('/api/contact/:_id')
      .put(updateContact)
      .get(getContact)
      .delete(deleteContact);
    app.use('/api/contact', returnJson);  
  };
  
  export default routes;
  