import React from 'react';
import { RadioGroup, Radio, FormControlLabel, withStyles } from '@material-ui/core';

const styles = {
    formlabel: {
        margin: 0
    },
    radiogroup: {
        marginTop: 10
    }
};

const Size = ({ size, changeSize, classes }) => (
    <RadioGroup row className={classes.radiogroup} value={size} onChange={e => {changeSize(e.target.value)}}>
        <FormControlLabel className={classes.formlabel} label="S" value="small" labelPlacement="top" control={<Radio color="primary" />} />
        <FormControlLabel className={classes.formlabel} label="M" value="medium" labelPlacement="top" control={<Radio color="primary" />} />
        <FormControlLabel className={classes.formlabel} label="L" value="large" labelPlacement="top" control={<Radio color="primary" />} />
        <FormControlLabel className={classes.formlabel} label="XL" value="x-large" labelPlacement="top" control={<Radio color="primary" />} />
    </RadioGroup>
);

export default withStyles(styles)(Size);