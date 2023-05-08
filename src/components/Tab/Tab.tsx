import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import TabPanel from "./TabPanel";
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import LoginFrom from "../LoginFrom";
import Input from "../CustomComponents/Input";
import SelectMui from "../CustomComponents/SelectMui";
import { useParams } from "react-router-dom";
import { FormEmployee } from "../../models/Employee";
import TabEmployee from "./TabEmployee";
import { SelectChangeEvent } from "@mui/material/Select";

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const BasicTabs = () => {
  const { idEmployee } = useParams();
  const [value, setValue] = useState(0);
  const [formEmployee, setFormEmployee] = useState<FormEmployee>({
    nik: "",
    name: "",
    gender: "",
    motherName: "",
    dateOfBirth: "",
    placeOfBirth: "",
    ktpNo: "",
    nationalCardId: "",
    homeAddress1: "",
    homeAddress2: "",
    mobileNo: "",
    telNo: "",
    marriageStatus: "",
    bankCardNo: "",
    bankAccountNo: "",
    bankName: "",
    familyCardNumber: "",
    safetyInsuranceNo: "",
    healthInsuranceNo: "",
  });

  const handleFormEmployeeChange = useCallback(
    (e: ChangeEvent<HTMLInputElement> | SelectChangeEvent<string>) => {
      const { name } = e.target;
      let value: any;
      value = e.target.value;
      setFormEmployee((prevValues) => ({ ...prevValues, [name]: value }));
    },
    []
  );


  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%", padding: "10px" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Employee Information" {...a11yProps(0)} />
          <Tab label="Contract Information" {...a11yProps(1)} />
          <Tab label="Employment Details" {...a11yProps(2)} />
          <Tab label="Salary & Wagese" {...a11yProps(3)} />
          <Tab label="Others" {...a11yProps(4)} />
        </Tabs>
      </Box>
      <TabPanel value={value} title="Personal Information" index={0}>
        <TabEmployee
          formEmployee={formEmployee}
          handleFormEmployeeChange={handleFormEmployeeChange}
        />
      </TabPanel>
      <TabPanel value={value} title="Item 2" index={1}>
        Item Two
      </TabPanel>
      <TabPanel value={value} title="Item 3" index={2}>
        Item Three
      </TabPanel>
    </Box>
  );
};

export default BasicTabs;
