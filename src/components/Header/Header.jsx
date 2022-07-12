import { Grid, Hidden } from '@mui/material'
import React from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { compose } from 'redux'
import { getCurrentPage } from '../../redux/users-selector'

const Header = (props) => {
    return (
        <header>
            <Grid item md={12} sx={{ color: '#fff', fontSize: 20, background: 'grey', height: 60, background: '#607d9f', display: 'flex', alignItems: 'center', padding: 1 }}>
                <Hidden only={['md', 'lg', 'xl']}>

                    <NavLink to={"/users/" + props.currentPage} className={({ isActive }) => isActive ? 'active' : ""}>Users</NavLink>
                </Hidden>
            </Grid>
        </header>
    )
}

let mapStateToProps = (state) => ({
    currentPage: getCurrentPage(state),
})

export default compose(
    connect(mapStateToProps, null),
)(Header)

