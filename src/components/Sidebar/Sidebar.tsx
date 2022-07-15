import { Grid } from '@material-ui/core'
import React, { FC, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { getCompaniesStorage } from '../../redux/company-reducer'
import { getCompaniesSelector } from '../../redux/company-selector'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'

export const Sidebar: FC = () => {
  const companies = useAppSelector(getCompaniesSelector)
  const dispatch = useAppDispatch()

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

