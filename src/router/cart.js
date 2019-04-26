import _import from './_import';

export default [
  {
    path: '/',
    component: _import('index'),
    children: [
      {
        path: 'cart',
        component: _import('cart'),
        meta: {title: '购物车'},
      },
    ],
  },
];
