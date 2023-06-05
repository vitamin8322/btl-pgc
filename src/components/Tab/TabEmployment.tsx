import { IEmployeeFrom } from "@/models/Employee";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import SelectMui from "../CustomComponents/SelectMui";
import CheckBoxMui from "../CustomComponents/CheckBoxMui";

type PropsTabEmployment = {
  employee: IEmployeeFrom;
};

const TabEmployment = (props: PropsTabEmployment) => {
  //redux
  const dispatch = useDispatch<AppDispatch>();
  const { dataDepartment, dataPosition } = useSelector(
    (state: RootState) => state.employee
  );

  //funs
  const {   employee } =
    props;

  return (
    <div>
      <div className="flex flex-col gap-2.5 px-2.5">
        <SelectMui
          data={dataDepartment}
          label="Department"
          placeholder="Choose Department"
          value={employee.department_id ?? ""}
          isNa
          name="department_id"
        />
        <SelectMui
          data={dataPosition}
          label="Position"
          placeholder="Choose Position"
          value={employee.position_id ?? ""}
          isNa
          name="position_id"
        />
        <CheckBoxMui
          label="Entitled OT"
          value={employee.entitle_ot}
          name="entitle_ot"
        />
        <CheckBoxMui
          label="Meal Allowance Paid"
          value={employee.meal_allowance_paid}
          name="meal_allowance_paid"
        />
        <CheckBoxMui
          label="Operational Allowance Paid"
          checked
          value={employee.operational_allowance_paid}
          name="operational_allowance_paid"
          disabled
        />
        <CheckBoxMui
          label="Attendance Allowance Paid"
          checked
          value={employee.attendance_allowance_paid}
          name="attendance_allowance_paid"
          disabled
        />
      </div>
    </div>
  );
};

export default TabEmployment;
