import React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
  title: string;
}

const TabPanel = (props: TabPanelProps) => {
  const { children, value, index, title, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 1, backgroundColor: "rgb(251 252 253)" }}>
          <div className="flex justify-between align-center">
            <Typography variant="h6">{title}</Typography>
            <Typography>
              Required(
              <span className="text-required font-normal text-lg">*</span>)
            </Typography>
          </div>
          <hr
            style={{
              margin: "10px 0px",
              flexShrink: "0",
              borderWidth: "0px 0px thin",
              borderStyle: "solid",
              borderColor: "rgba(193, 200, 205, 0.24)",
            }}
          />
          <Typography sx={{}}>{children}</Typography>
        </Box>
      )}
    </div>
  );
};

export default TabPanel;
