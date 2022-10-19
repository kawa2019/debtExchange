export interface DebtApi {
  Id: number;
  Number: string;
  Name: string;
  Value: number;
  NIP: number;
  Date: string;
  DocumentType: string;
  Price: number;
  Address: string;
}

export type DebtApiKey = keyof DebtApi;

export interface FilteredDebtsBody {
  data: string;
}
