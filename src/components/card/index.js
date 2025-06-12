// import React from "react";
// const Card = ({ title, children }) => {
//   return (
//     <div style={{ border: "2px solid red", margin: "15px" }}>
//       <p>{title}</p>
//       {children}
//     </div>
//   );
// };
// export default Card;



import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
export default function BasicButtons() {
  return (
    <Stack spacing={2} direction="row">
      <Button variant="outlined">Outlined</Button>
      <AccountCircleIcon />
    </Stack>
  );
}
