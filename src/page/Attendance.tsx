import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { ChangeEvent } from "react";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs() {
  const [value, setValue] = React.useState(0);
  const [valueInput, setValueInput] = React.useState({
    value1:'',
    value2:'',
    value3:'',
    value4:'',
    value5:'',
    value6:'',
  })
  const [tabValidation, setTabValidation] = React.useState([false, false, false]);
  const [tabErrors, setTabErrors] = React.useState(["", "", ""]);
  
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    const isValid = validateTab(value);
    setTabValidation((prevValidation) => {
      const updatedValidation = [...prevValidation];
      updatedValidation[value] = isValid;
      return updatedValidation;
    });
  
    // Hiển thị thông báo lỗi tương ứng trên tab
    setTabErrors((prevErrors) => {
      const updatedErrors = [...prevErrors];
      updatedErrors[value] = isValid ? "" : "Vui lòng nhập đầy đủ thông tin.";
      return updatedErrors;
    });
  
    setValue(newValue);
  };
  
  
  
  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValueInput((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  
    // Cập nhật trạng thái validation cho tab hiện tại
    const isValid = validateTab(Number(value));
    setTabValidation((prevValidation) => {
      const updatedValidation = [...prevValidation];
      updatedValidation[Number(value)] = isValid;
      return updatedValidation;
    });
  };
  
  const validateTab = (tabIndex: number) => {
    switch (tabIndex) {
      case 0:
        // Kiểm tra validation cho tab 0
        if (valueInput.value1 === '' || valueInput.value2 === '') {
          return false;
        }
        break;
      case 1:
        // Kiểm tra validation cho tab 1
        if (valueInput.value3 === '' || valueInput.value4 === '') {
          return false;
        }
        break;
      case 2:
        // Kiểm tra validation cho tab 2
        if (valueInput.value5 === '' || valueInput.value6 === '') {
          return false;
        }
        break;
      default:
        break;
    }
    return true;
  };
  

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Item One" {...a11yProps(0)} />
          <Tab label="Item Two" {...a11yProps(1)} />
          <Tab label="Item Three" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
  <input value={valueInput.value1} onChange={(e) => handleChangeInput(e)} name="value1" />
  <input value={valueInput.value2} onChange={(e) => handleChangeInput(e)} name="value2" />
  {!tabValidation[0] && (
    <Typography variant="body2" color="error">
      Vui lòng nhập đầy đủ thông tin cho tab 1.
    </Typography>
  )}
</TabPanel>

<TabPanel value={value} index={1}>
  <input value={valueInput.value3} onChange={(e) => handleChangeInput(e)} name="value3" />
  <input value={valueInput.value4} onChange={(e) => handleChangeInput(e)} name="value4" />
  {!tabValidation[1] && (
    <Typography variant="body2" color="error">
      Vui lòng nhập đầy đủ thông tin cho tab 2.
    </Typography>
  )}
</TabPanel>

<TabPanel value={value} index={2}>
  <input value={valueInput.value5} onChange={(e) => handleChangeInput(e)} name="value5" />
  <input value={valueInput.value6} onChange={(e) => handleChangeInput(e)} name="value6" />
  {!tabValidation[2] && (
    <Typography variant="body2" color="error">
      Vui lòng nhập đầy đủ thông tin cho tab 3.
    </Typography>
  )}
</TabPanel>

    </Box>
  );
}