import _import from './_import';
export default [
  {
    path: '/',
    // component: _import('new-page'),
    component: _import('index'),
    children: [
      {
        path: 'goodslist',
        component: _import('goods-list'),
        meta: {title: '商品列表'},
      },
      {
        path: 'goodsdetails',
        component: _import('goods-details'),
        meta: {title: '商品详情'},
      },
    ],
  },
];
