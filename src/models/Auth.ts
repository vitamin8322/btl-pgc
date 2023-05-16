export interface ILoginFormFields {
  name: string;
  password: string;
  factory: number | null;
}

export interface IAuth {
  id: number;
  username: string;
  email: string;
  role_id: number;
  employee_id: number | null;
  department_id: number;
  company_id: number;
  register_token: string | null;
  email_verified_at: string | null;
  is_active: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  department_name: string | null;
  position_name: string | null;
  permissions: {
    attendance_record: {
      read: boolean;
      add: boolean;
      edit: boolean;
      export: boolean;
      unlock: boolean;
    };
    ot_record: {
      read: boolean;
      add: boolean;
      edit: boolean;
      export: boolean;
      unlock: boolean;
    };
    leave: {
      read: boolean;
      add: boolean;
      edit: boolean;
      export: boolean;
      unlock: boolean;
    };
    payroll_audit: {
      read: boolean;
      add: boolean;
      edit: boolean;
      export: boolean;
      unlock: boolean;
    };
    payroll_actual: {
      read: boolean;
      add: boolean;
      edit: boolean;
      export: boolean;
      unlock: boolean;
    };
    manage_employee: {
      read: boolean;
      add: boolean;
      edit: boolean;
      export: boolean;
      unlock: boolean;
    };
    manage_account: {
      read: boolean;
      add: boolean;
      edit: boolean;
      export: boolean;
      unlock: boolean;
    };
    global_setting: {
      read: boolean;
      add: boolean;
      edit: boolean;
      export: boolean;
      unlock: boolean;
    };
    setting: {
      read: boolean;
      add: boolean;
      edit: boolean;
      export: boolean;
      unlock: boolean;
    };
  };
  department: {
    id: number;
    name: string;
    code: string;
    company_id: number;
    created_at: string;
    updated_at: string;
  };
  employee: {
    // employee fields
  } | null;
  company: {
    id: number;
    name: string;
    full_name: string;
    address: string;
    tel_no: string;
    prefix: string;
    created_at: string;
    updated_at: string | null;
  };
}

export interface ICompany {
  id: number;
  name: string;
  full_name: string;
  address: string;
  tel_no: string;
  prefix: string;
  created_at: string;
  updated_at: string | null;
}

export interface ILogin {
 data:{
  token: string;
 };
 message: string;
 result: boolean;
}


