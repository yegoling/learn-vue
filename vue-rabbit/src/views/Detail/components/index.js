import ImageView from '@/views/Detail/components/ImageView/index.vue'
import XtsSku from '@/views/Detail/components/XtsSku/index.vue'

export const componentPlugin = {
  install(app) {
    // app.component('组件名字'，组件配置对象)
    app.component('XtxImageView', ImageView)
    app.component('XtxSku', XtsSku)
  }
}
