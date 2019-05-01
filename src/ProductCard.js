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
        justifyContent: 'space-between'
    },
    price: {
        paddingLeft: 12
    }
};

const format = price => ("$" + price.toFixed(2));

const hasInventory = (inventory, cart, size) => {
    if (typeof(inventory) === "undefined")
        return false;
    const rCart = cart.filter(item => item[1] === size).length;
    return inventory[size] - rCart > 0;
}

const ProductCard = ({ sku, title, subtitle, classes, price, add: addToCart, inventory, inCart }) => {
    let [size, setSize] = useState("");

    const addToCartTS = (sku, size) => {
        addToCart(sku, size, new Date().getTime());
    }

    if (size !== "" && !hasInventory(inventory, inCart, size))
        setSize("");

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
                    <Size size={size} changeSize={setSize} inventory={inventory} inCart={inCart} />
                </div>
            </CardContent>
            <CardActions className={classes.actions}>
                <Typography className={classes.price} variant="subtitle1">
                    {format(price)}
                </Typography>
                <Button size="small" color="primary" disabled={size === ""} onClick={addToCartTS.bind(null, sku, size)}>Add to cart</Button>
            </CardActions>
        </Card>
    );
};

export { format as priceFormat, hasInventory };
export default withStyles(styles)(ProductCard);