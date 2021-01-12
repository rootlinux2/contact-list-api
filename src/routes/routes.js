  
  import {
    getContacts,
    addContact,
    getContact,
    updateContact,
    deleteContact,
    generateMockData
  } from '../controllers/contact';
  import { returnJson } from '../utils';
  
  const routes = app => {
   
    app
      .route('/api/dataGenerator')
      .get(generateMockData);
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
    app.use('/api/dataGenerator', returnJson);  
  };
  
  export default routes;
  