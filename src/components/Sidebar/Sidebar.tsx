import { Grid } from '@material-ui/core'
import React, { FC, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { getCompaniesStorage } from '../../redux/company-reducer'
import { getCompaniesSelector } from '../../redux/company-selector'
import { Dispatch } from 'redux'

export const Sidebar: FC = () => {
  const companies = useSelector(getCompaniesSelector)
  const dispatch = useDispatch<Dispatch<any>>()

  useEffect(() => {
    dispatch(getCompaniesStorage())
  }, [])

  return <Grid item xs={3} >
    <nav >
      <div
        style={{
          padding: 20,
          height: 'calc(100vh - 100px)',
          overflow: 'auto',
          borderRight: '3px solid #000'
        }}
      >
        {companies.map(company =>
          <div key={company.id}>
            <NavLink to={`/company-${company.name.replace(/\s+/g, '-').toLowerCase()}`}>
              {company.name}
            </NavLink>
          </div>)}
      </div>
    </nav>
  </Grid>
}

