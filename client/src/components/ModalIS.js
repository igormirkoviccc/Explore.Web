import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import {Button} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(2, 4, 3),
    },
    action: {
        marginTop: 20,
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-evenly',
    }
}));

export default function ModalIS({handleOpen, action}) {
    const classes = useStyles();
    const [open, setOpen] = useState(true);

    const closeAndSave = () => {
        handleOpen();
        action()
    }

    return (
        <div>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={open}
                onClose={handleOpen}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    <div className={classes.paper}>
                        Da li ste sigurni da želite da obrišete ?
                        <div className={classes.action}>
                            <Button
                                variant="contained"
                                color="secondary"
                                onClick={closeAndSave}
                            >
                                Da
                            </Button>

                            <Button
                                onClick={handleOpen}
                                variant="contained"
                                color="primary"
                            >
                                Ne
                            </Button>
                        </div>
                    </div>
                </Fade>
            </Modal>
        </div>
    );
}
