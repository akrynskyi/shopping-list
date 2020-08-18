import { Purchase } from '../../shared/models/purchase.model';

export interface Record {
  id?: string,
  name: string,
  createDate: number,
  updateDate?: number,
  shoppingList: Purchase[]
}

export interface UpdateProps {
  record: Record,
  message?: string
}
