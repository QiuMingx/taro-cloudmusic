import { ComponentClass } from "react";
import Taro, { Component, Config } from "@tarojs/taro";
import {View,Button,Text,Image} from "@tarojs/components";
import { connect } from "@tarojs/redux";
import classnames from 'classnames'
import { add, minus, asyncAdd } from "../../actions/counter";
import "./index.less";
import {
  getSongInfo
} from "../../actions/song";
import CSlider from '../../components/CSlider'
import CLyric from '../../components/CLyric'
import topImage from '../../assets/images/aag.png'
import stopIcon from '../../assets/images/ajd.png'
import playIcon from '../../assets/images/ajf.png'
import prevIcon from '../../assets/images/ajh.png'
import nextIcon from '../../assets/images/ajb.png'
import likeIcon from '../../assets/images/song/play_icn_loved.png'
import playModeImg from '../../assets/images/song/icn_loop_mode.png'


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
  getSongInfo: (object) => any;
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
const backgroundAudioManager = Taro.getBackgroundAudioManager()
@connect(
  ({ song }) => ({
      song: song
  }),
  dispatch => ({
    getSongInfo(object) {
      dispatch(getSongInfo(object));
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
class Page extends Component {
  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    navigationBarTitleText: '歌单详情'
  };

  constructor (props) {
    super(props)
    this.state = {
      current: 0,
      play: false,
      searchValue:'',
      playPercent: 10 ,
      firstEnter: true

    }
  }

  componentDidMount(){
    let _this = this
    const { id } = this.$router.params;
    this.props.getSongInfo({
      id
    });
    //监听背景音频播放进度更新事件
    backgroundAudioManager.onTimeUpdate(() => {
      Taro.getBackgroundAudioPlayerState({
        success(res) {
          if (res.status !== 2) {
            _this.updateLrc(res.currentPosition);
            _this.updateProgress(res.currentPosition);
          }
        }
      });
    });
    backgroundAudioManager.onPause(() => {
      _this.setState({
        isPlaying: false
      });
    });
    backgroundAudioManager.onPlay(() => {
      _this.setState({
        isPlaying: true
      });
    });
    //监听背景音频自然播放结束事件
    backgroundAudioManager.onEnded(() => {
       const { playMode } = _this.props.song;
       const routes = Taro.getCurrentPages();
       const currentRoute = routes[routes.length - 1].route;
       // 如果在当前页面则直接调用下一首的逻辑，反之则触发nextSong事件
       if (currentRoute === "pages/songDetail/index") {
         _this.playByMode(playMode);
       } else {
         Taro.eventCenter.trigger("nextSong");
       }
     });

  }

  updateLrc = (currentPosition)=> {
    const { lrc } = this.state;
    let lrcIndex = 0;
    if (lrc && !lrc.scroll && lrc.lrclist && lrc.lrclist.length > 0) {
      lrc.lrclist.forEach((item, index) => {
        if (item.lrc_sec <= currentPosition) {
          lrcIndex = index;
        }
      });
    }
    this.setState({
      lrcIndex
    });
  }

  updateProgress=(currentPosition)=> {
    const { dt } = this.props.song.currentSongInfo;
    this.setState({
      playPercent: Math.floor((currentPosition * 1000 * 100) / dt)
    });
  }

  playMusic = () => {
    console.log('0',this.props.song.currentSongInfo)

    backgroundAudioManager.play();
    this.setState({
      isPlaying: true
    });
  }

  pauseMusic =()=> {
    backgroundAudioManager.pause()
    this.setState({
      isPlaying: false
    })
  }
  //设置歌曲信息
  setSongInfo=(songInfo)=> {
    try {
      const { name, al, url, lrcInfo } = songInfo;
      Taro.setNavigationBarTitle({
        title: name
      });
      backgroundAudioManager.title = name;
      backgroundAudioManager.coverImgUrl = al.picUrl;
      backgroundAudioManager.src = url;
      this.setState({
        lrc: lrcInfo,
        isPlaying: true,
        firstEnter: false
      });
    } catch (err) {
      console.log("err", err);
      this.getNextSong();
    }
  }
  percentChange = (e) => {
    const { value } = e.detail
    const { dt } = this.props.song.currentSongInfo
    let currentPosition = Math.floor((dt / 1000) * value / 100)
    backgroundAudioManager.seek(currentPosition)
    backgroundAudioManager.play()
  }
  percentChanging =()=>{
    backgroundAudioManager.pause()
  }

  componentWillReceiveProps(nextProps) {
    // console.log(this.props, nextProps);
    // this.setStar(
    //   nextProps.song.likeMusicList,
    //   nextProps.song.currentSongInfo.id
    // );
    if (this.props.song.currentSongInfo.name !==nextProps.song.currentSongInfo.name
    ||this.state.firstEnter) {
      this.setState({
        firstEnter: false
      });
      this.setSongInfo(nextProps.song.currentSongInfo);
    }
  }

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  render() {
    const {play} = this.state
    const { currentSongInfo, playMode } = this.props.song;
    const { isPlaying, showLyric, lrc, lrcIndex, star, playPercent } = this.state
    return (
      <View className='song_container'>
        <Image
          className='song__bg'
          src={currentSongInfo.al.picUrl}
        />
        <View className='song__music'>
          <View className='song__music__main'>
            <Image
            className={isPlaying ? 'song__music__main__needle play ' : 'song__music__main__needle '}
            src={topImage}
            />
            <View className='song__music__main__cover'>
              <View className={
                classnames({
                  song__music__main__img: true,
                  'z-pause': !isPlaying,
                  circling: true
                })}>
                <Image className='song__music__main__img__cover' src ={currentSongInfo.al.picUrl} />
              </View>
            </View>
          </View>
        </View>
       <CSlider percent={playPercent} onChange={(e)=>this.percentChange(e)} onChanging={()=>this.percentChanging()} />
       <CLyric lrc={lrc} lrcIndex={lrcIndex} showLyric={showLyric} onTrigger={() => this.hiddenLyric()} />
       <View className='song__bottom'>
         <View className='song__operation'>
           <Image
             src={playModeImg}
             className='song__operation__mode'
           />
           <Image
              src={prevIcon}
              className='song__operation__prev'
            />
            {
                isPlaying ? <Image src={stopIcon} className='song__operation__play' onClick={()=>this.pauseMusic()}/> :
                <Image src={playIcon} className='song__operation__play' onClick={()=>this.playMusic()}/>
            }

          <Image
             src={nextIcon}
             className='song__operation__next'
           />
           <Image
             src={likeIcon}
             className='song__operation__like'
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
