import _import from './_import';

export default [
  {
    path: '/',
    component: _import('index'),
    children: [
      {
        path: 'home',
        component: _import('home'),
        meta: {title: '主页'},
      },
    ],
  },
];
