import { Record } from 'src/app/state/records/records.model';

export interface RecordsList {
  [key: string]: Record
}

export interface DbResponse {
  name: string
}
