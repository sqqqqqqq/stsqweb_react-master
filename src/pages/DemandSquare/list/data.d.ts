export interface ActionType {
  reload: () => void;
  fetchMore: () => void;
  reset: () => void;
}

export interface demandType {
  productType: string;
  companyName: string;
  industry: string;
  contactName: string;
  id: number;
  title: string;
  contactPhone: string;
  status: string | null;
  industryId: number;
  productTypeId: number;
}
