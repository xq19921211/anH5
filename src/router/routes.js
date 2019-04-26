import home from './home'; //主页
import cart from './cart'; //购物
import mine from './mine'; //个人中心
import order from './order';
import goods from './goods';
import _import from './_import';
//import workbench from './workbench';

export const routes = [
  {
    path: '/404',
    component: _import('404'),
    meta: {title: '404'},
  },
  ...home,
  ...mine,
  ...order,
  ...goods,
  ...cart,
  ...goods,
 // ...workbench
];

/**
 * @param {string} usertype Customer |  SupplierStaff | Operator
 */
export function getOtherRoutes(usertype) {
  if (usertype === 'Customer') {
    return [...home, ...cart];
  }
  return [];
}

export function getRedirect(usertype) {
  return usertype === 'Customer' ? '/home' : '/goodslist';
}
