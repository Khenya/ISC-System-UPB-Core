import { Dayjs } from 'dayjs';

interface Intern {
  id?: number;
  id_user: number;
  total_hours: number;
  pending_hours: number;
  completed_hours: number;
  created_at: Dayjs;
  updated_at: Dayjs;
}

export default Intern
