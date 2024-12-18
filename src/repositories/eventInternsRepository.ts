import db from './pg-connection';

const tableName = 'events_interns';

export const getEventInterns = async (eventId: number) => {
  try {
    const query = db(`${tableName} as ei`)
      .join('events as e', 'ei.event_id', 'e.id')
      .join('interns as i', 'ei.intern_id', 'i.id')
      .join('user_profile as up', 'i.user_profile_id', 'up.id')
      .select(
        'e.id as id_events',
        'i.id as id_interns',
        'e.*',
        'i.*',
        'up.name',
        'up.lastname',
        'up.mothername',
        'up.code',
        'ei.type',
        'ei.created_at as registration_date',
        'ei.updated_at as last_update'
      )
      .where('ei.event_id', eventId);
    console.log('sql query', query.toSQL().sql);
    const listEventInterns = await query;
    return listEventInterns;
  } catch (error) {
    console.error('Error in EventInternsRepository.getEventInterns', error);
    throw new Error('Error fetching ListEventInterns');
  }
};

export const getEventInformation = async () => {
  try {
    const listEventInterns = await db(`${tableName} as ei`)
      .rightJoin('events as e', 'ei.event_id', 'e.id')
      .leftJoin('interns as i', 'ei.intern_id', 'i.id')
      .select(
        'e.*',
        db.raw(`COUNT(CASE WHEN ei.type = 'accepted' THEN 1 END) as accepted_interns`),
        db.raw(`COUNT(CASE WHEN ei.type = 'pending' THEN 1 END) as pending_interns`)
      )
      .groupBy('e.id');

    return listEventInterns;
  } catch (error) {
    console.error('Error in EventInternsRepository.getEventInformation', error);
    throw new Error('Error fetching ListEventInterns');
  }
};

export const getEventInternsByTwoId = async (eventId: number, internId: number) => {
  try {
    const listEventInterns = await db(tableName)
      .where({
        event_id: eventId,
        intern_id: internId,
      })
      .first();
    return listEventInterns;
  } catch (error) {
    console.error('Error in EventInternsRepository.getEventInternsByTwoId', error);
    throw new Error('Error fetching ListEventInterns');
  }
};

export const registerInternProcess = async (eventId: number, internId: number) => {
  try {
    const registerInterns = await db(tableName)
      .insert({
        event_id: eventId,
        intern_id: internId,
        type: 'pending',
      })
      .returning('*');
    return registerInterns;
  } catch (error) {
    console.error('Error in EventInternsRepository.registerInternProcess', error);
    throw new Error('Error fetching RegisterInterns');
  }
};

export const updateInternType = async (eventId: number, internId: number, status: string) => {
  try {
    const result = await db(tableName)
      .where({
        intern_id: internId,
        event_id: eventId,
      })
      .update({
        type: status,
        updated_at: new Date(),
      })
      .returning('*');
    return result;
  } catch (error) {
    console.error('Error in EventInternsRepository.updateInternStatus', error);
    throw new Error('Error updating Intern status');
  }
};

export const deleteInternRegistration = async (eventId: number, internId: number) => {
  try {
    const result = await db(tableName)
      .where({
        event_id: eventId,
        intern_id: internId,
      })
      .del()
      .returning('*');
    return result;
  } catch (error) {
    console.error('Error in EventInternsRepository.deleteInternRegistration', error);
    throw new Error('Error deleting Intern registration');
  }
};

export const updateStatusForEventInterns = async (
  eventId: number,
  currentStatuses: string[],
  newStatus: string
) => {
  try {
    const result = await db(tableName)
      .where('event_id', eventId)
      .whereIn('type', currentStatuses)
      .update({
        type: newStatus,
        updated_at: new Date(),
      })
      .returning('*');

    return result;
  } catch (error) {
    console.error('Error in updateStatusForEventInterns', error);
    throw new Error('Error updating status for Event Interns');
  }
};

export const updateInternAttendance = async (
  id_evento: number,
  id_becario: number,
  new_status: boolean
) => {
  try {
    const result = await db(tableName)
      .where({
        event_id: id_evento,
        intern_id: id_becario,
      })
      .update({
        attendance: new_status,
      })
      .returning('*');
    return result;
  } catch (error) {
    console.error('Error in updateInternAttendance', error);
    throw new Error('Error updating attendance status for Interns');
  }
};
