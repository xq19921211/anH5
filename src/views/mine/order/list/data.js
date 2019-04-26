export default [
  {
    name: '待派单',
    icon: require('./img/my_pay.png'),
    url: '/order/?id=0',
  },
  {
    name: '待接单',
    icon: require('./img/my_service.png'),
    url: '/order/?id=1',
  },
  {
    name: '待验收',
    icon: require('./img/my_confirm.png'),
    url: '/order/?id=2',
  },
  {
    name: '待评价',
    icon: require('./img/my_refund.png'),
    url: '/order/?id=3',
  },
];
