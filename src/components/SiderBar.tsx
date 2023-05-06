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
import 'simplebar-react/dist/simplebar.min.css';
type Props = {};
type Item = {
  id: string;
  name: string;
  icon: JSX.Element;
  children?: Item[];
};

const items: Item[] = [
  {
    id: "1",
    name: "Item 1",
    icon: <SendIcon />,
  },
  {
    id: "2",
    name: "Item 2",
    icon: <DraftsIcon />,
  },
  {
    id: "3",
    name: "Item 3",
    icon: <InboxIcon />,
    children: [
      { id: "3.1", name: "Sub Item 1", icon: <StarBorder /> },
      { id: "3.2", name: "Sub Item 2", icon: <StarBorder /> },
      { id: "3.3", name: "Sub Item 3", icon: <StarBorder /> },
    ],
  },
  {
    id: "4",
    name: "Item 4",
    icon: <InboxIcon />,
    children: [
      { id: "4.1", name: "Sub Item 1", icon: <StarBorder /> },
      { id: "4.2", name: "Sub Item 2", icon: <StarBorder /> },
      { id: "4.3", name: "Sub Item 3", icon: <StarBorder /> },
    ],
  },
  {
    id: "5",
    name: "Item 4",
    icon: <InboxIcon />,
    children: [
      { id: "4.1", name: "Sub Item 1", icon: <StarBorder /> },
      { id: "4.2", name: "Sub Item 2", icon: <StarBorder /> },
      { id: "4.3", name: "Sub Item 3", icon: <StarBorder /> },
    ],
  },
  {
    id: "6",
    name: "Item 4",
    icon: <InboxIcon />,
    children: [
      { id: "4.1", name: "Sub Item 1", icon: <StarBorder /> },
      { id: "4.2", name: "Sub Item 2", icon: <StarBorder /> },
      { id: "4.3", name: "Sub Item 3", icon: <StarBorder /> },
    ],
  },
  {
    id: "7",
    name: "Item 4",
    icon: <InboxIcon />,
    children: [
      { id: "4.1", name: "Sub Item 1", icon: <StarBorder /> },
      { id: "4.2", name: "Sub Item 2", icon: <StarBorder /> },
      { id: "4.3", name: "Sub Item 3", icon: <StarBorder /> },
    ],
  },
  {
    id: "8",
    name: "Item 4",
    icon: <InboxIcon />,
    children: [
      { id: "4.1", name: "Sub Item 1", icon: <StarBorder /> },
      { id: "4.2", name: "Sub Item 2", icon: <StarBorder /> },
      { id: "4.3", name: "Sub Item 3", icon: <StarBorder /> },
    ],
  },
  {
    id: "9",
    name: "Item 4",
    icon: <InboxIcon />,
    children: [
      { id: "4.1", name: "Sub Item 1", icon: <StarBorder /> },
      { id: "4.2", name: "Sub Item 2", icon: <StarBorder /> },
      { id: "4.3", name: "Sub Item 3", icon: <StarBorder /> },
    ],
  },
  {
    id: "10",
    name: "Item 4",
    icon: <InboxIcon />,
    children: [
      { id: "4.1", name: "Sub Item 1", icon: <StarBorder /> },
      { id: "4.2", name: "Sub Item 2", icon: <StarBorder /> },
      { id: "4.3", name: "Sub Item 3", icon: <StarBorder /> },
    ],
  },
];

const groupedItems = [
  {
    header: "Header 1",
    color: "blue",
    items: items.filter((item) => item.id <= "6"),
  },
  {
    header: "Header 2",
    color: "black",
    items: items.filter((item) => item.id >= "7"),
  },
];


const SiderBar = (props: Props) => {
  const [open, setOpen] = useState<{ [key: string]: boolean | undefined }>({});
  console.log(123123);
  
  const handleClick = (id: string) => {
    setOpen((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  return (
    <SimpleBar
      style={{ height: '100vh', position:'fixed', backgroundColor:'#fff', borderRight:"1px solid rgb(223, 227, 230)" }}
    >
      <div style={{height:'60px'}}></div>
      <List
        sx={{ width: "380px",height:'100%', maxWidth: 330, bgcolor: "background.paper" }}
        component="nav"
        aria-labelledby="nested-list-subheader"
      >
        {groupedItems.map((group) => (
          <>
            <ListSubheader
              style={{ color: `${group.color}` }}
              component="div"
              id="nested-list-subheader"
            >
              {group.header}
            </ListSubheader>
            {group.items.map((item, id) => (
              <React.Fragment key={item.name}>
                <ListItemButton
                  onClick={
                    item.children ? () => handleClick(item.id) : undefined
                  }
                >
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.name} />
                  {item.children ? open ? <></> : <></> : null}
                </ListItemButton>
                {item.children ? (
                  <Collapse
                    in={open[String(item.id)]}
                    timeout="auto"
                    unmountOnExit
                  >
                    <List component="div" disablePadding>
                      {item.children.map((child) => (
                        <ListItemButton sx={{ pl: 4 }} key={child.name}>
                          <ListItemIcon>{child.icon}</ListItemIcon>
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
