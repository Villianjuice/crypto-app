import React, { Suspense, lazy } from 'react'
import {ErrorBoundary} from 'react-error-boundary'
import {  LinearProgress } from '@mui/material'


import { ErrorFallback } from '../../composables'

const CoinsList = lazy(() => import('../../components/coinsList/CoinsList'))
const Banner = lazy(() => import('../../components/banner/Banner'))


const Home = () => {
  return (
    <div>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Suspense fallback={<LinearProgress />}>
          <Banner />
          <CoinsList />
        </Suspense>
      </ErrorBoundary>
      
    </div>
  )
}

export default Home