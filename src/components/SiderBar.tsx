import * as React from "react";
import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import DraftsIcon from "@mui/icons-material/Drafts";
import SendIcon from "@mui/icons-material/Send";
import StarBorder from "@mui/icons-material/StarBorder";
import { useState } from "react";
import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";
import { itemsSiderbar } from "../utils/dataSiderbar";
import SvgIcon from "@mui/material/SvgIcon";
import user from "../assets/image/User.svg";
import { NavLink, useLocation } from "react-router-dom";
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
                paddingLeft:'0'
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
                  {/* <ListItemIcon>{user}</ListItemIcon> */}
                  <img src={item.icon} alt="" />
                  <SvgIcon children={item.icon} inheritViewBox />
                  <ListItemText
                    sx={{ marginLeft: "-10px" }}
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
                        borderRadius:'6px',
                        padding:'8px 10px'
                      }}
                      disablePadding
                    >
                      {item.children.map((child) => (
                        <ListItemButton
                          sx={{
                            width: "100%",
                            marginTop: "10px",
                            backgroundColor:'rgb(248, 249, 250)',
                            margin:'2px 0',
                            height:'35px',
                            borderRadius:'8px',
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
          </>
        ))}
      </List>
    </SimpleBar>
  );
};

export default React.memo(SiderBar);
