import { Grid } from '@material-ui/core'
import React, { FC } from 'react'
import { Routes, Route } from 'react-router-dom'
import { Company } from '../Company/Company'

export const Rotes: FC = () => {
    return <Grid item xs={9} >
        <Routes>
            <Route path={`/company-:id`} element={<Company />} />
        </Routes>
    </Grid>
}

