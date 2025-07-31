import { lazy, Suspense } from 'react';
import { useSelector } from 'react-redux';
import { Outlet, Navigate, useRoutes } from 'react-router-dom';

import DashboardLayout from 'src/layouts/dashboard';

import PrivateRoute from 'src/components/PrivateRoute';

// Lazy-loaded components
export const IndexPage = lazy(() => import('src/pages/app'));
export const BlogPage = lazy(() => import('src/pages/blog'));
export const UserPage = lazy(() => import('src/pages/user'));
export const LoginPage = lazy(() => import('src/pages/login'));
export const ResultPage = lazy(() => import('src/pages/result'));
export const NoticePage = lazy(() => import('src/pages/notice'));
export const SliderPage = lazy(() => import('src/pages/slider'));
export const Page403 = lazy(() => import('src/pages/forbidden'));
export const WinningPage = lazy(() => import('src/pages/winning'));
export const SubAdminPage = lazy(() => import('src/pages/subadmin'));
export const ProductsPage = lazy(() => import('src/pages/products'));
export const GameNamePage = lazy(() => import('src/pages/game-name'));
export const Page404 = lazy(() => import('src/pages/page-not-found'));
export const UserQueryPage = lazy(() => import('src/pages/userquery'));
export const GameRatesPage = lazy(() => import('src/pages/game-rates'));
export const AppSettingsPage = lazy(() => import('src/pages/app-settings'));
export const GameNumbersPage = lazy(() => import('src/pages/game-numbers'));
export const NotificationPage = lazy(() => import('src/pages/notification'));
export const WinningReportPage = lazy(() => import('src/pages/winning-report'));
export const WithdrawReportPage = lazy(() => import('src/pages/withdraw-report'));
export const FundRequestPage = lazy(() => import('src/pages/wallet/fund-request'));
export const UserBitHistoryPage = lazy(() => import('src/pages/user-bit-history'));
export const AdminFundReportPage = lazy(() => import('src/pages/admin-fund-report'));
export const AllUserBitHistoryPage = lazy(() => import('src/pages/all-user-bit-history'));
export const WidthdrawRequestPage = lazy(() => import('src/pages/wallet/withdraw-request'));
export const CustomerSellsReportPage = lazy(() => import('src/pages/customer-sells-report'));

// ----------------------------------------------------------------------

export const StarlineResultPage = lazy(() => import('src/pages/starline/result'));
export const StarlineGameNamePage = lazy(() => import('src/pages/starline/game-name'));
export const StarlineGameRatesPage = lazy(() => import('src/pages/starline/game-rates'));
export const StarlineWinningReportPage = lazy(() => import('src/pages/starline/winning-report'));
export const StarlineUserBitHistoryPage = lazy(() => import('src/pages/starline/user-bit-history'));
export const StarlineCustomerSellsReportPage = lazy(
  () => import('src/pages/starline/customer-sells-report')
);

// ----------------------------------------------------------------------

export const GaliResultPage = lazy(() => import('src/pages/gali/result'));
export const GaliGameNamePage = lazy(() => import('src/pages/gali/game-name'));
export const GaliGameRatesPage = lazy(() => import('src/pages/gali/game-rates'));
export const GaliWinningReportPage = lazy(() => import('src/pages/gali/winning-report'));
export const GaliUserBitHistoryPage = lazy(() => import('src/pages/gali/user-bit-history'));
export const GaliCustomerSellsReportPage = lazy(
  () => import('src/pages/gali/customer-sells-report')
);

// ----------------------------------------------------------------------

export default function Router() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  // // console.log(isAuthenticated);

  const routes = useRoutes([
    {
      element: isAuthenticated ? (
        <DashboardLayout>
          <Suspense
            fallback={
              <div className="loading-container">
                <div className="container">
                  <div className="dot" />
                  <div className="traveler" />
                </div>
                <svg width="0" height="0" className="svg">
                  <defs>
                    <filter id="uib-jelly-triangle-ooze">
                      <feGaussianBlur in="SourceGraphic" stdDeviation="3.333" result="blur" />
                      <feColorMatrix
                        in="blur"
                        mode="matrix"
                        values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7"
                        result="ooze"
                      />
                      <feBlend in="SourceGraphic" in2="ooze" />
                    </filter>
                  </defs>
                </svg>
              </div>
            }
          >
            <Outlet />
          </Suspense>
        </DashboardLayout>
      ) : (
        <LoginPage />
      ),
      children: [
        { element: <IndexPage />, index: true },
        { path: 'result', element: <ResultPage /> },
        {
          path: 'report',
          children: [
            {
              path: 'admin-fund-report',
              element: (
                <PrivateRoute roles={['super_admin']}>
                  <AdminFundReportPage />
                </PrivateRoute>
              ),
            },
            {
              path: 'user-bit-history',
              element: (
                <PrivateRoute roles={['super_admin']}>
                  <UserBitHistoryPage />
                </PrivateRoute>
              ),
            },
            {
              path: 'customer-sell-report',
              element: (
                <PrivateRoute roles={['super_admin', 'sub_admin']}>
                  <CustomerSellsReportPage />
                </PrivateRoute>
              ),
            },
            {
              path: 'winning-report',
              element: (
                <PrivateRoute roles={['super_admin']}>
                  <WinningReportPage />
                </PrivateRoute>
              ),
            },
            {
              path: 'transfer-point-report',
              element: (
                <PrivateRoute roles={['super_admin']}>
                  <UserBitHistoryPage />
                </PrivateRoute>
              ),
            },
            {
              path: 'bid-win-report',
              element: (
                <PrivateRoute roles={['super_admin']}>
                  <UserBitHistoryPage />
                </PrivateRoute>
              ),
            },
            {
              path: 'withdraw-report',
              element: (
                <PrivateRoute roles={['super_admin']}>
                  <WithdrawReportPage />
                </PrivateRoute>
              ),
            },
            {
              path: 'auto-deposide-history',
              element: (
                <PrivateRoute roles={['super_admin']}>
                  <UserBitHistoryPage />
                </PrivateRoute>
              ),
            },
          ],
        },
        {
          path: 'starline',
          children: [
            {
              path: 'game-name',
              element: (
                <PrivateRoute roles={['super_admin']}>
                  <StarlineGameNamePage />
                </PrivateRoute>
              ),
            },
            {
              path: 'game-rates',
              element: (
                <PrivateRoute roles={['super_admin']}>
                  <StarlineGameRatesPage />
                </PrivateRoute>
              ),
            },
            {
              path: 'bid-history',
              element: <StarlineUserBitHistoryPage />,
            },
            {
              path: 'declare-result',
              element: <StarlineResultPage />,
            },
            {
              path: 'result-history',
              element: <UserBitHistoryPage />,
            },
            {
              path: 'starline-sell-report',
              element: <StarlineCustomerSellsReportPage />,
            },
            {
              path: 'starline-winning-report',
              element: <StarlineWinningReportPage />,
            },
            {
              path: 'starline-winning-prediction',
              element: <UserBitHistoryPage />,
            },
          ],
        },
        {
          path: 'gali',
          children: [
            {
              path: 'game-name',
              element: (
                <PrivateRoute roles={['super_admin']}>
                  <GaliGameNamePage />
                </PrivateRoute>
              ),
            },
            {
              path: 'game-rates',
              element: (
                <PrivateRoute roles={['super_admin']}>
                  <GaliGameRatesPage />
                </PrivateRoute>
              ),
            },
            {
              path: 'bid-history',
              element: <GaliUserBitHistoryPage />,
            },
            {
              path: 'declare-result',
              element: <GaliResultPage />,
            },
            {
              path: 'result-history',
              element: <UserBitHistoryPage />,
            },
            {
              path: 'gali-sell-report',
              element: <GaliCustomerSellsReportPage />,
            },
            {
              path: 'gali-winning-report',
              element: <GaliWinningReportPage />,
            },
            {
              path: 'gali-winning-prediction',
              element: <UserBitHistoryPage />,
            },
          ],
        },
        {
          path: 'user',
          children: [
            {
              path: 'all',
              element: <UserPage type="all" />,
            },
            {
              path: 'approved',
              element: <UserPage type="approved" />,
            },
            {
              path: 'unapproved',
              element: <UserPage type="unapproved" />,
            },
            {
              path: 'downloaded',
              element: <UserPage type="downloaded" />,
            },
          ],
        },
        {
          path: 'wallet',
          children: [
            {
              path: 'fund-request',
              element: (
                <PrivateRoute roles={['super_admin']}>
                  <FundRequestPage />
                </PrivateRoute>
              ),
            },
            {
              path: 'winthdraw-request',
              element: (
                <PrivateRoute roles={['super_admin']}>
                  <WidthdrawRequestPage />
                </PrivateRoute>
              ),
            },
            {
              path: 'user-wallet-fund',
              element: (
                <PrivateRoute roles={['super_admin']}>
                  <WidthdrawRequestPage />
                </PrivateRoute>
              ),
            },
            {
              path: 'bid-revart',
              element: <AdminFundReportPage />,
            },
          ],
        },
        {
          path: 'game',
          children: [
            {
              path: 'game-name',
              element: (
                <PrivateRoute roles={['super_admin']}>
                  <GameNamePage />
                </PrivateRoute>
              ),
            },
            {
              path: 'game-rates',
              element: (
                <PrivateRoute roles={['super_admin']}>
                  <GameRatesPage />
                </PrivateRoute>
              ),
            },
          ],
        },
        { path: 'all-bid-history', element: <AllUserBitHistoryPage /> },
        {
          path: 'game-number',
          element: (
            <PrivateRoute roles={['super_admin']}>
              <GameNumbersPage />
            </PrivateRoute>
          ),
        },
        {
          path: 'app',
          element: (
            <PrivateRoute roles={['super_admin']}>
              <AppSettingsPage />
            </PrivateRoute>
          ),
        },
        { path: 'notice', element: <NoticePage /> },
        { path: 'slider', element: <SliderPage /> },
        { path: 'notification', element: <NotificationPage /> },
        { path: 'winning-prediction', element: <WinningPage /> },
        { path: 'user-query', element: <UserQueryPage /> },
        {
          path: 'sub-admin',
          element: (
            <PrivateRoute roles={['super_admin']}>
              <SubAdminPage />
            </PrivateRoute>
          ),
        },
        { path: 'products', element: <ProductsPage /> },
        { path: 'blog', element: <BlogPage /> },
      ],
    },
    {
      path: '404',
      element: <Page404 />,
    },
    {
      path: '403',
      element: <Page403 />,
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
