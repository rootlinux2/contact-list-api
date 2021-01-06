/* eslint-disable no-underscore-dangle */
import mongoose from 'mongoose';
import contactSchema from '../models/contact';


const Permission = mongoose.model('Contact', contactSchema);

export async function getContacts(req, res, next) {
  try {
    let { page, limit } = req.body;
    page = page || 1;
    limit = limit || 100;
    const filters = await paramsValidator(req.body);
    const options = { page, limit };
    res.result = await Permission.paginate(filters, options);
    next();
  } catch (error) {
    next(error);
  }
}

export async function addNewPermission(req, res, next) {
  try {
    const permission = new Permission(req.body);
    res.result = await permission.save();

    addNewTrace(req.user._id, 'Registrando permisos', 'permissionController');
    next();
  } catch (error) {
    next(error);
  }
}

export async function getPermission(req, res, next) {
  try {
    res.result = await Permission.findOne({ _id: req.params._id });
    addNewTrace(req.user._id, 'Listando permiso', 'permissionController');
    next();
  } catch (error) {
    next(error);
  }
}

export async function updatePermission(req, res, next) {
  try {
    req.body.updatedAt = new Date();
    req.body.updatedBy = req.user._id;
    res.result = await Permission.findOneAndUpdate({ _id: req.params._id }, req.body, {
      new: true
    });
    addNewTrace(req.user._id, 'Modificando permisos', 'permissionController');
    next();
  } catch (error) {
    next(error);
  }
}
export async function deletePermission(req, res, next) {
  try {
    req.body.updatedAt = new Date();
    req.body.updatedBy = req.user._id;
    req.body.deleted = new Date();
    res.result = await Permission.findOneAndUpdate({ _id: req.params._id }, req.body, {
      new: true
    });
    addNewTrace(req.user._id, `Eliminando permiso ${res.result.name}`, 'permissionController');
    next();
  } catch (error) {
    next(error);
  }
}

// export async function getAllPermissionsCurrentUser(req, res) {
//   try {
//     const roles = await db.Role.find({ name: { $in: req.user.roles } }).catch(error => next(error));
//     let permissions = [];
//     roles.map(rol => {
//       permissions = permissions.concat(rol.permissions);
//     });
//     res.result = permissions;
//     next();
//   } catch (error) {
//     next(error);
//   }
// }

const routes = {
  '/': 'Inicio',
  '/admin': 'Administración',
  '/admin/user/list': 'Usuarios',
  '/admin/user/create': 'Crear usuario',
  '/admin/user/edit': 'Editar usuario',
  '/admin/user/profile': 'Perfil de usuario',
  '/admin/role': 'Roles',
  '/admin/role/create': 'Crear rol',
  '/admin/role/edit': 'Editar rol',
  '/admin/permission': 'Permisos',
  '/admin/permission/create': 'Crear permiso',
  '/admin/permission/edit': 'Editar permiso',
  '/admin/nomenclator': 'Nomencladores',
  '/admin/nomenclator/:ptype': 'Nomencladores :ptype',
  '/admin/nomenclator/:ptype/create': 'Adicionar Nomenclador',
  '/admin/traces': 'Trazas',
  '/admin/entities/create': 'Crear entidad',
  '/admin/entities/edit': 'Editar entidad',
  '/admin/entities': 'Entidades',
  '/admin/questions/create': 'Crear Pregunta',
  '/admin/questions/edit': 'Editar Pregunta',
  '/admin/questions': 'Preguntas',
  '/admin/questionnaries/create': 'Crear Cuestionario',
  '/admin/questionnaries/edit': 'Editar Cuestionario',
  '/admin/questionnaries': 'Cuestionarios',
  '/admin/programs/create': 'Crear Programa',
  '/admin/programs/edit': 'Editar Programa',
  '/admin/programs': 'Programas',
  '/admin/participants/create': 'Crear Participante',
  '/admin/participants/edit': 'Editar Participante',
  '/admin/participants': 'Participantes',
  '/admin/comprobations/create': 'Crear Comprobación',
  '/admin/comprobations/edit': 'Editar Comprobación',
  '/admin/comprobations': 'Comprobaciones',
  '/admin/comprobations/dash': 'Dashboard'
};
export async function AutomaticPermissionGenerator() {
  // Permission.deleteMany({});
  const per = [];
  let meth = '';
  Object.keys(routes).forEach(p => {
    if (p.includes('edit')) {
      meth = 'PUT';
    } else if (p.includes('create')) {
      meth = 'POST';
    } else {
      meth = 'GET';
    }

    per.push(
      new Permission({
        name: routes[p],
        details: routes[p],
        url: p,
        method: meth
      })
    );
  });
  await Permission.insertMany(per);
}
