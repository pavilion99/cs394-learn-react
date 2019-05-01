import React from 'react';
import { withStyles, Typography, IconButton } from '@material-ui/core';
import { priceFormat } from './ProductCard';
import { Delete as DeleteIcon } from '@material-ui/icons';

const styles = {
    listing: {
        display: 'flex',
        borderBottom: '1px solid #ccc',
        padding: '0 10px'
    },
    prodimg: {
        height: 150
    },
    iteminfo: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'left'
    },
    size: {
        textTransform: 'capitalize'
    },
    deletecontainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'left',
        padding: '0 8px'
    },
    pricecontainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'left',
        padding: '0 8px 0 0'
    }
};

const ProductListing = ({ sku, size, products, classes, remove }) => {
    if (products.length === 0)
        return "";

    const product = products.filter(product => product.sku === sku)[0];

    return (
        <div className={classes.listing}>
            <img className={classes.prodimg} src={`/photos/${sku}_1.jpg`} />
            <div className={classes.iteminfo}>
                <Typography variant="h6">
                    {product.title}
                </Typography>
                <Typography variant="subtitle1" className={classes.size}>
                    {size}
                </Typography>
            </div>
            <div className={classes.deletecontainer}>
                <IconButton onClick={remove}>
                    <DeleteIcon />
                </IconButton>
            </div>
            <div className={classes.pricecontainer}>
                <Typography>
                    {priceFormat(product.price)}
                </Typography>
            </div>
        </div>
    );
};

export default withStyles(styles)(ProductListing);