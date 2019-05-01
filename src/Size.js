import React from 'react';
import { RadioGroup, Radio, FormControlLabel, withStyles } from '@material-ui/core';
import { hasInventory } from './ProductCard';

const styles = {
    formlabel: {
        margin: 0
    },
    radiogroup: {
        marginTop: 10
    }
};

const Size = ({ size, changeSize, classes, inventory, inCart }) => (
    <RadioGroup row className={classes.radiogroup} value={size} onChange={e => {changeSize(e.target.value)}}>
        <FormControlLabel className={classes.formlabel} disabled={!hasInventory(inventory, inCart, "S")} label="S" value="S" labelPlacement="top" control={<Radio color="primary" />} />
        <FormControlLabel className={classes.formlabel} disabled={!hasInventory(inventory, inCart, "M")} label="M" value="M" labelPlacement="top" control={<Radio color="primary" />} />
        <FormControlLabel className={classes.formlabel} disabled={!hasInventory(inventory, inCart, "L")} label="L" value="L" labelPlacement="top" control={<Radio color="primary" />} />
        <FormControlLabel className={classes.formlabel} disabled={!hasInventory(inventory, inCart, "XL")} label="XL" value="XL" labelPlacement="top" control={<Radio color="primary" />} />
    </RadioGroup>
);

export default withStyles(styles)(Size);