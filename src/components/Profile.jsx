import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import { useAuth0 } from "@auth0/auth0-react";

export default function Profile() {
  const { user } = useAuth0();

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
