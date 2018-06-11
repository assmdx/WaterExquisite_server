'use strict';

module.exports = appInfo => {
  return {
      logger:{
          dir:path.join(appInfo.root, 'logs'),
      },
      config:{
          keys:appInfo.name + '_MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDV9DYUpEdsEaXIAx0Mt/38at1b',
          middleware:[],
      },
      mongoose:{
          url:'mongodb://localhost:27017/WaterExquisite',
          options:{},
      }
  }
};
