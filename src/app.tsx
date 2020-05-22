import Taro, { Component, Config } from '@tarojs/taro'
import { Provider } from '@tarojs/redux'

import Index from './pages/index'
// import App from '.pages/app'

import configStore from './store'

import './app.less'
import 'taro-ui/dist/style/index.scss'
import './assets/iconFont/icon.scss'
import './assets/iconFont/iconfont.scss'
import Intellect from './assets/images/tabBar/intellect.png'
import homeActive from './assets/images/tabBar/home-active.png'
import home from './assets/images/tabBar/home.png'
import user from './assets/images/tabBar/user.png'
import userActive from './assets/images/tabBar/user-active.png'
// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }

const store = configStore()

class App extends Component {

  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    pages: [
      'pages/index/index',
      'pages/playListDetail/index',
      'pages/songDetail/index',



    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#d43c33',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: 'white',
      // navigationStyle:"custom"
    },
    // tabBar: {
    //   color: '#666',
    //   selectedColor: '#ed6c00',
    //   backgroundColor: '#fafafa',
    //   borderStyle: 'black',
    //   // custom: true,
    //   list: [{
    //       pagePath: 'pages/index/index',
    //       iconPath: './assets/images/tabBar/home.png',
    //       selectedIconPath: './assets/images/tabBar/home-active.png',
    //       text: '主页'
    //     },
    //     {
    //       pagePath: 'pages/playListDetail/index',
    //       iconPath: './assets/images/tabBar/user.png',
    //       selectedIconPath: './assets/images/tabBar/user-active.png',
    //       text: '我的'
    //     }
    //   ]
    // },
    requiredBackgroundModes: ["audio"]
  }

  componentDidMount() { }

  componentDidShow() { }

  componentDidHide() { }

  componentDidCatchError() { }

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render() {
    return (
      <Provider store={store}>
        <Index />
      </Provider>
    )
  }
}

Taro.render(<App />, document.getElementById('app'))
