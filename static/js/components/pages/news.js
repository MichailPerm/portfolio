import React from 'react';
import { Markup } from 'interweave';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';



const News = (props) => {
    const { News, classes } = props;
    return (
        <div>
            <Grid container className={classes.container} spacing={16}>
                <Grid item xs={6}>
                    <Paper className={classes.banner} elevation={2}>
                        <Typography component="article">{News.length == 0 ? '' : 
                            <Markup content={News[0].text.substring(0, 30)}/>}...</Typography>
                    </Paper>
                </Grid>
                <Grid item xs={6}>
                    <Paper className={classes.banner} elevation={2}>
                        <Typography component="article">{News.length == 0 ? '' : 
                            <Markup content={News[Math.floor(Math.random() * (News.length))].text.substring(0, 30)}/>}...</Typography>
                    </Paper>
                </Grid>
                {News.map((newsElement) =>
                    <Grid item xs={12}>
                        <Paper className={classes.paper} elevation={2} key={newsElement.id}>
                            <Typography variant="h5" component="h4">{newsElement.title}</Typography>
                            <Typography component="article"><Markup content={newsElement.text}/></Typography>
                            <Typography component="p" color="textSecondary">{newsElement.author}, {newsElement.date}</Typography>
                        </Paper>
                    </Grid>
                )}
            </Grid>
        </div>
    );
};

export default News;