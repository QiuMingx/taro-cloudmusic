import { ComponentClass } from "react";
import Taro, { Component, Config } from "@tarojs/taro";
import {
  View,
  Button,
  Text,
} from "@tarojs/components";
import { AtTabs, AtTabsPane } from 'taro-ui'
import { connect } from "@tarojs/redux";
import { add, minus, asyncAdd } from "../../actions/counter";
import Find from '../find/index'
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

type PageState = {
  bannerList: Array<{
    typeTitle: string,
    pic: string,
    targetId: number
  }>,
};

type IProps = PageStateProps & PageDispatchProps & PageOwnProps;

interface PlayListDetail {
  props: IProps;
}

@connect(
  ({ song }) => ({
    song: song,
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
    navigationBarTitleText: "网易云音乐"
  };

  constructor(props) {
    super(props)
    this.state = {
      current: 1
    }
  }
  handleClick(value) {
    this.setState({
      current: value,
    });
  }
  componentWillMount() {
  }

  componentWillReceiveProps(nextProps) {
    console.log(this.props, nextProps);
  }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  render() {
    const tabList = [{ title: '我的' }, { title: '发现' }, { title: '云村' },{ title: '视频' }];
    return <View className="index">

       <AtTabs className="index_tabs" current={this.state.current} tabList={tabList} onClick={this.handleClick.bind(this)}>
         <AtTabsPane current={this.state.current} index={0}>
           <View style="padding: 100px 50px;text-align: center;">我的页面-待开发...</View>
         </AtTabsPane>
         <AtTabsPane current={this.state.current} index={1}>
           <Find/>
         </AtTabsPane>
         <AtTabsPane current={this.state.current} index={2}>
           <View style="padding: 100px 50px;text-align: center;">云村-待开发...</View>
         </AtTabsPane>
         <AtTabsPane current={this.state.current} index={3}>
           <View style="padding: 100px 50px;text-align: center;">视频-待开发...</View>
         </AtTabsPane>
       </AtTabs>
     </View>;
  }
}

// #region 导出注意
//
// 经过上面的声明后需要将导出的 Taro.Component 子类修改为子类本身的 props 属性
// 这样在使用这个子类时 Ts 才不会提示缺少 JSX 类型参数错误
//
// #endregion

export default Index as ComponentClass<PageOwnProps, PageState>;
