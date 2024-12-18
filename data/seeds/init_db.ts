import { Knex } from 'knex';
const userProfileTable = 'user_profile';
const permissionCategoriesTable = 'permission_categories';
const rolesTable = 'roles';
const rolesPermissionsTable = 'role_permissions'
const permissionsTable = 'permissions'
const professorTable = 'professors';
const eventTable = 'events';
const internsTable = 'interns';
const eventInternTable = 'events_interns';

exports.seed = async function (knex: Knex) {
  // Deletes ALL existing entries
  await knex(rolesTable).del();
  await knex(userProfileTable).del();
  await knex(permissionCategoriesTable).del();
  await knex(professorTable).del();
  await knex(permissionCategoriesTable).del();
  await knex(internsTable).del();
  await knex(eventTable).del();
  await knex(eventInternTable).del();
  await knex(rolesPermissionsTable).del();

  await knex(rolesTable).insert([
    { id: 1, name: 'admin', category: 'admin' },
    { id: 2, name: 'professor', category: 'professor' },
    { id: 3, name: 'student', category: 'student' },
  ]);

  await knex(userProfileTable).insert([
    {
      id: 1,
      username: 'admin',
      name: 'Jhonny',
      lastname: 'Cabezas',
      mothername: 'Gomez',
      password: '$2a$10$qv1IXHI4lhio8vJGS6O1UuIzTqTpdHY9dz5gyA9D5PFb1pGxJv3Kq',
      email: 'admin@gmail.com',
      phone: '77665544',
      role_id: 1,
      code: '12345',
    },
  ]);
  await knex(permissionCategoriesTable).insert([
    { id: 1, name: 'Reportes' },
    { id: 2, name: 'Proceso de graduación' },
    { id: 3, name: 'Docentes' },
    { id: 4, name: 'Estudiantes' },
    { id: 5, name: 'Usuarios' },
  ])
  await knex(permissionsTable).insert([
    { id: 1, description: 'Dashboard report', display_name: 'Dashboard', path: '/dashboard', sort: 1, type: 'page', disabled: 'false', name: 'Ver el dashboard', category_id: 1 },
    { id: 2, description: 'Graduation process report', display_name: 'Procesos', path: '/process', sort: 2, type: 'page', disabled: 'false', name: 'Ver reporte de los procesos de graduación', category_id: 2 },
    { id: 3, description: 'Create graduation process', display_name: 'Procesos', path: '/process', sort: 2, type: 'page', disabled: 'false', name: 'Crear proceso de graduación', category_id: 2 },
    { id: 4, description: 'Graduation process students', display_name: 'Procesos', path: '/process', sort: 2, type: 'page', disabled: 'false', name: 'Ver proceso de graduación por estudiantes', category_id: 2 },
    { id: 5, description: 'Assign graduation process', display_name: 'Procesos', path: '/process', sort: 2, type: 'page', disabled: 'false', name: 'Asignar proceso de graduación', category_id: 2 },
    { id: 6, description: 'Professors list', display_name: 'Docentes', path: '/professors', sort: 3, type: 'page', disabled: 'false', name: 'Ver lista de docentes', category_id: 3 },
    { id: 7, description: 'Add professor', display_name: 'Docentes', path: '/professors', sort: 3, type: 'page', disabled: 'false', name: 'Agregar docente', category_id: 3 },
    { id: 8, description: 'Professor report', display_name: 'Docentes', path: '/professors', sort: 3, type: 'page', disabled: 'false', name: 'Ver reporte de docente', category_id: 3 },
    { id: 9, description: 'Schedule an appointment with a professor', display_name: 'Docentes', path: '/professors', sort: 3, type: 'page', disabled: 'false', name: 'Realizar una cita con docente', category_id: 3 },
    { id: 10, description: 'Delete a professor', display_name: 'Docentes', path: '/professors', sort: 3, type: 'page', disabled: 'false', name: 'Eliminar docente', category_id: 3 },
    { id: 11, description: 'Edit a professor', display_name: 'Docentes', path: '/professors', sort: 3, type: 'page', disabled: 'false', name: 'Editar información de docente', category_id: 3 },
    { id: 12, description: 'Students list', display_name: 'Estudiantes', path: '/students', sort: 4, type: 'page', disabled: 'false', name: 'Ver lista de estudiantes', category_id: 4 },
    { id: 13, description: 'Add student', display_name: 'Estudiantes', path: '/students', sort: 4, type: 'page', disabled: 'false', name: 'Agregar estudiante', category_id: 4 },
    { id: 14, description: 'Delete a student', display_name: 'Estudiantes', path: '/students', sort: 4, type: 'page', disabled: 'false', name: 'Eliminar estudiante', category_id: 4 },
    { id: 15, description: 'Edit a student', display_name: 'Estudiantes', path: '/students', sort: 4, type: 'page', disabled: 'false', name: 'Editar información de estudiante', category_id: 4 },
    { id: 16, description: 'Student report', display_name: 'Estudiantes', path: '/students', sort: 4, type: 'page', disabled: 'false', name: 'Ver reporte de estudiante', category_id: 4 },
    { id: 17, description: 'Schedule an appointment with a student', display_name: 'Estudiantes', path: '/students', sort: 4, type: 'page', disabled: 'false', name: 'Realizar cita con estudiante', category_id: 4 },
    { id: 18, description: 'Users list', display_name: 'Usuarios', path: '/users', sort: 5, type: 'page', disabled: 'false', name: 'Ver lista de usuarios', category_id: 5 },
    { id: 19, description: 'User report', display_name: 'Usuarios', path: '/users', sort: 5, type: 'page', disabled: 'false', name: 'Ver reporte de usuarios', category_id: 5 },
    { id: 20, description: 'Delete a user', display_name: 'Usuarios', path: '/users', sort: 5, type: 'page', disabled: 'false', name: 'Eliminar usuario', category_id: 5 },
    { id: 21, description: 'Edit a user', display_name: 'Usuarios', path: '/users', sort: 5, type: 'page', disabled: 'false', name: 'Editar información de usuario', category_id: 5 },
    { id: 22, description: 'Add a user', display_name: 'Usuarios', path: '/users', sort: 5, type: 'page', disabled: 'false', name: 'Agregar usuario', category_id: 5 },

  ])
  await knex(rolesPermissionsTable).insert([
    { role_id: 1, permission_id: 1 },
    { role_id: 1, permission_id: 2},
    { role_id: 1, permission_id: 6},
    { role_id: 1, permission_id: 12},
    { role_id: 1, permission_id: 18},
  ]);

  await knex('user_profile').insert({
    id: 2,
    username: 'professor',
    name: 'Alexis',
    lastname: 'Marechal',
    mothername: 'Marin',
    password: '$2a$10$qv1IXHI4lhio8vJGS6O1UuIzTqTpdHY9dz5gyA9D5PFb1pGxJv3Kq',
    email: 'alexismarechal@upb.edu',
    phone: '12345678',
    role_id: 2,
    code: '12345',
  });

  await knex('professors').insert({
    id: 2,
    degree: 'PhD.',
    department: 'Computer Science',
    specialty: 'Artificial Intelligence',
  });
  await knex(internsTable).insert([
    {
      id: 1,
      user_profile_id: 1,
      total_hours: 10,
      pending_hours: 5,
      completed_hours: 5,
    },
    {
      id: 2,
      user_profile_id: 2,
      total_hours: 15,
      pending_hours: 10,
      completed_hours: 5,
    },
    {
      id: 3,
      user_profile_id: 2,
      total_hours: 20,
      pending_hours: 10,
      completed_hours: 10,
    },
  ]);

  await knex(eventTable).insert([
    {
      id: 1,
      responsible_intern_id: 1,
      title: 'Event 1',
      description: 'Description for event 1',
      location: 'Location 1',
      duration_hours: 2,
      max_interns: 10,
      min_interns: 5,
      assigned_hours: 4,
      start_date: knex.fn.now(),
      end_date: knex.fn.now(),
      registration_deadline: knex.fn.now(),
      start_cancellation_date: knex.fn.now(),
      end_cancellation_date: knex.fn.now(),
    },
    {
      id: 2,
      responsible_intern_id: 2,
      title: 'Event 2',
      description: 'Description for event 2',
      location: 'Location 2',
      duration_hours: 3,
      max_interns: 15,
      min_interns: 7,
      assigned_hours: 4,
      start_date: knex.fn.now(),
      end_date: knex.fn.now(),
      registration_deadline: knex.fn.now(),
      start_cancellation_date: knex.fn.now(),
      end_cancellation_date: knex.fn.now(),
    },
    {
      id: 3,
      responsible_intern_id: 3,
      title: 'Event 3',
      description: 'Description for event 3',
      location: 'Location 3',
      duration_hours: 4,
      max_interns: 20,
      min_interns: 10,
      assigned_hours: 4,
      start_date: knex.fn.now(),
      end_date: knex.fn.now(),
      registration_deadline: knex.fn.now(),
      start_cancellation_date: knex.fn.now(),
      end_cancellation_date: knex.fn.now(),
    },
  ]);

  await knex(eventInternTable).insert([
    {
      intern_id: 1,
      event_id: 1,
      type: 'accepted',
    },
    {
      intern_id: 2,
      event_id: 2,
      type: 'pending',
    },
    {
      intern_id: 3,
      event_id: 3,
      type: 'reserve',
    },
  ]);
};