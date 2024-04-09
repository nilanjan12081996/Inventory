import React from 'react';
const Login = React.lazy(() => import('../pages/Auth/Login/Login'));
import InsideLayout from '../ui/layout/InsideLayout';
import OutsideLayout from '../ui/layout/OutsideLayout';
import EmployeeRegistration from '../pages/EmployeeRegistration/EmployeeRegistration.jsx';
import LineChartGraph from '../pages/ItemMaster/LineChartGraph.jsx';
import ViewList from '../pages/BomMaster/ViewList.jsx';

const Dashboard = React.lazy(() => import('../pages/Dashboard/Dashboard.jsx'));
const ForgotPassword = React.lazy(() =>
  import('../pages/Auth/ForgotPassword/ForgotPassword.jsx')
);
const BomMaster = React.lazy(() =>
  import('../pages/BomMaster/BomMaster.jsx')
);
const ItemMaster = React.lazy(() =>
  import('../pages/ItemMaster/ItemMaster.jsx')
);
const Settings = React.lazy(() => import('../pages/Settings/Settings.jsx'));

const allRoutes = [
  {
    path: '/',
    element: <OutsideLayout />,
    children: [
      { index: true, element: <Login /> },
      { path: 'login', element: <Login /> },
    ],
  },
  {
    path: '/forgot-password',
    element: <OutsideLayout />,
    children: [
      { index: true, element: <ForgotPassword /> },
      { path: 'forgot-password', element: <ForgotPassword /> },
    ],
  },
  {
    path: '/dashboard',
    element: <InsideLayout />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
    ],
  },
  {
    path: '/bom-master',
    element: <InsideLayout />,
    children: [
      {
        index: true,
        element: <BomMaster />,
      },
    ],
  },
  {
    path: '/view-bom-list',
    element: <InsideLayout />,
    children: [
      {
        index: true,
        element: <ViewList />,
      },
    ],
  },
  {
    path: '/item-master',
    element: <InsideLayout />,
    children: [
      {
        index: true,
        element: <ItemMaster />,
      },
    ],
  },
  {
    path: '/line-chart-graph',
    element: <InsideLayout />,
    children: [
      {
        index: true,
        element: <LineChartGraph />,
      },
    ],
  },
  {
    path: '/employee-registration',
    element: <InsideLayout />,
    children: [
      {
        index: true,
        element: <EmployeeRegistration />,
      },
    ],
  },
  {
    path: '/settings',
    element: <InsideLayout />,
    children: [
      {
        index: true,
        element: <Settings />,
      },
    ],
  },
  {
    path: '*',
    element: 'Outside page not found',
  },
];
export default allRoutes;
