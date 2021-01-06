  
  import {
    addNewPermission,
    getPermissions,
    getPermission,
    updatePermission,
    deletePermission
  } from '../controllers/permissionController';
  
  
  const routes = app => {
   
    app.use('/api/permission', authenticationCheck);
    app
      .route('/api/permission')
      .get(getPermissions)
      .post(addNewPermission);
    app
      .route('/api/permission/:_id')
      .put(updatePermission)
      .get(getPermission)
      .delete(deletePermission);
    app.route('/api/permission/filters').post(getPermissions);
    app.use('/api/permission', returnJson);  
  };
  
  export default routes;
  