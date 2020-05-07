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
import {getPlayListDetail} from "../../actions/song";
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
    getPlayListDetail(payload) {
      dispatch(getPlayListDetail(payload));
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
class PlayListDetail extends Component {
  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    navigationBarTitleText: "歌单详情"
  };

  constructor (props) {
    super(props)
    this.state = {
      playListDetail:{}
    }
  }

  componentWillMount() {
     const { id, name } = this.$router.params;
     Taro.setNavigationBarTitle({
       title: name
     });
     this.props.getPlayListDetail({
       id
     });
   }

  formatPlayCount = count =>{
    return count < 10000 ? count : `${Number(count/10000).toFixed(0)}万`
  }
  playSong = (songId) =>{
    Taro.navigateTo({
        url: `/pages/songDetail/index?id=${songId}`
    })
  }
  componentWillReceiveProps(nextProps) {
    console.log(this.props, nextProps);
  }

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  render() {
    const {playListDetailInfo,} = this.props.song;
    return (
      <View className="playListDetail_container">
        <View className='playList__header'>
          <Image
            className='playList__header__bg'
            src={playListDetailInfo.coverImgUrl}
          />
          <View className='playList__header__cover'>
            <Image
              className='playList__header__cover__img'
              src={playListDetailInfo.coverImgUrl}
            />
            <Text className='playList__header__cover__desc'>歌单</Text>
            <View className='playList__header__cover__num'>
              <Text className='at-icon at-icon-sound'></Text>
              {
                this.formatPlayCount(playListDetailInfo.playCount)
              }
            </View>
          </View>
          <View className='playList__header__info'>
            <View className='playList__header__info__title'>
              {playListDetailInfo.name}
            </View>
            <View className='playList__header__info__user'>
              <Image
                className='playList__header__info__user_avatar'
                src={playListDetailInfo.creator.avatarUrl}
              />
              {playListDetailInfo.creator.nickname}
            </View>
          </View>
        </View>
        <View className='playList__header__more'>
          <View className='playList__header__more__tag'>
             标签：
             {
               playListDetailInfo.tags.map(tag =>
                 <Text key={tag} className='playList__header__more__tag__item'>
                  {tag}
                </Text>)
             }
             {
               playListDetailInfo.tags.length === 0 ? '暂无' : ''
             }
         </View>
         <View className='playList__header__more__desc'>
             简介：{playListDetailInfo.description || '暂无'}
         </View>
        </View>
        <View className='playList__content'>
          <View className='playList__content__title'>
             歌曲列表
          </View>
          <View className='playList__content__list'>
            {
              playListDetailInfo.tracks.map((item,index) =>   <View
                className='playList__content__list__item'
                key={item.id}
                onClick={()=>this.playSong(item.id)}
                >
                  <Text className='playList__content__list__item__index'>{index+1}</Text>
                  <View className='playList__content__list__item__info'>
                    <View className='playList__content__list__item__info__name'>
                       {item.name}
                    </View>
                    <View className='playList__content__list__item__info__desc'>
                        {item.ar[0] ? item.ar[0].name : ''} - {item.al.name}
                    </View>
                    <Text className='at-icon at-icon-chevron-right'></Text>
                  </View>
                </View>)
            }

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

export default PlayListDetail as ComponentClass<PageOwnProps, PageState>;
