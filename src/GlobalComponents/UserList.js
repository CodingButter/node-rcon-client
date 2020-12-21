import { Paper, Typography } from "@material-ui/core";
import SkinHead from "globalComponents/SkinHead";

export default function UserList({ users }) {
  return users.map((username, index) => {
    return (
      <Paper data-username={username} key={index}>
        <SkinHead username={username} />
        <Typography>{username}</Typography>
      </Paper>
    );
  });
}
