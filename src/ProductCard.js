import React from 'react';
import { Card, CardMedia, CardActionArea, CardContent, Typography, withStyles } from '@material-ui/core';

const styles = {
    media: {
        height: 200,
        objectFit: 'contain'
    },
    card: {
        marginBottom: 20,
        width: 225,
        marginRight: 20
    },
    action: {
        height: '100%'
    }
};

const ProductCard = ({ sku, title, subtitle, classes }) => (
    <Card className={classes.card}>
        <CardActionArea className={classes.action}>
            <CardMedia className={classes.media}
                       component="img"
                       image={`/photos/${sku}_1.jpg`}
                       title="Product image" />
            <CardContent>
                <Typography gutterBottom variant="h6" color="textPrimary">
                    {title}
                </Typography>
                <Typography component="p" color="textSecondary">
                    {subtitle}
                </Typography>
            </CardContent>
        </CardActionArea>
    </Card>
);

export default withStyles(styles)(ProductCard);