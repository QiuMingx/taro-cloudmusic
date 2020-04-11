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
      searchValue:'',
      recommendPlayList: [
        {
            "id": 924680166,
            "type": 0,
            "name": "[华语速爆新歌] 最新华语音乐推荐",
            "copywriter": "编辑推荐：优质华语新歌大放送！",
            "picUrl": "https://p1.music.126.net/njthCVBccXZ4QpPYHIrNCQ==/109951164854549224.jpg",
            "canDislike": false,
            "trackNumberUpdateTime": 1585497600000,
            "playCount": 778467580,
            "trackCount": 30,
            "highQuality": false,
            "alg": "featured"
        },
        {
            "id": 4890146949,
            "type": 0,
            "name": "『Gentleman』梦境温柔低语",
            "copywriter": "编辑推荐：听歌，就像橱窗里摆放的香水，各有各的馥郁\n",
            "picUrl": "https://p1.music.126.net/vWuREhx25IYyuYczOiluIg==/109951164768712730.jpg",
            "canDislike": false,
            "trackNumberUpdateTime": 1584946965690,
            "playCount": 116137,
            "trackCount": 39,
            "highQuality": false,
            "alg": "featured"
        },
        {
            "id": 3226488224,
            "type": 0,
            "name": "【精选超好听翻唱Cover集】",
            "copywriter": "热门推荐",
            "picUrl": "https://p1.music.126.net/CnWbnpfFjShCDQiqEBt9dA==/109951164704843184.jpg",
            "canDislike": true,
            "trackNumberUpdateTime": 1585560222375,
            "playCount": 501361,
            "trackCount": 234,
            "highQuality": false,
            "alg": "cityLevel_B"
        },
        {
            "id": 4900028836,
            "type": 0,
            "name": "精选 | 好听的翻唱合集",
            "copywriter": "热门推荐",
            "picUrl": "https://p1.music.126.net/hf-DGgrNLr_o-DLmKoDn0w==/109951164779757985.jpg",
            "canDislike": true,
            "trackNumberUpdateTime": 1585477634284,
            "playCount": 278908,
            "trackCount": 71,
            "highQuality": false,
            "alg": "cityLevel_B"
        },
        {
            "id": 3024969208,
            "type": 0,
            "name": "我 猜 我 已 经 用 光 了 运 气",
            "copywriter": "热门推荐",
            "picUrl": "https://p1.music.126.net/loiX2CuKmVxDDLh5JH_gxQ==/109951164767114433.jpg",
            "canDislike": true,
            "trackNumberUpdateTime": 1585302303544,
            "playCount": 131467,
            "trackCount": 50,
            "highQuality": false,
            "alg": "cityLevel_B"
        },
        {
            "id": 2829920189,
            "type": 0,
            "name": "[韩系私人订制] 最懂你的韩系推荐 每日更新35首",
            "copywriter": "热门推荐",
            "picUrl": "https://p1.music.126.net/9PeBTS0QmjB7B_pJUFnz-A==/109951164614296928.jpg",
            "canDislike": true,
            "trackNumberUpdateTime": 1585605600000,
            "playCount": 15112721,
            "trackCount": 35,
            "highQuality": false,
            "alg": "cityLevel_B"
        },
        {
            "id": 2434455421,
            "type": 0,
            "name": "【励志歌单大全】坚持不下或犯困时听听",
            "copywriter": "热门推荐",
            "picUrl": "https://p1.music.126.net/iBkPXQgIMv8LzSP3dDyNtQ==/109951163916215136.jpg",
            "canDislike": true,
            "trackNumberUpdateTime": 1585460062014,
            "playCount": 1551697,
            "trackCount": 381,
            "highQuality": false,
            "alg": "cityLevel_B"
        },
        {
            "id": 2378247916,
            "type": 0,
            "name": "心累了，偷偷丧一会吧",
            "copywriter": "热门推荐",
            "picUrl": "https://p1.music.126.net/3q0sLeNFFOCymO9kAQGneQ==/109951163791558431.jpg",
            "canDislike": true,
            "trackNumberUpdateTime": 1585489432641,
            "playCount": 1189417,
            "trackCount": 88,
            "highQuality": false,
            "alg": "cityLevel_B"
        },
        {
            "id": 590535194,
            "type": 0,
            "name": "\" 干净而又温柔 \"",
            "copywriter": "热门推荐",
            "picUrl": "https://p1.music.126.net/letgAY3JHM5lmL_YG1s1_Q==/109951163887459973.jpg",
            "canDislike": true,
            "trackNumberUpdateTime": 1556250832147,
            "playCount": 312915,
            "trackCount": 74,
            "highQuality": false,
            "alg": "cityLevel_B"
        },
        {
            "id": 2097007271,
            "type": 0,
            "name": "谁的青春不迷茫，其实我们都一样",
            "copywriter": "热门推荐",
            "picUrl": "https://p1.music.126.net/Lg0PeVpJIxyQIRj2RuN6nQ==/18567452860435994.jpg",
            "canDislike": true,
            "trackNumberUpdateTime": 1544540404341,
            "playCount": 2366770,
            "trackCount": 62,
            "highQuality": false,
            "alg": "cityLevel_B"
        },
        {
            "id": 4869164805,
            "type": 0,
            "name": "私藏 | 值得循环的Cover合集",
            "copywriter": "热门推荐",
            "picUrl": "https://p1.music.126.net/zk3QExfjxafpWTKu0DZsGA==/109951164717393424.jpg",
            "canDislike": true,
            "trackNumberUpdateTime": 1584267476528,
            "playCount": 1483958,
            "trackCount": 232,
            "highQuality": false,
            "alg": "cityLevel_B"
        },
        {
            "id": 2786509840,
            "type": 0,
            "name": "民谣||和孩子一起听",
            "copywriter": "热门推荐",
            "picUrl": "https://p1.music.126.net/GKRl48cbfSMy14x7tF1TQA==/109951164052977700.jpg",
            "canDislike": true,
            "trackNumberUpdateTime": 1584105050424,
            "playCount": 1499658,
            "trackCount": 22,
            "highQuality": false,
            "alg": "cityLevel_B"
        },
        {
            "id": 607130398,
            "type": 0,
            "name": "UyGuR ♬ 维吾尔",
            "copywriter": "热门推荐",
            "picUrl": "https://p1.music.126.net/KFnzNyrQsOqe3AMDahQItA==/109951164676708078.jpg",
            "canDislike": true,
            "trackNumberUpdateTime": 1585590079057,
            "playCount": 4541660,
            "trackCount": 727,
            "highQuality": false,
            "alg": "cityLevel_B"
        },
        {
            "id": 312692149,
            "type": 0,
            "name": "精选Uyghur song ♥",
            "copywriter": "热门推荐",
            "picUrl": "https://p1.music.126.net/K1i21SDKrosw5m9x6cuIvw==/109951164513719728.jpg",
            "canDislike": true,
            "trackNumberUpdateTime": 1585467572130,
            "playCount": 879982,
            "trackCount": 626,
            "highQuality": false,
            "alg": "cityLevel_B"
        },
        {
            "id": 4881066023,
            "type": 0,
            "name": "<甜味女孩>早上起来时 整个世界都是礼物",
            "copywriter": "热门推荐",
            "picUrl": "https://p1.music.126.net/GxeQTvY2Q1n-vZJO55XpFQ==/109951164739395621.jpg",
            "canDislike": true,
            "trackNumberUpdateTime": 1582540200324,
            "playCount": 835307,
            "trackCount": 31,
            "highQuality": false,
            "alg": "cityLevel_B"
        },
        {
            "id": 2754720003,
            "type": 0,
            "name": "天色湛蓝，风轻日暖，空气很新，美梦很甜。",
            "copywriter": "热门推荐",
            "picUrl": "https://p1.music.126.net/lmiFSEQWTrlgHvK17W6a4g==/109951164131970127.jpg",
            "canDislike": true,
            "trackNumberUpdateTime": 1585096867199,
            "playCount": 374999,
            "trackCount": 38,
            "highQuality": false,
            "alg": "cityLevel_B"
        },
        {
            "id": 2081858574,
            "type": 0,
            "name": "90后喜欢的7080年代经典老歌，听到耳朵怀孕",
            "copywriter": "热门推荐",
            "picUrl": "https://p1.music.126.net/d67cq7MvCgBo9atyqUIB3g==/109951163274684757.jpg",
            "canDislike": true,
            "trackNumberUpdateTime": 1585232373252,
            "playCount": 1050603,
            "trackCount": 96,
            "highQuality": false,
            "alg": "cityLevel_B"
        },
        {
            "id": 2510931408,
            "type": 0,
            "name": "我曾经爱过她呢",
            "copywriter": "热门推荐",
            "picUrl": "https://p1.music.126.net/KgvPfONnm3d6_i5_YThBLw==/109951164639192372.jpg",
            "canDislike": true,
            "trackNumberUpdateTime": 1585103569242,
            "playCount": 16513977,
            "trackCount": 127,
            "highQuality": false,
            "alg": "cityLevel_B"
        },
        {
            "id": 2365776318,
            "type": 0,
            "name": "【翻唱】男声 杂食.略尽千帆你最温柔",
            "copywriter": "热门推荐",
            "picUrl": "https://p1.music.126.net/vFSyTM5uLj3aDmWlwPGuQw==/109951163937454559.jpg",
            "canDislike": true,
            "trackNumberUpdateTime": 1585519814674,
            "playCount": 2128742,
            "trackCount": 233,
            "highQuality": false,
            "alg": "cityLevel_B"
        },
        {
            "id": 911814137,
            "type": 0,
            "name": "网易云热评点赞榜Top200 | 20200325更新",
            "copywriter": "热门推荐",
            "picUrl": "https://p1.music.126.net/m6Tz8LPpTvywQ__mh5zB4A==/109951163755951915.jpg",
            "canDislike": true,
            "trackNumberUpdateTime": 1585494009529,
            "playCount": 3222093,
            "trackCount": 205,
            "highQuality": false,
            "alg": "cityLevel_B"
        },
        {
            "id": 374820366,
            "type": 0,
            "name": "曾经是否有被一句歌词打动过",
            "copywriter": "热门推荐",
            "picUrl": "https://p1.music.126.net/cjh_BIDWLqk7c0Ytiwakqw==/18961078021601966.jpg",
            "canDislike": true,
            "trackNumberUpdateTime": 1581671654252,
            "playCount": 11744989,
            "trackCount": 46,
            "highQuality": false,
            "alg": "cityLevel_B"
        },
        {
            "id": 2410449800,
            "type": 0,
            "name": "车载必备 | 节奏控",
            "copywriter": "热门推荐",
            "picUrl": "https://p1.music.126.net/J-uUxlKGY-3ceEBWPdNGCA==/109951164817212140.jpg",
            "canDislike": true,
            "trackNumberUpdateTime": 1585276671737,
            "playCount": 216206,
            "trackCount": 133,
            "highQuality": false,
            "alg": "cityLevel_B"
        },
        {
            "id": 2482210411,
            "type": 0,
            "name": "那些听一遍就喜欢的歌",
            "copywriter": "热门推荐",
            "picUrl": "https://p1.music.126.net/R61ZF0gTfd6fuVc41oo5Lg==/109951164286019220.jpg",
            "canDislike": true,
            "trackNumberUpdateTime": 1585582052407,
            "playCount": 22871148,
            "trackCount": 166,
            "highQuality": false,
            "alg": "cityLevel_B"
        },
        {
            "id": 3092652961,
            "type": 0,
            "name": "-❥维吾尔族歌曲↬Taxmamat-Batur ღ",
            "copywriter": "热门推荐",
            "picUrl": "https://p1.music.126.net/9q4Vm8buiMJfWqBaNwDb8A==/109951164512561227.jpg",
            "canDislike": true,
            "trackNumberUpdateTime": 1585579501722,
            "playCount": 187537,
            "trackCount": 50,
            "highQuality": false,
            "alg": "cityLevel_B"
        },
        {
            "id": 2033700325,
            "type": 0,
            "name": "全球高考/AWM/伪渣/提映/破云/大哥/影帝",
            "copywriter": "热门推荐",
            "picUrl": "https://p1.music.126.net/8EU_2-9x6y9kWggnNCpEig==/109951164054786590.jpg",
            "canDislike": true,
            "trackNumberUpdateTime": 1585359048873,
            "playCount": 1224669,
            "trackCount": 64,
            "highQuality": false,
            "alg": "cityLevel_B"
        },
        {
            "id": 3180475090,
            "type": 0,
            "name": "【温柔翻唱 （吉他弹唱）】",
            "copywriter": "热门推荐",
            "picUrl": "https://p1.music.126.net/Je_e69mE7uxlm8S6105Oyg==/109951164849250407.jpg",
            "canDislike": true,
            "trackNumberUpdateTime": 1585582910233,
            "playCount": 867206,
            "trackCount": 49,
            "highQuality": false,
            "alg": "cityLevel_B"
        },
        {
            "id": 2731266847,
            "type": 0,
            "name": "冰糖炖雪梨 电视剧原声带",
            "copywriter": "热门推荐",
            "picUrl": "https://p1.music.126.net/aJX8-zw7HTPx-dO2LYVlWg==/109951164854557202.jpg",
            "canDislike": true,
            "trackNumberUpdateTime": 1585568391360,
            "playCount": 223879,
            "trackCount": 44,
            "highQuality": false,
            "alg": "cityLevel_B"
        },
        {
            "id": 2216284341,
            "type": 0,
            "name": "10W 评论里的故事",
            "copywriter": "热门推荐",
            "picUrl": "https://p1.music.126.net/bSOk_BQxZBccZOvLFvJlGQ==/109951163286053413.jpg",
            "canDislike": true,
            "trackNumberUpdateTime": 1582599196595,
            "playCount": 11506217,
            "trackCount": 87,
            "highQuality": false,
            "alg": "cityLevel_B"
        },
        {
            "id": 2427721462,
            "type": 0,
            "name": "【吾守尔喀热】｛HoxurKari｝",
            "copywriter": "热门推荐",
            "picUrl": "https://p1.music.126.net/Z6eMq-K5Ry5DDttPWVs_5Q==/109951164696271102.jpg",
            "canDislike": true,
            "trackNumberUpdateTime": 1584569492341,
            "playCount": 532310,
            "trackCount": 31,
            "highQuality": false,
            "alg": "cityLevel_B"
        },
        {
            "id": 2671145804,
            "type": 0,
            "name": "高考百日冲刺：乾坤未定，你我皆是黑马",
            "copywriter": "热门推荐",
            "picUrl": "https://p1.music.126.net/a4qCDQjCjPmpz1EXZGYEhg==/109951163869221016.jpg",
            "canDislike": true,
            "trackNumberUpdateTime": 1583710709477,
            "playCount": 3824832,
            "trackCount": 45,
            "highQuality": false,
            "alg": "cityLevel_B"
        }
    ],
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
    }
  }
  formatPlayCount = count =>{
    return count < 10000 ? count : `${Number(count/10000).toFixed(0)}万`
  }
  goDetail = item => {
   Taro.navigateTo({
     url: `/pages/playListDetail/index?id=${item.id}&name=${item.name}`
   })
 } 
  componentWillReceiveProps(nextProps) {
    console.log(this.props, nextProps);
  }

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  render() {
    const {bannerList,searchValue,recommendPlayList} = this.state
    return (
      <View className="index_container">
        <AtSearchBar
          actionName='搜一下'
          value={searchValue}
          onChange={(val)=>console.log(val)}
        />
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
        <View className='recommend_playlist'>
          <View className='recommend_playlist__title'>
            推荐歌单
          </View>
          <View className='recommend_playlist__content'>
            {
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

export default Index as ComponentClass<PageOwnProps, PageState>;
