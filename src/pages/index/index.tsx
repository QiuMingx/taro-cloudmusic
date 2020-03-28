import { ComponentClass } from "react";
import Taro, { Component, Config } from "@tarojs/taro";
import {
  View,
  Button,
  Text,
  Image,
  Swiper,
  SwiperItem
} from "@tarojs/components";
import { connect } from "@tarojs/redux";

import { add, minus, asyncAdd } from "../../actions/counter";

import "./index.less";

// #region 书写注意
//
// 目前 typescript 版本还无法在装饰器模式下将 Props 注入到 Taro.Component 中的 props 属性
// 需要显示声明 connect 的参数类型并通过 interface 的方式指定 Taro.Component 子类的 props
// 这样才能完成类型检查和 IDE 的自动提示
// 使用函数模式则无此限制
// ref: https://github.com/DefinitelyTyped/DefinitelyTyped/issues/20796
//
// #endregion

type PageStateProps = {
  counter: {
    num: number;
  };
};

type PageDispatchProps = {
  add: () => void;
  dec: () => void;
  asyncAdd: () => any;
};

type PageOwnProps = {};

type PageState = {};

type IProps = PageStateProps & PageDispatchProps & PageOwnProps;

interface Index {
  props: IProps;
}

@connect(
  ({ counter }) => ({
    counter
  }),
  dispatch => ({
    add() {
      dispatch(add());
    },
    dec() {
      dispatch(minus());
    },
    asyncAdd() {
      dispatch(asyncAdd());
    }
  })
)
class Index extends Component {
  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    navigationBarTitleText: "首页"
  };

  constructor (props) {
    super(props)
    this.state = {
      current: 0,
      showLoading: true,
      bannerList: [
        {
            "imageUrl": "http://p1.music.126.net/kFZwGAEN2QVBBaA7j_JaEA==/109951164822589998.jpg",
            "targetId": 86670457,
            "adid": null,
            "targetType": 10,
            "titleColor": "red",
            "typeTitle": "独家",
            "url": null,
            "exclusive": false,
            "monitorImpress": null,
            "monitorClick": null,
            "monitorType": null,
            "monitorImpressList": null,
            "monitorClickList": null,
            "monitorBlackList": null,
            "extMonitor": null,
            "extMonitorInfo": null,
            "adSource": null,
            "adLocation": null,
            "adDispatchJson": null,
            "encodeId": "86670457",
            "program": null,
            "event": null,
            "video": null,
            "song": null,
            "scm": "1.music-homepage.homepage_banner_force.banner.651355.176706422.null"
        },
        {
            "imageUrl": "http://p1.music.126.net/vwVck1nqm3GhIQQTE6RMZg==/109951164826113808.jpg",
            "targetId": 1432256576,
            "adid": null,
            "targetType": 1,
            "titleColor": "red",
            "typeTitle": "独家",
            "url": null,
            "exclusive": false,
            "monitorImpress": null,
            "monitorClick": null,
            "monitorType": null,
            "monitorImpressList": null,
            "monitorClickList": null,
            "monitorBlackList": null,
            "extMonitor": null,
            "extMonitorInfo": null,
            "adSource": null,
            "adLocation": null,
            "adDispatchJson": null,
            "encodeId": "1432256576",
            "program": null,
            "event": null,
            "video": null,
            "song": null,
            "scm": "1.music-homepage.homepage_banner_force.banner.656372.-409939709.null"
        },
        {
            "imageUrl": "http://p1.music.126.net/sMBDF5HEZBqF132oW4gt4Q==/109951164826015569.jpg",
            "targetId": 1431866827,
            "adid": null,
            "targetType": 1,
            "titleColor": "red",
            "typeTitle": "独家",
            "url": null,
            "exclusive": false,
            "monitorImpress": null,
            "monitorClick": null,
            "monitorType": null,
            "monitorImpressList": null,
            "monitorClickList": null,
            "monitorBlackList": null,
            "extMonitor": null,
            "extMonitorInfo": null,
            "adSource": null,
            "adLocation": null,
            "adDispatchJson": null,
            "encodeId": "1431866827",
            "program": null,
            "event": null,
            "video": null,
            "song": null,
            "scm": "1.music-homepage.homepage_banner_force.banner.650352.176799758.null"
        },
        {
            "imageUrl": "http://p1.music.126.net/TLvyLNCDGS2ha8wFrMNH0Q==/109951164828756945.jpg",
            "targetId": 1432772691,
            "adid": null,
            "targetType": 1,
            "titleColor": "red",
            "typeTitle": "独家",
            "url": null,
            "exclusive": false,
            "monitorImpress": null,
            "monitorClick": null,
            "monitorType": null,
            "monitorImpressList": null,
            "monitorClickList": null,
            "monitorBlackList": null,
            "extMonitor": null,
            "extMonitorInfo": null,
            "adSource": null,
            "adLocation": null,
            "adDispatchJson": null,
            "encodeId": "1432772691",
            "program": null,
            "event": null,
            "video": null,
            "song": null,
            "scm": "1.music-homepage.homepage_banner_force.banner.652359.176948624.null"
        },
        {
            "imageUrl": "http://p1.music.126.net/EPOPT-6hmGziyahe6_Q-lQ==/109951164828735989.jpg",
            "targetId": 1432959007,
            "adid": null,
            "targetType": 1,
            "titleColor": "red",
            "typeTitle": "独家",
            "url": null,
            "exclusive": false,
            "monitorImpress": null,
            "monitorClick": null,
            "monitorType": null,
            "monitorImpressList": null,
            "monitorClickList": null,
            "monitorBlackList": null,
            "extMonitor": null,
            "extMonitorInfo": null,
            "adSource": null,
            "adLocation": null,
            "adDispatchJson": null,
            "encodeId": "1432959007",
            "program": null,
            "event": null,
            "video": null,
            "song": null,
            "scm": "1.music-homepage.homepage_banner_force.banner.657370.176860244.null"
        },
        {
            "imageUrl": "http://p1.music.126.net/jor7JLklkqbvCPy9kEu6Fw==/109951164828728913.jpg",
            "targetId": 86712363,
            "adid": null,
            "targetType": 10,
            "titleColor": "red",
            "typeTitle": "独家",
            "url": null,
            "exclusive": false,
            "monitorImpress": null,
            "monitorClick": null,
            "monitorType": null,
            "monitorImpressList": null,
            "monitorClickList": null,
            "monitorBlackList": null,
            "extMonitor": null,
            "extMonitorInfo": null,
            "adSource": null,
            "adLocation": null,
            "adDispatchJson": null,
            "encodeId": "86712363",
            "program": null,
            "event": null,
            "video": null,
            "song": null,
            "scm": "1.music-homepage.homepage_banner_force.banner.653400.-409935031.null"
        },
        {
            "imageUrl": "http://p1.music.126.net/1qzbj-e60lom9hzzW_tKEQ==/109951164828753699.jpg",
            "targetId": 1403215687,
            "adid": null,
            "targetType": 1,
            "titleColor": "red",
            "typeTitle": "新歌首发",
            "url": null,
            "exclusive": false,
            "monitorImpress": null,
            "monitorClick": null,
            "monitorType": null,
            "monitorImpressList": null,
            "monitorClickList": null,
            "monitorBlackList": null,
            "extMonitor": null,
            "extMonitorInfo": null,
            "adSource": null,
            "adLocation": null,
            "adDispatchJson": null,
            "encodeId": "1403215687",
            "program": null,
            "event": null,
            "video": null,
            "song": null,
            "scm": "1.music-homepage.homepage_banner_force.banner.652357.176793750.null"
        },
        {
            "imageUrl": "http://p1.music.126.net/l_N0QhPtycQO0UI1D8nnig==/109951164828699216.jpg",
            "targetId": 10921857,
            "adid": null,
            "targetType": 1004,
            "titleColor": "red",
            "typeTitle": "独家专访",
            "url": null,
            "exclusive": false,
            "monitorImpress": null,
            "monitorClick": null,
            "monitorType": null,
            "monitorImpressList": null,
            "monitorClickList": null,
            "monitorBlackList": null,
            "extMonitor": null,
            "extMonitorInfo": null,
            "adSource": null,
            "adLocation": null,
            "adDispatchJson": null,
            "encodeId": "10921857",
            "program": null,
            "event": null,
            "video": null,
            "song": null,
            "scm": "1.music-homepage.homepage_banner_force.banner.653398.176942018.null"
        }
    ],
      searchValue: ''
    }
  }
  componentWillReceiveProps(nextProps) {
    console.log(this.props, nextProps);
  }

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  render() {
    const {bannerList} = this.state
    return (
      <View className="index">
        <Swiper
         className='test-h'
         indicatorColor='#999'
         indicatorActiveColor='#333'
         circular
         indicatorDots
         autoplay
        >
         {
            bannerList.map((item) => 
              <SwiperItem key={item.targetId}>
                <Image src={item.imageUrl} className='img'/>
              </SwiperItem>
            )
        }
        </Swiper>
      </View>
    );
  }
}

// #region 导出注意
//
// 经过上面的声明后需要将导出的 Taro.Component 子类修改为子类本身的 props 属性
// 这样在使用这个子类时 Ts 才不会提示缺少 JSX 类型参数错误
//
// #endregion

export default Index as ComponentClass<PageOwnProps, PageState>;
