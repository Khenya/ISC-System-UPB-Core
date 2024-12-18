import { Dayjs } from "dayjs";

interface EventInterns {
  id_intern: number;
  id_event: number;
  type: string;
  created_at: Dayjs;
  updated_at: Dayjs;
}

export default EventInterns