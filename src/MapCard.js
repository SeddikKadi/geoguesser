import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from "@mui/material/Button";

import {Link} from "react-router-dom"

const MapCard=(props)=>{
return (
    <Card sx={{ maxWidth: 300 }}>
        <CardMedia
            component="img"
            height="250"

            image={props.data.image}
            alt="green iguana"
        />
        <CardContent>
            <Typography gutterBottom variant="h5" component="div">
                {props.data.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
                Lizards are a widespread group of squamate reptiles, with over 6,000
                species, ranging across all continents except Antarctica
            </Typography>
        </CardContent>
        <CardActions>
            <Link to={`/gameparameter/${props.data.name}`}><Button size="small">Play</Button></Link>

        </CardActions>
    </Card>
)
}
export default MapCard