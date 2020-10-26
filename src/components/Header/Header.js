import React from 'react';
import {Link} from 'react-router-dom';

import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import Paper from "@material-ui/core/Paper";
import HomeIcon from '@material-ui/icons/Home';
import FavoriteIcon from '@material-ui/icons/Favorite';
import InfoIcon from '@material-ui/icons/Info';

function Header() {

    const [page, setPage] = React.useState('home');
    const handleChange = (event, newPage) => {
        setPage(newPage);
    };

    return (
        <Paper elevation={2}>
            <BottomNavigation value={page} onChange={handleChange}>
                <BottomNavigationAction
                    component={Link}
                    to='/'
                    label="Home"
                    value="home"
                    icon={<HomeIcon/>}
                />
                <BottomNavigationAction
                    component={Link}
                    to='/favourites'
                    label="Favorites"
                    value="favorites"
                    icon={<FavoriteIcon/>}/>
                <BottomNavigationAction
                    component={Link}
                    to='/about'
                    label="About"
                    value="about"
                    icon={<InfoIcon/>}/>
            </BottomNavigation>
        </Paper>
    )
}

export default Header;