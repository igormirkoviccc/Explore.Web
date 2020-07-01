import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button'
import AuthContext from "../context/Auth/AuthContext";
import { Redirect, Link } from "react-router-dom";
import ExploreIcon from '@material-ui/icons/Explore';
import GroupIcon from '@material-ui/icons/Group';
import {ListItemIcon} from "@material-ui/core"


const links = [
    {
        link: "/istrazivanja",
        Icon: ExploreIcon,
        text: "Istraživanja",
    },
    {
        link: "/korisnici",
        Icon: GroupIcon,
        text: "Korisnici",
    }
];


const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    appBar: {
        width: `100%`,
        zIndex: 10000000
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    toolbar: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing(3),
    },
}));

export default function DrawerIS(props) {
    const classes = useStyles();
    const {isAuth, setAuth} = AuthContext();
    const [getRedirect, setRedirect] = useState();


    if(getRedirect){
        return <Redirect push to={getRedirect} />;
    }

    const LogOut = () =>{
        setRedirect('/')
        setTimeout(() =>{
            setAuth(false)
        }, 100);
    }

    const MenuItem = ({ link: { link, Icon, text} }) => (
        <Link to={link}>
            <ListItem button>
                <ListItemIcon>
                    <Icon />
                </ListItemIcon>
                <ListItemText primary={text} />
            </ListItem>
        </Link>
    );


    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar>
                    <Typography variant="h6" noWrap>
                        Istraživanja
                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer
                className={classes.drawer}
                variant="permanent"
                classes={{
                    paper: classes.drawerPaper,
                }}
                anchor="left"
            >
                <div className={classes.toolbar} />
                <Divider />
                <List>
                    {links.map((link, index) => (
                        <MenuItem key={index} link={link}/>
                    ))}
                </List>
                <Button
                    variant="contained"
                    color="primary"
                    style={{width: '50%', margin: '0 auto' }}
                    onClick={LogOut}
                >
                    Log out
                </Button>
            </Drawer>
            <main className={classes.content}>
                <div className={classes.toolbar} />
                {props.children}
            </main>
        </div>
    );
}
