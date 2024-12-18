import {
  getEvents,
  getEvent,
  createEvent,
  updateEvent,
  deleteEvent,
} from '../repositories/eventsRepository';
import Event from '../models/eventInterface';

export const getEventsService = async () => {
  try {
    const events = await getEvents();
    //TODO: LOGIC BUSINESS
    return events;
  } catch (error) {
    console.error('Error in eventsService.getEventsService:', error);
    throw new Error('Error fetching Events');
  }
};

export const getEventsByIdService = async (id: string) => {
  try {
    const event = await getEvent(id);
    return event;
  //TODO: LOGIC BUSINESS
  } catch (error) {
    console.error('Error in eventsService.getEventsByIdService:', error);
    throw new Error('Error fetching Event');
  }
};

export const createEventService = async (event: Event) => {
  try {
    const eventResponse = await createEvent(event);
    return eventResponse;
    //TODO: LOGIC BUSINESS
  } catch (error) {
    console.error('Error in eventsService.createEventService:', error);
    throw new Error('Error creating Event');
  }
};

export const updateEventService = async (event: Event, id: string) => {
  try {
    const eventResponse = await updateEvent(event, id);
    return eventResponse;
    //TODO: LOGIC BUSINESS
  } catch (error) {
    console.error('Error in eventsService.updateEventService:', error);
    throw new Error('Error updating Event');
  }
};

export const deleteEventService = async (id: string) => {
  try {
    const eventDeleted = await deleteEvent(id);
    return eventDeleted;
    //TODO: LOGIC BUSINESS
  } catch (error) {
    console.error('Error in eventsService.deleteEventService:', error);
    throw new Error('Error deleting Event');
  }
};
