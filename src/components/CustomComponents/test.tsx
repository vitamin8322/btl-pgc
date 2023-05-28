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
    value1: "",
    value2: "",
    value3: "",
    value4: "",
    value5: "",
    value6: "",
  });
  const [tabErrors, setTabErrors] = React.useState<string[]>([]);

  const validateInputs = (tabIndex: number) => {
    let isValid = true;
    const errorTabs: string[] = [];

    if (tabIndex === 0) {
      if (!valueInput.value1 || !valueInput.value2) {
        errorTabs.push("Item One");
        isValid = false;
      }
    } else if (tabIndex === 1) {
      if (!valueInput.value3 || !valueInput.value4) {
        errorTabs.push("Item Two");
        isValid = false;
      }
    } else if (tabIndex === 2) {
      if (!valueInput.value5 || !valueInput.value6) {
        errorTabs.push("Item Three");
        isValid = false;
      }
    }

    setTabErrors(errorTabs);

    return isValid;
  };

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    const isValid = validateInputs(newValue);
    if (isValid) {
      setValue(newValue);
    }
  };

  const handleChangeInput = (
    e: React.ChangeEvent<HTMLInputElement>,
    newValue: number
  ) => {
    const { name, value } = e.target;
    setValueInput((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };
  

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
      <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab
            label={
              <>
                Item One{" "}
                {tabErrors.includes("Item One") && <span>(Error)</span>}
              </>
            }
            {...a11yProps(0)}
          />
          <Tab
            label={
              <>
                Item Two{" "}
                {tabErrors.includes("Item Two") && <span>(Error)</span>}
              </>
            }
            {...a11yProps(1)}
          />
          <Tab
            label={
              <>
                Item Three{" "}
                {tabErrors.includes("Item Three") && <span>(Error)</span>}
              </>
            }
            {...a11yProps(2)}
          />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <input
          value={valueInput.value1}
          onChange={() => handleChangeInput}
          name="value1"
        />
        <input
          value={valueInput.value2}
          onChange={() => handleChangeInput}
          name="value2"
        />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <input
          value={valueInput.value3}
          onChange={() => handleChangeInput}
          name="value3"
        />
        <input
          value={valueInput.value4}
          onChange={() => handleChangeInput}
          name="value4"
        />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <input
          value={valueInput.value5}
          onChange={() => handleChangeInput}
          name="value5"
        />
        <input
          value={valueInput.value6}
          onChange={() => handleChangeInput}
          name="value6"
        />
      </TabPanel>
    </Box>
  );
}
