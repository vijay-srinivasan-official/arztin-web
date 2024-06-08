import React from 'react';
import { Box, Typography, Paper, Avatar } from '@mui/material';
import { makeStyles } from '@mui/styles';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    card: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: theme.spacing(2),
        minWidth: 200,
        minHeight: 100,
    },
    avatar: {
        backgroundColor: theme.palette.primary.main,
        width: theme.spacing(7),
        height: theme.spacing(7),
        marginBottom: theme.spacing(1),
    },
    stats: {
        display: 'flex',
        flexDirection: 'column',
    },
    growth: {
        color: theme.palette.success.main,
    },
}));

const DashboardCard = ({ icon, label, value, growth, growthLabel, route }) => {
    const navigate = useNavigate();
    const classes = useStyles();

    const handleViewAll = async (e) => {
        // navigate({route});
    }

    return (
        <Paper className={classes.card}>
            <Avatar className={classes.avatar}>{icon}</Avatar>
            <Typography variant="subtitle1">{label}</Typography>
            <Typography variant="h5">{value}</Typography>
            <Box className={classes.stats}>
                <Typography variant="body2" className={classes.growth}>{growth}</Typography>
                <Typography variant="body2">{growthLabel}</Typography>
            </Box>
            <Button variant="primary" onClick={() => navigate(route)}>View all</Button>
        </Paper>
    );
};

export default DashboardCard;
