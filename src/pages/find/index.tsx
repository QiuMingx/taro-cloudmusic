import { ComponentClass } from "react";
import Taro, { Component, Config } from "@tarojs/taro";
import {
  View,
  Button,
  Text,
  Image,
  Swiper,
  SwiperItem,
  ScrollView
} from "@tarojs/components";
import { AtTabs, AtTabsPane, AtSearchBar, AtIcon } from 'taro-ui'
import { connect } from "@tarojs/redux";
import PlayList from '../../components/PlayList'
import API from '../../services/api'
import { add, minus, asyncAdd } from "../../actions/counter";
import { getRecommendPlayList } from "../../actions/song";

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

interface Find {
  props: IProps;
}

@connect(
  ({ song }) => ({
    song: song,
    recommendPlayList: song.recommendPlayList,
    recommendSongList: song.recommendSongList
  }),
  dispatch => ({
    getRecommendPlayList() {
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

  constructor(props) {
    super(props)
    this.state = {
      current: 0,
      showLoading: true,
      searchValue: '',
      bannerList: [],
      testData:  {
                "name": "天外来物",
                "id": 1463165983,
                "pst": 0,
                "t": 0,
                "ar": [
                    {
                        "id": 5781,
                        "name": "薛之谦",
                        "tns": [],
                        "alias": []
                    }
                ],
                "alia": [],
                "pop": 100,
                "st": 0,
                "rt": "",
                "fee": 0,
                "v": 3,
                "crbt": null,
                "cf": "",
                "al": {
                    "id": 92510920,
                    "name": "天外来物",
                    "picUrl": "http://p1.music.126.net/HvB44MNINoLar8HFbRjIGQ==/109951165142435842.jpg",
                    "tns": [],
                    "pic_str": "109951165142435842",
                    "pic": 109951165142435840
                },
                "dt": 257212,
                "h": {
                    "br": 320000,
                    "fid": 0,
                    "size": 10291244,
                    "vd": -52235
                },
                "m": {
                    "br": 192000,
                    "fid": 0,
                    "size": 6174764,
                    "vd": -49678
                },
                "l": {
                    "br": 128000,
                    "fid": 0,
                    "size": 4116524,
                    "vd": -48009
                },
                "a": null,
                "cd": "01",
                "no": 1,
                "rtUrl": null,
                "ftype": 0,
                "rtUrls": [],
                "djId": 0,
                "copyright": 1,
                "s_id": 0,
                "mark": 128,
                "originCoverType": 0,
                "noCopyrightRcmd": null,
                "rtype": 0,
                "rurl": null,
                "mst": 9,
                "cp": 22036,
                "mv": 0,
                "publishTime": 1594915200000,
                "alg": "alg_featured"
            }
    }
  }
  formatPlayCount = count => {
    return count < 10000 ? count : `${Number(count / 10000).toFixed(0)}万`
  }
  // 详情页
  goDetail = item => {
    Taro.navigateTo({
      url: `/pages/playListDetail/index?id=${item.id}&name=${item.name}`
    })
  }
  handleClick(value) {
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

  componentWillUnmount() { }

  componentDidShow() {
    if (typeof this.$scope.getTabBar === 'function' && this.$scope.getTabBar()) {
      this.$scope.getTabBar().$component.setState({
        selected: 0
      })
    }
  }

  componentDidHide() { }

  getBanner = () => {
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
    const { bannerList, searchValue,testData} = this.state
    const { recommendPlayList,playListDetailInfo,recommendSongList} = this.props

    return (
      <View className="index_container">
        {/* <AtSearchBar
          actionName='搜一下'
          value={searchValue}
          onChange={(val) => console.log(val)}
        /> */}
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
                <Image src={item.imageUrl} className='img' />
              </SwiperItem>
            )
          }
        </Swiper>
        <ScrollView
          scrollX
          className="handle_list"
        >
        <View className="handle_list__item">
          <View className="handle_list__item__icon-wrap">
            <AtIcon
              prefixClass="iconfont"
              value="rili"
              size="25"
              color="#ffffff"
              className="handle_list_item__icon"
            ></AtIcon>
          </View>
          <Text className="handle_list__item__text">每日推荐</Text>
        </View>
        <View className="handle_list__item">
          <View className="handle_list__item__icon-wrap">
            <AtIcon
              prefixClass="iconfont"
              value="gedan"
              size="25"
              color="#ffffff"
              className="handle_list_item__icon"
            ></AtIcon>
          </View>
          <Text className="handle_list__item__text">歌单</Text>
        </View>
        <View className="handle_list__item">
          <View className="handle_list__item__icon-wrap">
            <AtIcon
              prefixClass="iconfont"
              value="paihang"
              size="25"
              color="#ffffff"
              className="handle_list_item__icon"
            ></AtIcon>
          </View>
          <Text className="handle_list__item__text">排行榜</Text>
        </View>
        <View className="handle_list__item">
          <View className="handle_list__item__icon-wrap">
            <AtIcon
              prefixClass="iconfont"
              value="diantai"
              size="25"
              color="#ffffff"
              className="handle_list_item__icon"
            ></AtIcon>
          </View>
          <Text className="handle_list__item__text">电台</Text>
        </View>
        <View className="handle_list__item">
          <View className="handle_list__item__icon-wrap">
            <AtIcon
              prefixClass="iconfont"
              value="iconfonttubiao_shipinhuifang"
              size="25"
              color="#ffffff"
              className="handle_list_item__icon"
            ></AtIcon>
          </View>
          <Text className="handle_list__item__text">直播</Text>
        </View>
        <View className="handle_list__item">
          <View className="handle_list__item__icon-wrap">
            <AtIcon
              prefixClass="iconfont"
              value="huo"
              size="25"
              color="#ffffff"
              className="handle_list_item__icon"
            ></AtIcon>
          </View>
          <Text className="handle_list__item__text">火前留名</Text>
        </View>
        <View className="handle_list__item">
          <View className="handle_list__item__icon-wrap">
            <AtIcon
              prefixClass="iconfont"
              value="yanchu1"
              size="25"
              color="#ffffff"
              className="handle_list_item__icon"
            ></AtIcon>
          </View>
          <Text className="handle_list__item__text">数字专辑</Text>
        </View>
        <View className="handle_list__item">
          <View className="handle_list__item__icon-wrap">
            <AtIcon
              prefixClass="iconfont"
              value="luntan-copy"
              size="25"
              color="#ffffff"
              className="handle_list_item__icon"
            ></AtIcon>
          </View>
          <Text className="handle_list__item__text">唱聊</Text>
        </View>
        <View className="handle_list__item">
          <View className="handle_list__item__icon-wrap">
            <AtIcon
              prefixClass="iconfont"
              value="yanchu"
              size="25"
              color="#ffffff"
              className="handle_list_item__icon"
            ></AtIcon>
          </View>
          <Text className="handle_list__item__text">线上演出</Text>
        </View>
        </ScrollView>

        <View className="recommend_scroll_list">
          <View className='recommend_list__title'>
            你的歌单精选站 
          </View>
          <ScrollView
            scrollX
            className="handle_list"
          >
          {
            recommendPlayList&&recommendPlayList.slice(0,6).map(item =>
              <View className='recommend_playlist__item' key={item.id} onClick={()=>this.goDetail(item)}>
                <Image
                    src={item.picUrl+'?imageView&thumbnail=0x200'}
                    className='recommend_playlist__item__img'
                  />
                <View className='recommend_playlist__item__cover__num'>
                  <Text className='at-icon at-icon-play'></Text>
                  {this.formatPlayCount(item.playCount)}
                </View>
                <View className='recommend_playlist__item__title'>{item.name}</View>
              </View>)
          }
          </ScrollView>
        </View>
        <View className="recommend_swiper_list">
          <View className='recommend_list__title'>
            晴天的浮絮 流动音符
          </View>
          <Swiper className="recommend_swiper_list__content" next-margin="10px" style={{paddingTop:'20px'}}>
            {
              recommendSongList.tracks.map((item,index)=><SwiperItem key={index}>

                <View className="recommend_swiper_list__content_swiper_item">
                  {item.map(children=><View key={children.id} className="recommend_swiper_list__content_item">
                    <Image className="recommend_swiper_list__content_item_img" src={children.al.picUrl} />
                    <View className="recommend_swiper_list__content_item_text">
                      <View>
                        <Text className="song_name">{children.name}</Text>
                        <Text className="song_artist"> - {children.ar[0].name}</Text>
                      </View>
                        <Text className="song_artist_describe">{children.name}</Text>
                    </View>
                    <View style={{position:'absolute',right:'10px'}}>
                      <AtIcon
                        prefixClass="iconfont"
                        value="Play-copy"
                        size="25"
                        color="#fc1813"
                      ></AtIcon>
                    </View>
                  </View>)}

                </View>
            </SwiperItem>)
            }
          </Swiper>
        </View>

        <View className='recommend_playlist'>
          <View className='recommend_playlist__title'>
            推荐歌单
          </View>
          <View className='recommend_playlist__content'>
            <PlayList
              goDetail={(item) => this.goDetail(item)}
              source={recommendPlayList}
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

export default Find as ComponentClass<PageOwnProps, PageState>;
