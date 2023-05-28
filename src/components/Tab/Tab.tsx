import Box from "@mui/material/Box";
import TabPanel from "./TabPanel";
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import {
  IFormContract,
  IFormEmployee,
  IFormEmploymentDetail,
  IFormSalary,
} from "../../models/Employee";
import TabEmployee from "./TabEmployee";
import { SelectChangeEvent } from "@mui/material/Select";
import TabContract from "./TabContract";
import TabEmployment from "./TabEmployment";
import { AntTabs } from "../CustomStyle/StyleTabs";
import { AntTab } from "../CustomStyle/StyleTab";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import {
  changeEmployee,
  checkContract,
  checkEmployee,
  getBenefit,
  getGrade,
  getIdEmployee,
  resetEmployee,
} from "../../redux/slice/employeeSlice";
import TabOthers from "./TabOthers";
import ErrorOutlineRoundedIcon from "@mui/icons-material/ErrorOutlineRounded";
import TabSalary from "./TabSalary";
import {
  mountDataContract,
  removeAllDataContract,
  removeAllDataFormConTract,
} from "../../redux/slice/contractSlice";
import {
  mountDataDocument,
  removeAllDataDocument,
  removeAllDataFromDocument,
} from "../../redux/slice/documentSlice";
import "./CustomTab.scss";
import BasicModal from "../CustomComponents/ModalCustom";

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const BasicTabs = () => {
  // redux
  const dispatch = useDispatch<AppDispatch>();
  const { company } = useSelector((state: RootState) => state.auth);
  const { dataDocument } = useSelector((state: RootState) => state.document);
  const { employee, checkValidationEmplyee, checkValidationContract } =
    useSelector((state: RootState) => state.employee);
  const { dataFormContract, dataContract } = useSelector(
    (state: RootState) => state.contract
  );
  const { idEmployee } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      if (idEmployee) {
        await dispatch(getIdEmployee(Number(idEmployee)));
      } else {
        dispatch(resetEmployee());
        dispatch(removeAllDataContract());
        dispatch(removeAllDataDocument());
      }
      dispatch(removeAllDataFromDocument());
      dispatch(removeAllDataFormConTract());

      await dispatch(getGrade());
      await dispatch(getBenefit());
    };
    fetchData();
  }, [dispatch]);

  useEffect(() => {
    const handleDataUpdate = () => {
      dispatch(mountDataDocument(employee.documents));
      dispatch(mountDataContract(employee.contracts));
    };
    if (employee.benefits.length > 0) {
      const arrBenefits = employee.benefits.map((item) => item.id);
      dispatch(changeEmployee({ name1: "benefits", value: arrBenefits }));
    }

    if (idEmployee !== undefined) {
      handleDataUpdate();
    }
    // }
  }, [dispatch, employee?.documents, employee?.contracts]);

  //funx
  const [value, setValue] = useState(0);
  const [formEmploymentDetail, setFormEmploymentDetail] =
    useState<IFormEmploymentDetail>({
      department_id: "",
      position_id: "",
    });
  const [formSalary, setFormSalary] = useState<IFormSalary>({
    basic_salary: null,
    audit_salary: null,
    safety_insurance: null,
    health_insurance: null,
    meal_allowance: null,
  });

  const handleFormEmployeeChange = useCallback(
    (e: ChangeEvent<HTMLInputElement> | SelectChangeEvent<string | number>) => {
      const { name } = e.target;
      let value: any;
      value = e.target.value;
      dispatch(changeEmployee({ name1: name, value }));
      // console.log(employee);
    },
    []
  );
  const handleFormContractChange = useCallback(
    (e: ChangeEvent<HTMLInputElement> | SelectChangeEvent<string | number>) => {
      const { name } = e.target;
      let value: any;
      value = e.target.value;
      dispatch(changeEmployee({ name1: name, value }));
    },
    []
  );
  const handleFormEmploymentDetailChange = useCallback(
    (e: ChangeEvent<HTMLInputElement> | SelectChangeEvent<string | number>) => {
      const { name } = e.target;
      let value: any;
      value = e.target.value;
      setFormEmploymentDetail((prevValues) => ({
        ...prevValues,
        [name]: value,
      }));
      dispatch(changeEmployee({ name1: name, value }));
    },
    []
  );

  const [checkTab1, setCheckTab1] = useState();
  const [checkTab2, setCheckTab2] = useState({ validation: false, count: 0 });

  useEffect(() => {
    dispatch(checkEmployee());
    // dispatch(checkContract());
  }, []);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    console.log(newValue);
    setValue(newValue);
    dispatch(checkEmployee());
    if (checkTab2.count > 0) {
      dispatch(checkContract());
    }
    if (newValue === 1) {
      if (checkTab2.count > 0) {
        dispatch(checkContract());
      }
      checkTab2.count++;
    }
  };
  return (
    <Box sx={{ width: "100%", padding: "10px" }}>
      <Box sx={{}}>
        <AntTabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          className="border-none !border-b-0 mb-5"
        >
          <AntTab
            icon={checkValidationEmplyee ? <ErrorOutlineRoundedIcon /> : ""}
            iconPosition={"end"}
            label="Employee Information"
            {...a11yProps(0)}
            className={`${checkValidationEmplyee ? "errorTab" : ""}  `}
          />
          <AntTab
            icon={checkValidationContract ? <ErrorOutlineRoundedIcon /> : ""}
            iconPosition={"end"}
            label="Contract Information"
            className={`${checkValidationContract ? "errorTab" : ""}  `}
            {...a11yProps(1)}
          />
          <AntTab label="Employment Details" {...a11yProps(2)} />
          <AntTab label="Salary & Wagese" {...a11yProps(3)} />
          <AntTab label="Others" {...a11yProps(4)} />
        </AntTabs>
      </Box>
      <TabPanel value={value} title="Personal Information" index={0}>
        <TabEmployee
          handleFormEmployeeChange={handleFormEmployeeChange}
          employee={employee}
        />
      </TabPanel>
      <TabPanel value={value} title="Contract Information" index={1}>
        <TabContract
          employee={employee}
          handleFormContractChange={handleFormContractChange}
        />
      </TabPanel>
      <TabPanel value={value} title="Employment Details" index={2}>
        <TabEmployment
          formEmploymentDetail={formEmploymentDetail}
          handleFormEmploymentDetailChange={handleFormEmploymentDetailChange}
          employee={employee}
        />
      </TabPanel>
      <TabPanel value={value} title="Salary & Wages" index={3}>
        <TabSalary formSalary={formSalary} employee={employee} />
      </TabPanel>
      <TabPanel value={value} title="Others" index={4}>
        <TabOthers employee={employee} />
      </TabPanel>
    </Box>
  );
};

export default BasicTabs;
