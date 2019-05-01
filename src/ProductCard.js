import React, { useState } from 'react';
import { Card, CardMedia, CardActions, CardContent, Typography, withStyles, Button } from '@material-ui/core';
import Size from './Size';

const styles = {
    media: {
        height: 200,
        objectFit: 'contain',
        flexGrow: 0,
        flexShrink: 0
    },
    card: {
        marginBottom: 20,
        width: 225,
        marginRight: 20,
        display: 'flex',
        flexDirection: 'column'
    },
    action: {
        height: '100%'
    },
    cardcontent: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        flexGrow: 1,
        paddingBottom: 0
    },
    actions: {
        justifyContent: 'flex-end'
    }
};

const ProductCard = ({ sku, title, subtitle, classes }) => {
    let [size, setSize] = useState("S");

    return (
        <Card className={classes.card}>
            <CardMedia className={classes.media}
                    component="img"
                    image={`/photos/${sku}_1.jpg`}
                    title="Product image" />
            <CardContent className={classes.cardcontent}>
                <div>
                    <Typography gutterBottom variant="h6" color="textPrimary">
                        {title}
                    </Typography>
                    <Typography component="p" color="textSecondary">
                        {subtitle}
                    </Typography>
                </div>
                <div>
                    <Size size={size} changeSize={setSize} />
                </div>
            </CardContent>
            <CardActions className={classes.actions}>
                <Button size="small" color="primary">Add to cart</Button>
            </CardActions>
        </Card>
    );
};

export default withStyles(styles)(ProductCard);