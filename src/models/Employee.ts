export interface IEmployeeFrom {
  id: number;
  old_staff_id: number | null;
  staff_id: string;
  name: string;
  gender: number |  string;
  department_id: number | null;
  company_id: number | null;
  manager_id: number | null;
  marriage_id: number | string | null;
  marriage: IMarriageStatus[]
  position_id: number | null;
  type: number| string | null;
  mother_name: string;
  dob: string;
  pob: string | null;
  ktp_no: string;
  nc_id: string;
  home_address_1: string;
  home_address_2: string | null;
  mobile_no: string | null;
  tel_no: string;
  bank_account_no: string;
  bank_name: string;
  card_number: string | null;
  family_card_number: string;
  health_insurance_no: string;
  safety_insurance_no: string |null;
  basic_salary: number;
  audit_salary: number;
  health_insurance: number;
  safety_insurance: number;
  meal_allowance: number ;
  entitle_ot: number;
  meal_allowance_paid: number;
  operational_allowance_paid: number;
  attendance_allowance_paid: number;
  minimum_salary_used: string;
  contract_start_date: string;
  shift: string;
  grade_id: number | null;
  remark: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  department_name: string;
  position_name: string | null;
  grade_prefix: string;
  grade_name: string;
  manager_name: string | null;
  documents: IDocument[];
  contracts: IContract[];
  grade: IGrade | null;
  benefits: IBenefit[];
}

export interface IStatusEmployee{
  data:{};
  message: string; 
  result: boolean
}

export interface IContract {
  id: number;
  employee_id: number;
  contract_date: string;
  name: string;
  document: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface IEmployeeListResponse {
  current_page: number;
  data: IEmployeeFrom[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: {
    url: string;
    label: string;
    active: boolean;
  };
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
}

export interface IFormEmployee {
  nik: string;
  name: string;
  gender: string;
  mother_name: string;
  dob: string;
  pob: string;
  ktp_no: string;
  nc_id: string;
  home_address_1: string;
  home_address_2: string;
  mobile_no: string;
  tel_no: string;
  marriage_id: string;
  card_number: string;
  bank_account_no: string;
  bank_name: string;
  family_card_number: string;
  safety_insurance_no: string;
  health_insurance_no: string;
}

export interface IFormContract {
  contract_start_date: string;
  type: number;
  contract: IContract[];
}
export interface IFormEmploymentDetail {
  department_id: string;
  position_id: string;
}

export interface IMarriageStatus {
  id: number;
  name: string;
  code: string;
  company_id: number;
  created_at: string;
  updated_at: string | null;
}

export interface IDepartmentStatus {
  id: number;
  name: string;
  code: string;
  company_id: number;
  created_at: string;
  updated_at: string | null;
}

export interface IPositionStatus {
  id: number;
  name: string;
  code: string;
  company_id: number;
  created_at: string;
  updated_at: string | null;
}

export interface IBenefit {
  id: number;
  name: string;
  code: string;
  type: number;
  value: string;
  company_id: number;
  created_at: string;
  updated_at: string;
}

export interface IGrade {
  id: number;
  name: string;
  prefix: string;
  company_id: number;
  created_at: string;
  updated_at: string;
  benefits: IBenefit[];
}

export interface IContractFormData {
  employee_id?: string;
  names: string[];
  contract_dates: string[];
  documents: File[];
  modified_contracts: string[];
}

export interface IDocumentFormData{
  employee_id?: string | null;
  documents?: File[];
  deleted_ids?: number[]
}

export interface  IDocument {
  id: number;
  employee_id: number;
  created_at: string;
  document: string;
  updated_at: string | null;
}
