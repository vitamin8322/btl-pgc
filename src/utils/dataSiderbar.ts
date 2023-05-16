import InboxIcon from "@mui/icons-material/MoveToInbox";
import DraftsIcon from "@mui/icons-material/Drafts";
import SendIcon from "@mui/icons-material/Send";
import StarBorder from "@mui/icons-material/StarBorder";
import Attendance from "../assets/image/Attendance.svg";
import Leave from "../assets/image/Leave.svg";
import Payroll from "../assets/image/Payroll.svg";
import Employee from "../assets/image/Employee.svg";
import User from "../assets/image/User.svg";
import Master from "../assets/image/Master.svg";
import Global from "../assets/image/Global.svg";
import Settings from "../assets/image/Master.svg";
type Item = {
  id: string;
  path?: string;
  name: string;
  icon: string;
  children?: {
    id: string;
    name: string;
  }[];
};

export const itemsSiderbar: Item[] = [
  {
    id: "1",
    name: "Attendance Management",
    icon: Attendance,
    path: "/attendance",
  },
  {
    id: "2",
    name: "Leave Management",
    icon: Leave,
    // path: "/leave",
  },
  {
    id: "3",
    name: "Payroll Management",
    icon: Payroll,
    // path: "/payroll",
  },

  {
    id: "4",
    name: "Employee Management",
    icon: Payroll,
    path: "/employee",
  },
  {
    id: "5",
    name: "User Management",
    icon: User,
    // path: "/user",
  },
  {
    id: "6",
    name: "Master Management",
    icon: Master,
    children: [
      { id: "4.1", name: "Employee Grading" },
      { id: "4.2", name: "Benefit Setup" },
      { id: "4.3", name: "Leave Setup" },
      { id: "4.4", name: "Department" },
      { id: "4.5", name: "Position" },
      { id: "4.6", name: "Marriage Status" },
      { id: "4.7", name: "Compensation Setup" },
    ],
  },
  {
    id: "7",
    name: "Global Settings",
    icon: Global,
    children: [
      { id: "4.1", name: "Minimum Wages" },
      { id: "4.2", name: "Employee Allowance" },
      { id: "4.3", name: "Safety Insurance" },
      { id: "4.1", name: "Health Insurance" },
      { id: "4.2", name: "Public Holiday" },
      { id: "4.3", name: "OT Configure" },
      { id: "4.2", name: "Working Hour" },
      { id: "4.3", name: "Other Default" },
    ],
  },
  {
    id: "8",
    name: "Settings",
    icon: Settings,
    // path: "/settings",
  },
];
