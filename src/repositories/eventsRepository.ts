import db from './pg-connection';
import Event from '../models/eventInterface';

const tableName = 'events';

export const getEvents = async () => {
  try {
    const events = await db(tableName).select('*');
    return events;
  } catch (error) {
    console.error('Error in eventsRepository.getEvents:', error);
    throw new Error('Error fetching Events');
  }
};

export const getEvent = async (id: string) => {
  try {
    const event = await db(tableName).where('id', id).first();
    return event;
  } catch (error) {
    console.error('Error in eventsRepository.getEvent:', error);
    throw new Error('Error fetching Event');
  }
};

export const createEvent = async (event: Event) => {
  try {
    const eventResponse = await db(tableName).insert(event).returning('*');
    return eventResponse;
  } catch (error) {
    console.error('Error in eventsRepository.createEvent:', error);
    throw new Error('Error creating Event');
  }
};

export const updateEvent = async (event: Event, id: string) => {
  try {
    const eventResponse = await db(tableName).where('id', id).update(event).returning('*');
    return eventResponse;
  } catch (error) {
    console.error('Error in eventsRepository.updateEvent:', error);
    throw new Error('Error updating Event');
  }
};

export const deleteEvent = async (id: string) => {
  try {
    const eventDeleted = await db(tableName).where('id', id).delete().returning('*');
    return eventDeleted;
  } catch (error) {
    console.error('Error in eventsRepository.deleteEvent:', error);
    throw new Error('Error deleting Event');
  }
};
