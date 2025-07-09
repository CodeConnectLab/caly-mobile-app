export interface SurveyOption {
  name: string;
  value: string;
  description?: string;
}

export interface SurveyValidation {
  min: number;
  max: number;
}

export interface SurveyQuestion {
  _id: string;
  title: string;
  subTitle?: string;
  metaTitle?: string;
  description?: string;
  category: string;
  metaDescription?: string;
  isOptional: boolean;
  options: SurveyOption[];
  isMultiSelect: boolean;
  seqNo: number;
  images?: string[];
  profileKey: string;
  validation?: SurveyValidation;
  exclusion?: boolean;
  createdBy?: string;
  deleted?: boolean;
  updatedAt?: string;
  createdAt?: string;
  __v?: number;
  deletedAt?: string | null;
  deletedBy?: string | null;
}

export interface OnboardingScreenProps {
  question: SurveyQuestion;
  onNext: (data: any) => void;
  onBack: () => void;
  currentStep: number;
  totalSteps: number;
}