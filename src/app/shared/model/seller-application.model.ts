export type SellerApplicationStatus = 'PENDING' | 'APPROVED' | 'REJECTED' | 'SUSPENDED' | 'WITHDRAWN';

export interface SellerApplication {
  id: number;
  publicName: string;
  description: string;
  contactEmail: string;
  itemTypes: string;
  deliveryMethod: string;
  termsVersion: string;
  status: SellerApplicationStatus;
  decisionReason?: string;
  decidedBy?: string;
  submittedAt: string;
  modifiedAt: string;
}

export interface SellerApplicationRequest {
  publicName: string;
  description: string;
  contactEmail: string;
  itemTypes: string;
  deliveryMethod: string;
  termsVersion: string;
  termsAccepted: boolean;
}
