export interface DefenseDetail {
  id?: number;
  graduation_process_id: number;
  type: 'internal' | 'external';
  president?: number;
  first_juror?: number;
  second_juror?: number;
  reviewer?: number;
  tutor?: number;
  grade?: number;
}
