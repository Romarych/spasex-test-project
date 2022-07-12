import { Button, Grid } from '@material-ui/core'
import React, { FC } from 'react'
import { useDispatch } from 'react-redux'
import { getCompanies, saveCompanies } from '../../../redux/company-reducer'
import { Dispatch } from 'redux'

export const Buttons: FC = () => {
  const dispatch = useDispatch<Dispatch<any>>()
  
  return <Grid item xs={3} style={{ padding: '10px 15px', textAlign: 'right' }}>
    <Button onClick={() => dispatch(getCompanies())} variant="contained" color="default" style={{ marginRight: 15 }} >Load</Button>
    <Button onClick={() => dispatch(saveCompanies())} variant="contained" color="default" >Save</Button>
  </Grid>
}

