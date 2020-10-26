import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import { useHistory, useLocation } from 'react-router-dom';

export default function Container(){
    const history = useHistory();
    return( 
        <AppBar>
            <Toolbar>
                <Button color="inherit" onClick={() => history.push("/")}>eDRV</Button>
            </Toolbar>
        </AppBar>
    )
}