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
import { AtTabs, AtTabsPane, AtSearchBar, AtIcon } from 'taro-ui'
import { connect } from "@tarojs/redux";
import PlayList from '../../components/PlayList'
import API from '../../services/api'
import { add, minus, asyncAdd } from "../../actions/counter";
import { getRecommendPlayList } from "../../actions/song";
import PlayListDetail from '../playListDetail/index.tsx'

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
  recommendPlayList: Array<{
    id: number,
    name: string,
    picUrl: string,
    playCount: number
  }>;
};

type PageDispatchProps = {
  add: () => void;
  dec: () => void;
  asyncAdd: () => any;
  getRecommendPlayList: () => any;
};

type PageOwnProps = {};

type PageState = {
  current: number,
  showLoading: boolean,
  bannerList: Array<{
    typeTitle: string,
    pic: string,
    targetId: number
  }>,
  searchValue: string
};

type IProps = PageStateProps & PageDispatchProps & PageOwnProps;

interface Index {
  props: IProps;
}

@connect(
  ({ song }) => ({
    song: song,
    recommendPlayList: song.recommendPlayList
  }),
  dispatch => ({
    getRecommendPlayList () {
      dispatch(getRecommendPlayList())
    },
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
class Find extends Component {
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

  constructor (props) {
    super(props)
    this.state = {
      current: 0,
      showLoading: true,
      searchValue:'',
      bannerList: [],
    }
  }
  formatPlayCount = count =>{
    return count < 10000 ? count : `${Number(count/10000).toFixed(0)}万`
  }
  // 详情页
  goDetail = item => {
   Taro.navigateTo({
     url: `/pages/playListDetail/index?id=${item.id}&name=${item.name}`
   })
 }
 handleClick (value) {
  this.setState({
    current: value
  })
}
 componentDidMount() {
   /*获取推荐歌单*/
    this.props.getRecommendPlayList()
    this.getBanner()
 }
  componentWillReceiveProps(nextProps) {
    console.log(this.props, nextProps);
  }

  componentWillUnmount() {}

  componentDidShow () {
   if (typeof this.$scope.getTabBar === 'function' && this.$scope.getTabBar()) {
     this.$scope.getTabBar().$component.setState({
       selected: 0
     })
   }
 }

  componentDidHide() {}

  getBanner = ()=> {
    API.get('/banner', {
      type: 2
    }).then(({ data }) => {
      console.log('banner', data)
      if (data.banners) {
        this.setState({
          bannerList: data.banners
        })
      }
    })
  }
  render() {
    const {bannerList,searchValue} = this.state
    const {recommendPlayList } = this.props
    return (
      <View className="index_container">
        <AtSearchBar
          actionName='搜一下'
          value={searchValue}
          onChange={(val)=>console.log(val)}
        />
        <Swiper
         className='index_swiper'
         indicatorColor='#999'
         indicatorActiveColor='#333'
         circular={true}
         indicatorDots
         autoplay
        >
         {
            bannerList.map((item) =>
              <SwiperItem key={item.targetId} className='swiper_item'>
                <Image src={item.pic} className='img'/>
              </SwiperItem>
            )
        }
        </Swiper>
        <View className="handle_list">
          <View className="handle_list__item"

          >
          <View className="handle_list__item__icon-wrap">
            <AtIcon
              prefixClass="fa"
              value="calendar-minus-o"
              size="25"
              color="#ffffff"
              className="handle_list_item__icon"
            ></AtIcon>
          </View>
          <Text className="handle_list__item__text">每日推荐</Text>
        </View>
        </View>
        <View className='recommend_playlist'>
          <View className='recommend_playlist__title'>
            推荐歌单
          </View>
          <View className='recommend_playlist__content'>
            <PlayList
              goDetail={(item)=>this.goDetail(item)}
              source={recommendPlayList}
            />
            {/* {
              recommendPlayList&&recommendPlayList.map(item =>
                <View className='recommend_playlist__item' key={item.id} onClick={()=>this.goDetail(item)}>
                  <Image
                      src={item.picUrl+'?imageView&thumbnail=0x200'}
                      className='recommend_playlist__item__img'
                    />
                    <View className='recommend_playlist__item__cover__num'>
                       <Text className='at-icon at-icon-sound'></Text>
                      {
                        this.formatPlayCount(item.playCount)
                      }
                    </View>
                    <View className='recommend_playlist__item__title'>{item.name}</View>
                </View>)
            } */}

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

export default Find as ComponentClass<PageOwnProps, PageState>;
