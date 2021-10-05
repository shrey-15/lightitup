import React from 'react'
import { Link } from 'react-router-dom'
import { Grid, Button } from '@mui/material'
import EmojiObjectsIcon from '@mui/icons-material/EmojiObjects'

const Navbar = () => {
    return (
        <nav className="bg-primary flex w-screen">
            <Grid container xs={12} direction="row" className="flex w-screen" >
                
                    <Grid container item xs={6} className="flex items-center justify-start pl-6">
                        <Button
                            startIcon={<EmojiObjectsIcon />}
                            style={{ color: "white" }}
                        >
                            Light It Up!
                        </Button>

                    </Grid>

                    <Grid container item xs={6} className="flex items-center justify-end pr-6">
                        <Button 
                            style={{ color: "white" }}
                        >
                            LOGOUT
                        </Button>

                    </Grid>
               
            </Grid>
        </nav>
    )
}

export default Navbar
