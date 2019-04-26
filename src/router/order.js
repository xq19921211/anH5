import _import from './_import';
export default [
  {
    path: '/',
    component: _import('new-page'),
    children: [
      {
        path: 'orderDetail',
        component: _import('order/detail'),
        meta: { title: '订单详情' },
      },
    ],
  },
  {
    path: '/',
    component: _import('index'),
    children: [
      {
        path: 'order',
        component: _import('order'),
        meta: { title: '订单' },
      }
    ],
  },
];
