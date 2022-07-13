import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useAuth0 } from "@auth0/auth0-react";

export default function Profile() {
  const { user } = useAuth0();
  console.log(user);
  return (
    <Card sx={{ maxWidth: 345 }}>
      {user?.picture && (
        <CardMedia
          component="img"
          alt={user?.name}
          height="140"
          image={user.picture}
        />
      )}
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {user?.name}
        </Typography>
        <Typography variant="p" component="div">
          {user?.email}
        </Typography>
        <Typography variant="p" component="div">
          {user?.nickname}
        </Typography>
      </CardContent>
    </Card>
  );
}
