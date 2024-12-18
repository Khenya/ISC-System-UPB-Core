import db from './pg-connection';

const tableName = 'interns';

export const updateHoursInterns = async (
  internId: number,
  newHoursPending: number,
  newHoursCompleted: number
) => {
  try {
    const result = await db(tableName)
      .where({
        id: internId,
      })
      .update({
        pending_hours: newHoursPending,
        completed_hours: newHoursCompleted,
        updated_at: new Date(),
      })
      .returning('*');
    return result;
  } catch (error) {
    console.error('Error in InternsRepository.updateHoursInterns', error);
    throw new Error('Error Update Hours Interns');
  }
};
export const getInternsById = async (internId: number) => {
  try {
    const event = await db(tableName).where('id', internId).first();
    return event;
  } catch (error) {
    console.error('Error in InternsRepository.getInternsById', error);
    throw new Error('Error fetching Interns');
  }
};

export const getRecordIntern = async (internId: number) => {
  try {
    const event = await db(`${tableName} as i`)
      .join('events_interns as ei', 'i.id', 'ei.intern_id')
      .join('events as e', 'e.id', 'ei.event_id')
      .select(
        'e.*',
        'ei.type',
        'ei.created_at as registration_date',
        'ei.updated_at as last_update'
      )
      .where({ 'ei.intern_id': internId });
    return event;
  } catch (error) {
    console.error('Error in InternsRepository.getRecordIntern', error);
    throw new Error('Error fetching Interns');
  }
};

export const getInformationIntern = async (internId: number) => {
  try {
    const infoIntern = await db(`${tableName} as in`)
      .join('user_profile as up', 'in.user_profile_id', 'up.id')
      .select('up.*', 'in.*')
      .where('in.id', internId)
      .first();
    return infoIntern;
  } catch (error) {
    console.error('Error in InternsRepository.getRecordIntern', error);
    throw new Error('Error fetching Interns');
  }
};
