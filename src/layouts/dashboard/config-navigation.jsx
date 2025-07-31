import SvgColor from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const navConfig = [
  {
    title: 'dashboard',
    path: '/',
    icon: icon('ic_analytics'),
  },
  {
    title: 'Main Market',
    path: '#',
    icon: icon('ic_task'),
    roles: ['super_admin', 'sub_admin'],
    children: [
      {
        title: 'game name',
        path: '/game/game-name',
        roles: ['super_admin'],
      },
      {
        title: 'game rates',
        path: '/game/game-rates',
        roles: ['super_admin'],
      },
      {
        title: 'declare result',
        path: '/result',
        roles: ['super_admin', 'sub_admin'],
      },
      {
        title: 'admin fund report',
        path: '/report/admin-fund-report',
        roles: ['super_admin', 'sub_admin'],
      },
      {
        title: 'user bid history',
        path: '/report/user-bit-history',
        roles: ['super_admin', 'sub_admin'],
      },
      {
        title: 'customer sell report',
        path: '/report/customer-sell-report',
        roles: ['super_admin', 'sub_admin'],
      },
      {
        title: 'winning report',
        path: '/report/winning-report',
        roles: ['super_admin', 'sub_admin'],
      },
      // {
      //   title: 'withdraw report',
      //   path: '/report/withdraw-report',
      // },
      // {
      //   title: 'auto deposit history',
      //   path: '/report/auto-deposide-history',
      // },
    ],
  },
  {
    title: 'starline setting',
    path: '#',
    icon: icon('ic_task'),
    roles: ['super_admin', 'sub_admin'],
    children: [
      {
        title: 'game name',
        path: '/starline/game-name',
        roles: ['super_admin'],
      },
      {
        title: 'game rates',
        path: '/starline/game-rates',
        roles: ['super_admin'],
      },
      {
        title: 'bid history',
        path: '/starline/bid-history',
        roles: ['super_admin', 'sub_admin'],
      },
      {
        title: 'declare result',
        path: '/starline/declare-result',
        roles: ['super_admin', 'sub_admin'],
      },
      {
        title: 'starline sell report',
        path: '/starline/starline-sell-report',
        roles: ['super_admin', 'sub_admin'],
      },
      {
        title: 'starline winning report',
        path: '/starline/starline-winning-report',
        roles: ['super_admin', 'sub_admin'],
      },
    ],
  },
  {
    title: 'gali-di-sawar',
    path: '#',
    icon: icon('ic_task'),
    roles: ['super_admin', 'sub_admin'],
    children: [
      {
        title: 'game name',
        path: '/gali/game-name',
        roles: ['super_admin'],
      },
      {
        title: 'game rates',
        path: '/gali/game-rates',
        roles: ['super_admin'],
      },
      {
        title: 'bid history',
        path: '/gali/bid-history',
        roles: ['super_admin', 'sub_admin'],
      },
      {
        title: 'declare result',
        path: '/gali/declare-result',
        roles: ['super_admin', 'sub_admin'],
      },
      {
        title: 'gali-di-sawar sell report',
        path: '/gali/gali-sell-report',
        roles: ['super_admin', 'sub_admin'],
      },
      {
        title: 'gali-di-sawar winning report',
        path: '/gali/gali-winning-report',
        roles: ['super_admin', 'sub_admin'],
      },
    ],
  },
  // {
  //   title: 'winnging prediction',
  //   path: '/winning-prediction',
  //   icon: icon('ic_winning'),
  // },
  {
    title: 'wallet',
    path: '#',
    icon: icon('ic_wallet'),
    roles: ['super_admin'],
    children: [
      {
        title: 'fund request',
        path: '/wallet/fund-request',
        roles: ['super_admin'],
      },
      {
        title: 'winthdraw request',
        path: '/wallet/winthdraw-request',
        roles: ['super_admin'],
      },
      // {
      //   title: 'add user wallet fund',
      //   path: '/wallet/user-wallet-fund',
      // },
      // {
      //   title: 'bid revart',
      //   path: '/wallet/bid-revart',
      // },
    ],
  },
  {
    title: 'user management',
    path: '/user/all',
    icon: icon('ic_user'),
    roles: ['super_admin', 'sub_admin'],
  },
  {
    title: 'all bid history',
    path: '/all-bid-history',
    icon: icon('ic_bid'),
    roles: ['super_admin', 'sub_admin'],
  },
  // {
  //   title: 'game',
  //   path: '#',
  //   icon: icon('ic_game'),
  //   children: [
  //     {
  //       title: 'game name',
  //       path: '/game/game-name',
  //     },
  //     {
  //       title: 'game rates',
  //       path: '/game/game-rates',
  //     },
  //   ],
  // },
  // {
  //   title: 'game & numbers',
  //   path: '/game-number',
  //   icon: icon('ic_game'),
  // },
  {
    title: 'app settings',
    path: '/app',
    icon: icon('ic_app'),
    roles: ['super_admin'],
  },
  {
    title: 'popup management',
    path: '/notice',
    icon: icon('ic_notice'),
    roles: ['super_admin'],
  },
  {
    title: 'slider management',
    path: '/slider',
    icon: icon('ic_slider'),
    roles: ['super_admin'],
  },
  {
    title: 'notification management',
    path: '/notification',
    icon: icon('ic_notification'),
    roles: ['super_admin', 'sub_admin'],
  },
  {
    title: 'user query',
    path: '/user-query',
    icon: icon('ic_user_query'),
    roles: ['super_admin', 'sub_admin'],
  },
  // {
  //   title: 'sub admin',
  //   path: '/sub-admin',
  //   icon: icon('ic_sub_admin'),
  //   roles: ['super_admin'],
  // },

  // {
  //   title: 'product',
  //   path: '/products',
  //   icon: icon('ic_cart'),
  // },
  // {
  //   title: 'blog',
  //   path: '/blog',
  //   icon: icon('ic_blog'),
  // },
  // {
  //   title: 'login',
  //   path: '/login',
  //   icon: icon('ic_lock'),
  // },
  // {
  //   title: 'Not found',
  //   path: '/404',
  //   icon: icon('ic_disabled'),
  // },
];

export default navConfig;
