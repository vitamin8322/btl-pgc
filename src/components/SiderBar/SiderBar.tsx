import * as React from "react";
import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import { useState } from "react";
import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";
import { itemsSiderbar } from "../../utils/dataSiderbar";
import SvgIcon from "@mui/material/SvgIcon";
import { NavLink, useLocation } from "react-router-dom";
import "./SiderBar.scss";
type Props = {};

const groupedItems = [
  {
    header: "General",
    color: "blue",
    items: itemsSiderbar.filter((item) => item.id < "7"),
  },
  {
    header: "Advance",
    color: "black",
    items: itemsSiderbar.filter((item) => item.id >= "7"),
  },
];

const SiderBar = (props: Props) => {
  const location = useLocation();
  const [open, setOpen] = useState<{ [key: string]: boolean | undefined }>({});

  const handleClick = (id: string) => {
    setOpen((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  return (
    <SimpleBar
      key={1}
      // autoHide={false}
      style={{
        height: "100vh",
        position: "fixed",
        backgroundColor: "#fff",
        borderRight: "1px solid rgb(223, 227, 230)",
      }}
    >
      <div style={{ height: "60px" }}></div>
      <List
        sx={{
          width: "380px",
          height: "100%",
          maxWidth: 330,
          bgcolor: "background.paper",
          padding: "24px",
        }}
        component="nav"
        className="hide-last-hr"
        aria-labelledby="nested-list-subheader"
      >
        {groupedItems.map((group) => (
          <>
            <ListSubheader
              style={{ color: `${group.color}` }}
              component="div"
              id="nested-list-subheader"
              sx={{
                float: "left",
                fontSize: "24px",
                fontWeight: "500",
                paddingLeft: "0",
              }}
            >
              {group.header}
            </ListSubheader>
            {group.items.map((item, id) => (
              <React.Fragment key={item.name}>
                <ListItemButton
                  selected={location.pathname === item.path}
                  component={item?.path != undefined ? NavLink : "div"}
                  to={item?.path || undefined}
                  className="mb-5"
                  sx={{
                    width: "100%",
                    marginTop: "10px",
                    "&:hover": {
                      borderRadius: "8px",
                    },
                    "&.active": {
                      borderRadius: "8px",
                    },
                  }}
                  onClick={
                    item.children
                      ? () => {
                          handleClick(item.id);
                        }
                      : undefined
                  }
                >
                  <img src={item.icon} alt="" />
                  <ListItemText
                    sx={{ marginLeft: "8px" }}
                    primary={item.name}
                  />
                  {item.children ? open ? <></> : <></> : null}
                </ListItemButton>
                {item.children ? (
                  <Collapse
                    in={open[String(item.id)]}
                    timeout="auto"
                    unmountOnExit
                  >
                    <List
                      component="div"
                      sx={{
                        border: "1px solid rgb(223, 227, 230)",
                        borderRadius: "6px",
                        padding: "8px 10px",
                      }}
                      disablePadding
                    >
                      {item.children.map((child) => (
                        <ListItemButton
                          sx={{
                            width: "100%",
                            marginTop: "10px",
                            backgroundColor: "rgb(248, 249, 250)",
                            margin: "2px 0",
                            height: "35px",
                            borderRadius: "8px",
                            "&:hover": {
                              borderRadius: "8px",
                            },
                            "&.active": {
                              borderRadius: "8px",
                            },
                          }}
                          key={child.name}
                        >
                          <ListItemText primary={child.name} />
                        </ListItemButton>
                      ))}
                    </List>
                  </Collapse>
                ) : null}
              </React.Fragment>
            ))}
            <hr
              style={{
                marginTop: "10px",
                flexShrink: "0",
                borderWidth: "0px 0px thin",
                borderStyle: "solid",
                borderColor: "rgba(193, 200, 205, 0.24)",
              }}
            />
          </>
        ))}
      </List>
    </SimpleBar>
  );
};

export default React.memo(SiderBar);
