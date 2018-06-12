'use strict';
const path = require('path');
module.exports = appInfo => {
  return {
      keys:'R5$Gfi6gxGU$735ROpYMOTu&VJFy^IEaobmdhx4hXN^Yw7vJK8C5Htt5m6Wo5Be79CaTzf1^8XduThQWr!!09B#zGcwHmgC049S',
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
