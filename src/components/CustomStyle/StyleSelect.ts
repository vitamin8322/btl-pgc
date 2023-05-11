import { InputBase, PaperProps, styled } from '@mui/material';

export const customPaperProps: PaperProps = {
  sx: {
    marginTop: '2px',
    boxShadow: 'none',
    fontWeight: '400',
    fontSize: '16px',
    border: ' 1px solid rgb(223, 227, 230)',
    padding: '0 10px',
    '& .MuiMenuItem-root': {
      marginBottom: '2px',
    },
    '& .MuiMenuItem-root:hover': {
      color: 'rgb(48, 164, 108)',
      borderRadius: '8px',
    },
    '& .MuiMenuItem-root.Mui-selected': {
      backgroundColor: 'rgb(233, 249, 238)',
      borderRadius: '8px',
      color: 'rgb(48, 164, 108)',
    },
  },
};

 const CustomInputSelect = styled(InputBase)(({ theme }) => ({
    boxShadow: "none",
    ".MuiOutlinedInput-notchedOutline": {
      border: "none", 
      borderRadius: "0.25rem",
    },
    ".MuiSelect-select": {
      display: "flex",
      borderRadius: "0.25rem",
      marginLeft: "12px",
      color: "rgb(104, 112, 118)",
      fontWeight: "400",
    },
  }));

  export default CustomInputSelect