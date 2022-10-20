export interface Bug {
  id: string | null;
  creationDate: string;
  modifiedDate: string | null;
  title: string;
  description: string | null;
  status: string;
  personId: string | null;
  personName: string | null;
}
