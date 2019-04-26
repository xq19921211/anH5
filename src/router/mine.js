import _import from './_import';
export default [
  {
    path: '/',
    component: _import('index'),
    children: [
      {
        path: 'mine',
        component: _import('mine'),
        meta: {title: '我的'},
      },
      {
        path: 'question',
        component: _import('mine/list/question'),
        meta: {title: '常见问题'},
      },
      {
        path: 'protocol',
        component: _import('mine/list/protocol'),
        meta: {title: 'e安全服务协议'},
      },
      {
        path: 'rules',
        component: _import('mine/list/rules'),
        meta: {title: '查看覆盖规则'},
      },
      {
        path: 'settlement',
        component: _import('mine/list/settlement'),
        meta: {title: '结算记录'},
      },
    ],
  },
  {
    path: '/',
    component: _import('new-page'),
    children: [
      {
        path: 'settlementdetail',
        component: _import('mine/list/settlement/detail'),
        meta: {title: '结算记录详情'},
      },
    ],
  },
];
