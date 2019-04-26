import _import from './_import';
export default [
  {
    path: '/',
    component: _import('workbench'),
    children: [
      {
        path: 'workbench/entry',
        component: _import('workbench/entry'),
        meta: { title: 'e安全数据看板' }
      }
    ],
  }
];
