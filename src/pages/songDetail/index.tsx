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
import { AtTabBar, AtSearchBar, AtIcon } from 'taro-ui'
import { connect } from "@tarojs/redux";

import { add, minus, asyncAdd } from "../../actions/counter";

import "./index.less";
import topImage from '../../assets/images/aag.png'


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

type PageState = {
  bannerList: Array<{
    typeTitle: string,
    pic: string,
    targetId: number
  }>,
};

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
class Page extends Component {
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
      searchValue:'',
      currentSongInfo:{
          "name": "达拉崩吧 (Live)",
          "id": 1434062381,
          "pst": 0,
          "t": 0,
          "ar": [
              {
                  "id": 1030001,
                  "name": "周深",
                  "tns": [],
                  "alias": []
              }
          ],
          "alia": [],
          "pop": 100,
          "st": 0,
          "rt": "",
          "fee": 8,
          "v": 1,
          "crbt": null,
          "cf": "",
          "al": {
              "id": 86840264,
              "name": "歌手·当打之年 第8期",
              "picUrl": "http://p1.music.126.net/P11c_X9qdAMT7yXYIMahQw==/109951164840856331.jpg",
              "tns": [],
              "pic_str": "109951164840856331",
              "pic": 109951164840856340
          },
          "dt": 245640,
          "h": {
              "br": 320000,
              "fid": 0,
              "size": 9827565,
              "vd": -64022
          },
          "m": {
              "br": 192000,
              "fid": 0,
              "size": 5896557,
              "vd": -61489
          },
          "l": {
              "br": 128000,
              "fid": 0,
              "size": 3931053,
              "vd": -59815
          },
          "a": null,
          "cd": "01",
          "no": 6,
          "rtUrl": null,
          "ftype": 0,
          "rtUrls": [],
          "djId": 0,
          "copyright": 0,
          "s_id": 0,
          "mark": 8192,
          "rtype": 0,
          "rurl": null,
          "mst": 9,
          "cp": 1416682,
          "mv": 0,
          "publishTime": 0,
          "alg": "alg_featured"
      },

    }
  }

  componentWillReceiveProps(nextProps) {
    console.log(this.props, nextProps);
  }

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  render() {
    const {currentSongInfo} = this.state
    return (
      <View className='song_container'>
        <Image
          className='song__bg'
          src={currentSongInfo.al.picUrl}
        />
        <View className='song__music'>
          <View className='song__music__main'>
            <Image
            className='song__music__main__needle'
            src={topImage}
            />
          </View>
        </View>
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

export default Page as ComponentClass<PageOwnProps, PageState>;
