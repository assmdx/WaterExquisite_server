'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.post('/WaterExquisite_api/index/index', controller.api.good.index);
  router.post('/WaterExquisite_api/goods/detail', controller.api.good.detail);
  router.post('/WaterExquisite_api/order/list', controller.api.order.list);
  router.post('/WaterExquisite_api/collect/list', controller.api.collect.list);
  router.post('/WaterExquisite_api/collect/addordelete', controller.api.collect.addordelete);
  router.post('/WaterExquisite_api/auth/loginByWeixin', controller.api.user.login);

  //admin
  router.post('/WaterExquisite_manage/admin/goods/index', controller.admin.good.index);
  router.post('/WaterExquisite_manage/admin/goods/delete', controller.admin.good.delete);
  router.post('/WaterExquisite_manage/admin/goods/add', controller.admin.good.add);
};
