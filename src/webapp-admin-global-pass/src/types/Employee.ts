export type Schedules = {
  end: string;
  start: string;
  checked: boolean;
  id: string;
};

export enum Status {
  PENDING = 'pending',
  INVITED_PENDING = 'invited_pending',
  APPROVED = 'approved',
  REJECTED = 'rejected',
}

export enum SanitizeStatus {
  pending = 'Pendente',
  invited_pending = 'Convite Pendente',
  approved = 'Aprovado',
  rejected = 'Rejeitado',
}
