import React, { lazy } from 'react'
import { Router, Redirect, Route, Switch } from 'react-router-dom'
import { ResetCSS } from 'cswap-uikit'
import BigNumber from 'bignumber.js'
import useEagerConnect from 'hooks/useEagerConnect'
import { usePollBlockNumber } from 'state/block/hooks'
import { usePollCoreFarmData } from 'state/farms/hooks'
import { useFetchProfile } from 'state/profile/hooks'
import { DatePickerPortal } from 'components/DatePicker'
import { isBlindMode } from 'utils'
import GlobalStyle from './style/Global'
import Menu from './components/Menu'
import SuspenseWithChunkError from './components/SuspenseWithChunkError'
import { ToastListener } from './contexts/ToastsContext'
import PageLoader from './components/Loader/PageLoader'
import EasterEgg from './components/EasterEgg'
import ScrollToTop from './components/ScrollToTop'
import history from './routerHistory'
// Views included in the main bundle
import Pools from './views/Pools'
import Swap from './views/Swap'
import Dashboard from './views/Dashboard'
import {
  RedirectDuplicateTokenIds,
  RedirectOldAddLiquidityPathStructure,
  RedirectToAddLiquidity,
} from './views/AddLiquidity/redirects'
import RedirectOldRemoveLiquidityPathStructure from './views/RemoveLiquidity/redirects'
import { RedirectPathToSwapOnly, RedirectToSwap } from './views/Swap/redirects'
import GlobalCheckClaimStatus from './views/Collectibles/components/GlobalCheckClaimStatus'

// Route-based code splitting
// Only pool is included in the main bundle because of it's the most visited page
const Home = lazy(() => import('./views/Home'))
const Farms = lazy(() => import('./views/Farms'))
// const FarmAuction = lazy(() => import('./views/FarmAuction'))
// const Lottery = lazy(() => import('./views/Lottery'))
// const Ifos = lazy(() => import('./views/Ifos'))
const NotFound = lazy(() => import('./views/NotFound'))
// const Collectibles = lazy(() => import('./views/Collectibles'))
// const Teams = lazy(() => import('./views/Teams'))
// const Team = lazy(() => import('./views/Teams/Team'))
// const Profile = lazy(() => import('./views/Profile'))
// const TradingCompetition = lazy(() => import('./views/TradingCompetition'))
// const Predictions = lazy(() => import('./views/Predictions'))
// const PredictionsLeaderboard = lazy(() => import('./views/Predictions/Leaderboard'))
// const Voting = lazy(() => import('./views/Voting'))
// const Proposal = lazy(() => import('./views/Voting/Proposal'))
// const CreateProposal = lazy(() => import('./views/Voting/CreateProposal'))
const AddLiquidity = lazy(() => import('./views/AddLiquidity'))
const Liquidity = lazy(() => import('./views/Pool'))
const PoolFinder = lazy(() => import('./views/PoolFinder'))
const RemoveLiquidity = lazy(() => import('./views/RemoveLiquidity'))
const Info = lazy(() => import('./views/Info'))

// This config is required for number formatting
BigNumber.config({
  EXPONENTIAL_AT: 1000,
  DECIMAL_PLACES: 80,
})

const App: React.FC = () => {
  usePollBlockNumber()
  useEagerConnect()
  // useFetchProfile()
  // usePollCoreFarmData()

  return (
    <Router history={history}>
      <ScrollToTop>
        <ResetCSS />
        <GlobalStyle />
        {/* <GlobalCheckClaimStatus excludeLocations={['/collectibles']} /> */}
        <Menu>
          <SuspenseWithChunkError fallback={<PageLoader />}>
            <Switch>
              <Route path="/" exact>
                <Home />
              </Route>
              {/* <Route exact path="/farms/auction">
                <FarmAuction />
              </Route> */}
              <Route path="/farms">
                <Farms />
              </Route>
              <Route path="/mines">
                <Pools />
              </Route>
              <Route path="/dashboard">
                <Dashboard />
              </Route>
              {/* <Route path="/lottery">
                <Lottery />
              </Route>
              <Route path="/ifo">
                <Ifos />
              </Route>
              <Route path="/collectibles">
                <Collectibles />
              </Route>
              <Route exact path="/teams">
                <Teams />
              </Route>
              <Route path="/teams/:id">
                <Team />
              </Route>
              <Route path="/profile">
                <Profile />
              </Route>
              <Route path="/competition">
                <TradingCompetition />
              </Route>
              <Route exact path="/prediction">
                <Predictions />
              </Route>
              <Route path="/prediction/leaderboard">
                <PredictionsLeaderboard />
              </Route>
              <Route exact path="/voting">
                <Voting />
              </Route>
              <Route exact path="/voting/proposal/create">
                <CreateProposal />
              </Route>
              <Route path="/voting/proposal/:id">
                <Proposal />
              </Route> */}
              {/* Info pages */}
              {!isBlindMode() && <Route path="/info">
                <Info />
              </Route>}

              {/* Using this format because these components use routes injected props. We need to rework them with hooks */}
              <Route exact strict path="/swap" component={Swap} />
              <Route exact strict path="/swap/:outputCurrency" component={RedirectToSwap} />
              <Route exact strict path="/send" component={RedirectPathToSwapOnly} />
              <Route exact strict path="/find" component={PoolFinder} />
              <Route exact strict path="/liquidity" component={Liquidity} />
              <Route exact strict path="/create" component={RedirectToAddLiquidity} />
              <Route exact path="/add" component={AddLiquidity} />
              <Route exact path="/add/:currencyIdA" component={RedirectOldAddLiquidityPathStructure} />
              <Route exact path="/add/:currencyIdA/:currencyIdB" component={RedirectDuplicateTokenIds} />
              <Route exact path="/create" component={AddLiquidity} />
              <Route exact path="/create/:currencyIdA" component={RedirectOldAddLiquidityPathStructure} />
              <Route exact path="/create/:currencyIdA/:currencyIdB" component={RedirectDuplicateTokenIds} />
              <Route exact strict path="/remove/:tokens" component={RedirectOldRemoveLiquidityPathStructure} />
              <Route exact strict path="/remove/:currencyIdA/:currencyIdB" component={RemoveLiquidity} />

              {/* Redirect */}
              <Route path="/pool">
                <Redirect to="/liquidity" />
              </Route>
              <Route path="/staking">
                <Redirect to="/mines" />
              </Route>
              <Route path="/syrup">
                <Redirect to="/mines" />
              </Route>
              {/* <Route path="/nft">
                <Redirect to="/collectibles" />
              </Route> */}

              {/* 404 */}
              <Route component={NotFound} />
            </Switch>
          </SuspenseWithChunkError>
        </Menu>
        <EasterEgg iterations={2} />
        <ToastListener />
        <DatePickerPortal />
      </ScrollToTop>
    </Router>
  )
}

export default React.memo(App)