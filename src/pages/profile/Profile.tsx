import { Box } from "@mui/material";

const Profile = () => {
  console.log("called Profile page");
  return (
    <Box sx={{ pt: { sm: 10 }, height: "100vh" }}>
      <h1>Profile</h1>
      <p>Profile Page</p>
    </Box>
  );
};

export default Profile;
