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

interface PlayListDetail {
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
      playListDetail:{
        "subscribers": [
            {
                "defaultAvatar": false,
                "province": 110000,
                "authStatus": 0,
                "followed": false,
                "avatarUrl": "http://p1.music.126.net/hqSRpxwDXujPjAtNNAqDkg==/109951163216977717.jpg",
                "accountStatus": 0,
                "gender": 2,
                "city": 110101,
                "birthday": -2209017600000,
                "userId": 1416059058,
                "userType": 0,
                "nickname": "Marshana",
                "signature": "",
                "description": "",
                "detailDescription": "",
                "avatarImgId": 109951163216977710,
                "backgroundImgId": 109951163446126160,
                "backgroundUrl": "http://p1.music.126.net/Fr7BI6zL-pgP-dZ2dD4TiQ==/109951163446126163.jpg",
                "authority": 0,
                "mutual": false,
                "expertTags": null,
                "experts": null,
                "djStatus": 0,
                "vipType": 0,
                "remarkName": null,
                "avatarImgIdStr": "109951163216977717",
                "backgroundImgIdStr": "109951163446126163",
                "avatarImgId_str": "109951163216977717"
            },
            {
                "defaultAvatar": true,
                "province": 440000,
                "authStatus": 0,
                "followed": false,
                "avatarUrl": "http://p1.music.126.net/ma8NC_MpYqC-dK_L81FWXQ==/109951163250233892.jpg",
                "accountStatus": 0,
                "gender": 1,
                "city": 440300,
                "birthday": -2209017600000,
                "userId": 3244846144,
                "userType": 0,
                "nickname": "你的安慕希_LEmw",
                "signature": "",
                "description": "",
                "detailDescription": "",
                "avatarImgId": 109951163250233890,
                "backgroundImgId": 109951162868128400,
                "backgroundUrl": "http://p1.music.126.net/2zSNIqTcpHL2jIvU6hG0EA==/109951162868128395.jpg",
                "authority": 0,
                "mutual": false,
                "expertTags": null,
                "experts": null,
                "djStatus": 0,
                "vipType": 0,
                "remarkName": null,
                "avatarImgIdStr": "109951163250233892",
                "backgroundImgIdStr": "109951162868128395",
                "avatarImgId_str": "109951163250233892"
            },
            {
                "defaultAvatar": false,
                "province": 370000,
                "authStatus": 0,
                "followed": false,
                "avatarUrl": "http://p1.music.126.net/-KCqC2aRbTaDNx1ydITRyQ==/109951164689644266.jpg",
                "accountStatus": 0,
                "gender": 2,
                "city": 371500,
                "birthday": 1106209991291,
                "userId": 1520069591,
                "userType": 0,
                "nickname": "光芒万丈小太阳XXX",
                "signature": "",
                "description": "",
                "detailDescription": "",
                "avatarImgId": 109951164689644270,
                "backgroundImgId": 109951164664272320,
                "backgroundUrl": "http://p1.music.126.net/lkl5_9I0nV9g08FSssiyuw==/109951164664272320.jpg",
                "authority": 0,
                "mutual": false,
                "expertTags": null,
                "experts": null,
                "djStatus": 0,
                "vipType": 0,
                "remarkName": null,
                "avatarImgIdStr": "109951164689644266",
                "backgroundImgIdStr": "109951164664272320",
                "avatarImgId_str": "109951164689644266"
            },
            {
                "defaultAvatar": true,
                "province": 440000,
                "authStatus": 0,
                "followed": false,
                "avatarUrl": "http://p1.music.126.net/ma8NC_MpYqC-dK_L81FWXQ==/109951163250233892.jpg",
                "accountStatus": 0,
                "gender": 1,
                "city": 440100,
                "birthday": -2209017600000,
                "userId": 1804996045,
                "userType": 0,
                "nickname": "用户1804996045",
                "signature": "",
                "description": "",
                "detailDescription": "",
                "avatarImgId": 109951163250233890,
                "backgroundImgId": 109951162868128400,
                "backgroundUrl": "http://p1.music.126.net/2zSNIqTcpHL2jIvU6hG0EA==/109951162868128395.jpg",
                "authority": 0,
                "mutual": false,
                "expertTags": null,
                "experts": null,
                "djStatus": 0,
                "vipType": 0,
                "remarkName": null,
                "avatarImgIdStr": "109951163250233892",
                "backgroundImgIdStr": "109951162868128395",
                "avatarImgId_str": "109951163250233892"
            },
            {
                "defaultAvatar": false,
                "province": 340000,
                "authStatus": 0,
                "followed": false,
                "avatarUrl": "http://p1.music.126.net/4wc52eWyo2v7ffrLbU5alQ==/109951164815660858.jpg",
                "accountStatus": 0,
                "gender": 2,
                "city": 340100,
                "birthday": 1058786969974,
                "userId": 1926742342,
                "userType": 0,
                "nickname": "C-929星",
                "signature": "辛苦啦 明天也要加油鸭-♡",
                "description": "",
                "detailDescription": "",
                "avatarImgId": 109951164815660860,
                "backgroundImgId": 109951164823585460,
                "backgroundUrl": "http://p1.music.126.net/SNf1UQeBMhPabe8AmuZ8Aw==/109951164823585462.jpg",
                "authority": 0,
                "mutual": false,
                "expertTags": null,
                "experts": null,
                "djStatus": 0,
                "vipType": 0,
                "remarkName": null,
                "avatarImgIdStr": "109951164815660858",
                "backgroundImgIdStr": "109951164823585462",
                "avatarImgId_str": "109951164815660858"
            },
            {
                "defaultAvatar": false,
                "province": 610000,
                "authStatus": 0,
                "followed": false,
                "avatarUrl": "http://p1.music.126.net/fRTKFKs6a7e3oEt1VLw9aQ==/109951164847939429.jpg",
                "accountStatus": 0,
                "gender": 2,
                "city": 610100,
                "birthday": 1018876103144,
                "userId": 1674456478,
                "userType": 0,
                "nickname": "可艺zz崽",
                "signature": "心之所向，无事不成。",
                "description": "",
                "detailDescription": "",
                "avatarImgId": 109951164847939420,
                "backgroundImgId": 109951164730083940,
                "backgroundUrl": "http://p1.music.126.net/jevJbTs8cyw_skom_J4eGw==/109951164730083937.jpg",
                "authority": 0,
                "mutual": false,
                "expertTags": null,
                "experts": null,
                "djStatus": 0,
                "vipType": 0,
                "remarkName": null,
                "avatarImgIdStr": "109951164847939429",
                "backgroundImgIdStr": "109951164730083937",
                "avatarImgId_str": "109951164847939429"
            },
            {
                "defaultAvatar": false,
                "province": 450000,
                "authStatus": 0,
                "followed": false,
                "avatarUrl": "http://p1.music.126.net/xYcduXEBYTjwaDiIczYPaA==/109951163719305808.jpg",
                "accountStatus": 0,
                "gender": 2,
                "city": 450100,
                "birthday": 1038985884108,
                "userId": 1682050508,
                "userType": 0,
                "nickname": "msxlc",
                "signature": "一生一世一双人\n半醉半醒半浮生",
                "description": "",
                "detailDescription": "",
                "avatarImgId": 109951163719305810,
                "backgroundImgId": 109951163858907470,
                "backgroundUrl": "http://p1.music.126.net/5woIqN2CO9V6tieJHhhnEQ==/109951163858907471.jpg",
                "authority": 0,
                "mutual": false,
                "expertTags": null,
                "experts": null,
                "djStatus": 0,
                "vipType": 0,
                "remarkName": null,
                "avatarImgIdStr": "109951163719305808",
                "backgroundImgIdStr": "109951163858907471",
                "avatarImgId_str": "109951163719305808"
            },
            {
                "defaultAvatar": false,
                "province": 130000,
                "authStatus": 0,
                "followed": false,
                "avatarUrl": "http://p1.music.126.net/sf9AllaBCyp2NqU7lSc4RQ==/109951164635847779.jpg",
                "accountStatus": 0,
                "gender": 1,
                "city": 130100,
                "birthday": -2209017600000,
                "userId": 1764391749,
                "userType": 0,
                "nickname": "sirQw",
                "signature": "",
                "description": "",
                "detailDescription": "",
                "avatarImgId": 109951164635847780,
                "backgroundImgId": 109951164752899460,
                "backgroundUrl": "http://p1.music.126.net/NEXggj7XEyxiHng00yV49Q==/109951164752899461.jpg",
                "authority": 0,
                "mutual": false,
                "expertTags": null,
                "experts": null,
                "djStatus": 0,
                "vipType": 0,
                "remarkName": null,
                "avatarImgIdStr": "109951164635847779",
                "backgroundImgIdStr": "109951164752899461",
                "avatarImgId_str": "109951164635847779"
            }
        ],
        "subscribed": false,
        "creator": {
            "defaultAvatar": false,
            "province": 110000,
            "authStatus": 1,
            "followed": false,
            "avatarUrl": "http://p1.music.126.net/QWMV-Ru_6149AKe0mCBXKg==/1420569024374784.jpg",
            "accountStatus": 0,
            "gender": 1,
            "city": 110101,
            "birthday": -2209017600000,
            "userId": 1,
            "userType": 2,
            "nickname": "网易云音乐",
            "signature": "网易云音乐是8亿人都在使用的音乐平台，致力于帮助音乐爱好者发现音乐惊喜，帮助音乐人实现梦想。 \n2019年8月31日起，将不再提供实时在线人工服务。您可以优先通过自助方式解决问题，如仍需求助，可在相关页面留下您的问题，后续会有人工为您解答，辛苦您耐心等待，给您带来的不便敬请谅解。 如果仍然不能解决您的问题，可以邮件我们： 用户：ncm5990@163.com 音乐人：yyr599@163.com",
            "description": "网易云音乐官方账号",
            "detailDescription": "网易云音乐官方账号",
            "avatarImgId": 1420569024374784,
            "backgroundImgId": 2002210674180202,
            "backgroundUrl": "http://p1.music.126.net/pmHS4fcQtcNEGewNb5HRhg==/2002210674180202.jpg",
            "authority": 3,
            "mutual": false,
            "expertTags": null,
            "experts": null,
            "djStatus": 10,
            "vipType": 11,
            "remarkName": null,
            "avatarImgIdStr": "1420569024374784",
            "backgroundImgIdStr": "2002210674180202"
        },
        "tracks": [
            {
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
            {
                "name": "野蔷薇",
                "id": 1432492654,
                "pst": 0,
                "t": 0,
                "ar": [
                    {
                        "id": 10695,
                        "name": "张远",
                        "tns": [],
                        "alias": []
                    }
                ],
                "alia": [],
                "pop": 100,
                "st": 0,
                "rt": "",
                "fee": 8,
                "v": 3,
                "crbt": null,
                "cf": "",
                "al": {
                    "id": 86679981,
                    "name": "野蔷薇",
                    "picUrl": "http://p1.music.126.net/mnShg7FfSHxH606urxuFQA==/109951164821200509.jpg",
                    "tns": [],
                    "pic_str": "109951164821200509",
                    "pic": 109951164821200510
                },
                "dt": 279795,
                "h": {
                    "br": 320000,
                    "fid": 0,
                    "size": 11194605,
                    "vd": -62621
                },
                "m": {
                    "br": 192000,
                    "fid": 0,
                    "size": 6716781,
                    "vd": -60073
                },
                "l": {
                    "br": 128000,
                    "fid": 0,
                    "size": 4477869,
                    "vd": -58625
                },
                "a": null,
                "cd": "01",
                "no": 1,
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
                "cp": 1416481,
                "mv": 0,
                "publishTime": 0,
                "alg": "alg_featured"
            },
            {
                "name": "Indigo",
                "id": 1433507200,
                "pst": 0,
                "t": 0,
                "ar": [
                    {
                        "id": 1050282,
                        "name": "房东的猫",
                        "tns": [],
                        "alias": []
                    }
                ],
                "alia": [],
                "pop": 100,
                "st": 0,
                "rt": "",
                "fee": 8,
                "v": 4,
                "crbt": null,
                "cf": "",
                "al": {
                    "id": 86786839,
                    "name": "Indigo",
                    "picUrl": "http://p1.music.126.net/K5ipDcCIFnjwRDNhD8I33A==/109951164833929143.jpg",
                    "tns": [],
                    "pic_str": "109951164833929143",
                    "pic": 109951164833929140
                },
                "dt": 251129,
                "h": {
                    "br": 320000,
                    "fid": 0,
                    "size": 10047405,
                    "vd": -3800
                },
                "m": {
                    "br": 192000,
                    "fid": 0,
                    "size": 6028461,
                    "vd": -1183
                },
                "l": {
                    "br": 128000,
                    "fid": 0,
                    "size": 4018989,
                    "vd": 587
                },
                "a": null,
                "cd": "01",
                "no": 1,
                "rtUrl": null,
                "ftype": 0,
                "rtUrls": [],
                "djId": 0,
                "copyright": 0,
                "s_id": 0,
                "mark": 0,
                "rtype": 0,
                "rurl": null,
                "mst": 9,
                "cp": 0,
                "mv": 10922958,
                "publishTime": 0,
                "alg": "alg_featured"
            },
            {
                "name": "晚安吧，太阳",
                "id": 1433060985,
                "pst": 0,
                "t": 0,
                "ar": [
                    {
                        "id": 893259,
                        "name": "金玟岐",
                        "tns": [],
                        "alias": []
                    }
                ],
                "alia": [
                    "影视剧《不完美的她》推广曲"
                ],
                "pop": 100,
                "st": 0,
                "rt": "",
                "fee": 8,
                "v": 6,
                "crbt": null,
                "cf": "",
                "al": {
                    "id": 86740844,
                    "name": "晚安吧，太阳",
                    "picUrl": "http://p1.music.126.net/vKfujmFCW3_2_UDr9E95kQ==/109951164833809104.jpg",
                    "tns": [],
                    "pic_str": "109951164833809104",
                    "pic": 109951164833809100
                },
                "dt": 324860,
                "h": {
                    "br": 320000,
                    "fid": 0,
                    "size": 12996525,
                    "vd": -12776
                },
                "m": {
                    "br": 192000,
                    "fid": 0,
                    "size": 7797933,
                    "vd": -10126
                },
                "l": {
                    "br": 128000,
                    "fid": 0,
                    "size": 5198637,
                    "vd": -8345
                },
                "a": null,
                "cd": "01",
                "no": 1,
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
                "cp": 1416734,
                "mv": 0,
                "publishTime": 0,
                "alg": "alg_featured"
            },
            {
                "name": "触不可及的你",
                "id": 1433274839,
                "pst": 0,
                "t": 0,
                "ar": [
                    {
                        "id": 32543188,
                        "name": "卤蛋老师",
                        "tns": [],
                        "alias": []
                    }
                ],
                "alia": [],
                "pop": 100,
                "st": 0,
                "rt": "",
                "fee": 8,
                "v": 3,
                "crbt": null,
                "cf": "",
                "al": {
                    "id": 86763624,
                    "name": "触不可及的你",
                    "picUrl": "http://p1.music.126.net/B2haSCYs4JSQFGGVsNtN8w==/109951164834184536.jpg",
                    "tns": [],
                    "pic_str": "109951164834184536",
                    "pic": 109951164834184540
                },
                "dt": 229411,
                "h": {
                    "br": 320000,
                    "fid": 0,
                    "size": 9178605,
                    "vd": -12221
                },
                "m": {
                    "br": 192000,
                    "fid": 0,
                    "size": 5507181,
                    "vd": -9623
                },
                "l": {
                    "br": 128000,
                    "fid": 0,
                    "size": 3671469,
                    "vd": -7989
                },
                "a": null,
                "cd": "01",
                "no": 0,
                "rtUrl": null,
                "ftype": 0,
                "rtUrls": [],
                "djId": 0,
                "copyright": 0,
                "s_id": 0,
                "mark": 0,
                "rtype": 0,
                "rurl": null,
                "mst": 9,
                "cp": 0,
                "mv": 0,
                "publishTime": 0,
                "alg": "alg_featured"
            },
            {
                "name": "蕾",
                "id": 1432716793,
                "pst": 0,
                "t": 0,
                "ar": [
                    {
                        "id": 31495403,
                        "name": "蘇山海",
                        "tns": [],
                        "alias": []
                    }
                ],
                "alia": [],
                "pop": 100,
                "st": 0,
                "rt": "",
                "fee": 8,
                "v": 3,
                "crbt": null,
                "cf": "",
                "al": {
                    "id": 86712453,
                    "name": "蕾",
                    "picUrl": "http://p1.music.126.net/rE6qxFPHe7BPaSB0RJkYbw==/109951164823666580.jpg",
                    "tns": [],
                    "pic_str": "109951164823666580",
                    "pic": 109951164823666580
                },
                "dt": 304479,
                "h": {
                    "br": 320000,
                    "fid": 0,
                    "size": 12181485,
                    "vd": -29001
                },
                "m": {
                    "br": 192000,
                    "fid": 0,
                    "size": 7308909,
                    "vd": -26374
                },
                "l": {
                    "br": 128000,
                    "fid": 0,
                    "size": 4872621,
                    "vd": -24646
                },
                "a": null,
                "cd": "01",
                "no": 1,
                "rtUrl": null,
                "ftype": 0,
                "rtUrls": [],
                "djId": 0,
                "copyright": 0,
                "s_id": 0,
                "mark": 262144,
                "rtype": 0,
                "rurl": null,
                "mst": 9,
                "cp": 1416532,
                "mv": 0,
                "publishTime": 0,
                "alg": "alg_featured"
            },
            {
                "name": "朋友请听好 (谢娜版)",
                "id": 1433313357,
                "pst": 0,
                "t": 0,
                "ar": [
                    {
                        "id": 9960,
                        "name": "谢娜",
                        "tns": [],
                        "alias": []
                    },
                    {
                        "id": 34435690,
                        "name": "朋友请听好",
                        "tns": [],
                        "alias": []
                    }
                ],
                "alia": [
                    "综艺《朋友请听好》主题曲"
                ],
                "pop": 100,
                "st": 0,
                "rt": "",
                "fee": 8,
                "v": 3,
                "crbt": null,
                "cf": "",
                "al": {
                    "id": 86765654,
                    "name": "朋友请听好 (谢娜版)",
                    "picUrl": "http://p1.music.126.net/A_1yN6JfaEoLixhl-3yBIg==/109951164833209811.jpg",
                    "tns": [],
                    "pic_str": "109951164833209811",
                    "pic": 109951164833209810
                },
                "dt": 230069,
                "h": {
                    "br": 320000,
                    "fid": 0,
                    "size": 9205485,
                    "vd": 4483
                },
                "m": {
                    "br": 192000,
                    "fid": 0,
                    "size": 5523309,
                    "vd": 7082
                },
                "l": {
                    "br": 128000,
                    "fid": 0,
                    "size": 3682221,
                    "vd": 8806
                },
                "a": null,
                "cd": "01",
                "no": 0,
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
                "cp": 1416697,
                "mv": 0,
                "publishTime": 0,
                "alg": "alg_featured"
            },
            {
                "name": "离弦曲",
                "id": 1433285784,
                "pst": 0,
                "t": 0,
                "ar": [
                    {
                        "id": 31862479,
                        "name": "国风堂",
                        "tns": [],
                        "alias": []
                    },
                    {
                        "id": 10142,
                        "name": "玄觞",
                        "tns": [],
                        "alias": []
                    }
                ],
                "alia": [
                    "独家国风音乐企划《侠·心》"
                ],
                "pop": 100,
                "st": 0,
                "rt": "",
                "fee": 8,
                "v": 4,
                "crbt": null,
                "cf": "",
                "al": {
                    "id": 86763316,
                    "name": "离弦曲",
                    "picUrl": "http://p1.music.126.net/mZLuvxN7ookXabF88h3qmg==/109951164833408746.jpg",
                    "tns": [],
                    "pic_str": "109951164833408746",
                    "pic": 109951164833408750
                },
                "dt": 255633,
                "h": {
                    "br": 320000,
                    "fid": 0,
                    "size": 10227505,
                    "vd": -26982
                },
                "m": {
                    "br": 192000,
                    "fid": 0,
                    "size": 6136520,
                    "vd": -24409
                },
                "l": {
                    "br": 128000,
                    "fid": 0,
                    "size": 4091028,
                    "vd": -22786
                },
                "a": null,
                "cd": "01",
                "no": 0,
                "rtUrl": null,
                "ftype": 0,
                "rtUrls": [],
                "djId": 0,
                "copyright": 0,
                "s_id": 0,
                "mark": 0,
                "rtype": 0,
                "rurl": null,
                "mst": 9,
                "cp": 0,
                "mv": 0,
                "publishTime": 0,
                "alg": "alg_featured"
            },
            {
                "name": "山河无恙在我胸",
                "id": 1433569777,
                "pst": 0,
                "t": 0,
                "ar": [
                    {
                        "id": 12932368,
                        "name": "蔡徐坤",
                        "tns": [],
                        "alias": []
                    },
                    {
                        "id": 190298,
                        "name": "佟丽娅",
                        "tns": [],
                        "alias": []
                    }
                ],
                "alia": [],
                "pop": 100,
                "st": 0,
                "rt": "",
                "fee": 0,
                "v": 4,
                "crbt": null,
                "cf": "",
                "al": {
                    "id": 86791046,
                    "name": "山河无恙在我胸",
                    "picUrl": "http://p1.music.126.net/fWVEGUfQSQGlQloTTsM8Qw==/109951164834732865.jpg",
                    "tns": [],
                    "pic_str": "109951164834732865",
                    "pic": 109951164834732860
                },
                "dt": 290080,
                "h": {
                    "br": 320000,
                    "fid": 0,
                    "size": 11605485,
                    "vd": -69355
                },
                "m": {
                    "br": 192000,
                    "fid": 0,
                    "size": 6963309,
                    "vd": -66806
                },
                "l": {
                    "br": 128000,
                    "fid": 0,
                    "size": 4642221,
                    "vd": -65275
                },
                "a": null,
                "cd": "01",
                "no": 0,
                "rtUrl": null,
                "ftype": 0,
                "rtUrls": [],
                "djId": 0,
                "copyright": 0,
                "s_id": 0,
                "mark": 0,
                "rtype": 0,
                "rurl": null,
                "mst": 9,
                "cp": -1,
                "mv": 10923354,
                "publishTime": 0,
                "alg": "alg_featured"
            },
            {
                "name": "独立个体",
                "id": 1429674667,
                "pst": 0,
                "t": 0,
                "ar": [
                    {
                        "id": 12077204,
                        "name": "陈壹千",
                        "tns": [],
                        "alias": []
                    }
                ],
                "alia": [],
                "pop": 100,
                "st": 0,
                "rt": "",
                "fee": 8,
                "v": 4,
                "crbt": null,
                "cf": "",
                "al": {
                    "id": 86375847,
                    "name": "独立个体",
                    "picUrl": "http://p1.music.126.net/6HJbWem-9SFHhpPmgbV91g==/109951164788389455.jpg",
                    "tns": [],
                    "pic_str": "109951164788389455",
                    "pic": 109951164788389460
                },
                "dt": 213133,
                "h": {
                    "br": 320000,
                    "fid": 0,
                    "size": 8527725,
                    "vd": -45357
                },
                "m": {
                    "br": 192000,
                    "fid": 0,
                    "size": 5116653,
                    "vd": -42780
                },
                "l": {
                    "br": 128000,
                    "fid": 0,
                    "size": 3411117,
                    "vd": -41092
                },
                "a": null,
                "cd": "01",
                "no": 0,
                "rtUrl": null,
                "ftype": 0,
                "rtUrls": [],
                "djId": 0,
                "copyright": 0,
                "s_id": 0,
                "mark": 0,
                "rtype": 0,
                "rurl": null,
                "mst": 9,
                "cp": 0,
                "mv": 0,
                "publishTime": 0,
                "alg": "alg_featured"
            },
            {
                "name": "醒",
                "id": 1434398348,
                "pst": 0,
                "t": 0,
                "ar": [
                    {
                        "id": 12105057,
                        "name": "苏诗丁",
                        "tns": [],
                        "alias": []
                    }
                ],
                "alia": [
                    "电视剧《民国奇探》片尾曲"
                ],
                "pop": 100,
                "st": 0,
                "rt": "",
                "fee": 8,
                "v": 4,
                "crbt": null,
                "cf": "",
                "al": {
                    "id": 86881445,
                    "name": "醒",
                    "picUrl": "http://p1.music.126.net/O-oF8R1IbSOPyhAih6pCxw==/109951164845024543.jpg",
                    "tns": [],
                    "pic_str": "109951164845024543",
                    "pic": 109951164845024540
                },
                "dt": 180048,
                "h": {
                    "br": 320000,
                    "fid": 0,
                    "size": 7203885,
                    "vd": -36858
                },
                "m": {
                    "br": 192000,
                    "fid": 0,
                    "size": 4322349,
                    "vd": -34260
                },
                "l": {
                    "br": 128000,
                    "fid": 0,
                    "size": 2881581,
                    "vd": -32567
                },
                "a": null,
                "cd": "01",
                "no": 1,
                "rtUrl": null,
                "ftype": 0,
                "rtUrls": [],
                "djId": 0,
                "copyright": 0,
                "s_id": 0,
                "mark": 0,
                "rtype": 0,
                "rurl": null,
                "mst": 9,
                "cp": 1416740,
                "mv": 10923709,
                "publishTime": 0,
                "alg": "alg_featured"
            },
            {
                "name": "葡萄架下的篝火",
                "id": 1433537418,
                "pst": 0,
                "t": 0,
                "ar": [
                    {
                        "id": 12127564,
                        "name": "艾福杰尼",
                        "tns": [],
                        "alias": []
                    }
                ],
                "alia": [],
                "pop": 100,
                "st": 0,
                "rt": "",
                "fee": 8,
                "v": 4,
                "crbt": null,
                "cf": "",
                "al": {
                    "id": 86788395,
                    "name": "葡萄架下的篝火",
                    "picUrl": "http://p1.music.126.net/jNy3N3Pr6wTflakF4IuDiw==/109951164834335369.jpg",
                    "tns": [],
                    "pic_str": "109951164834335369",
                    "pic": 109951164834335380
                },
                "dt": 236288,
                "h": {
                    "br": 320000,
                    "fid": 0,
                    "size": 9454125,
                    "vd": -45206
                },
                "m": {
                    "br": 192000,
                    "fid": 0,
                    "size": 5672493,
                    "vd": -42609
                },
                "l": {
                    "br": 128000,
                    "fid": 0,
                    "size": 3781677,
                    "vd": -40954
                },
                "a": null,
                "cd": "01",
                "no": 0,
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
                "cp": 1416732,
                "mv": 10922723,
                "publishTime": 0,
                "alg": "alg_featured"
            },
            {
                "name": "心墙 (改编版)",
                "id": 1434386699,
                "pst": 0,
                "t": 0,
                "ar": [
                    {
                        "id": 33135621,
                        "name": "鸣小明",
                        "tns": [],
                        "alias": []
                    }
                ],
                "alia": [],
                "pop": 100,
                "st": 0,
                "rt": "",
                "fee": 8,
                "v": 7,
                "crbt": null,
                "cf": "",
                "al": {
                    "id": 86881253,
                    "name": "心墙 (改编版)",
                    "picUrl": "http://p1.music.126.net/uHTufOJ8aV8ByI7Xz99HLg==/109951164850924231.jpg",
                    "tns": [],
                    "pic_str": "109951164850924231",
                    "pic": 109951164850924220
                },
                "dt": 200322,
                "h": {
                    "br": 320000,
                    "fid": 0,
                    "size": 8015085,
                    "vd": -35945
                },
                "m": {
                    "br": 192000,
                    "fid": 0,
                    "size": 4809069,
                    "vd": -33331
                },
                "l": {
                    "br": 128000,
                    "fid": 0,
                    "size": 3206061,
                    "vd": -31612
                },
                "a": null,
                "cd": "01",
                "no": 0,
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
                "cp": 1416741,
                "mv": 0,
                "publishTime": 0,
                "alg": "alg_featured"
            },
            {
                "name": "少年行",
                "id": 1434281676,
                "pst": 0,
                "t": 0,
                "ar": [
                    {
                        "id": 1047015,
                        "name": "张艺兴",
                        "tns": [],
                        "alias": []
                    }
                ],
                "alia": [
                    "《梦幻西游》手游张艺兴代言推广曲"
                ],
                "pop": 100,
                "st": 0,
                "rt": "",
                "fee": 0,
                "v": 4,
                "crbt": null,
                "cf": "",
                "al": {
                    "id": 86864483,
                    "name": "少年行",
                    "picUrl": "http://p1.music.126.net/faaOH6HZZULuULrdCBaHlA==/109951164843699888.jpg",
                    "tns": [],
                    "pic_str": "109951164843699888",
                    "pic": 109951164843699890
                },
                "dt": 194746,
                "h": {
                    "br": 320000,
                    "fid": 0,
                    "size": 7792893,
                    "vd": -66408
                },
                "m": {
                    "br": 192000,
                    "fid": 0,
                    "size": 4675753,
                    "vd": -63805
                },
                "l": {
                    "br": 128000,
                    "fid": 0,
                    "size": 3117183,
                    "vd": -62199
                },
                "a": null,
                "cd": "01",
                "no": 1,
                "rtUrl": null,
                "ftype": 0,
                "rtUrls": [],
                "djId": 0,
                "copyright": 0,
                "s_id": 0,
                "mark": 0,
                "rtype": 0,
                "rurl": null,
                "mst": 9,
                "cp": 0,
                "mv": 10923837,
                "publishTime": 0,
                "alg": "alg_featured"
            },
            {
                "name": "你的色彩",
                "id": 1434057050,
                "pst": 0,
                "t": 0,
                "ar": [
                    {
                        "id": 33630350,
                        "name": "声入人心男团 Super Vocal",
                        "tns": [],
                        "alias": []
                    }
                ],
                "alia": [],
                "pop": 100,
                "st": 0,
                "rt": "",
                "fee": 8,
                "v": 3,
                "crbt": null,
                "cf": "",
                "al": {
                    "id": 86840069,
                    "name": "你的色彩",
                    "picUrl": "http://p1.music.126.net/sHGpFM_nB61mOQo1IEr2uw==/109951164840781495.jpg",
                    "tns": [],
                    "pic_str": "109951164840781495",
                    "pic": 109951164840781490
                },
                "dt": 240404,
                "h": {
                    "br": 320000,
                    "fid": 0,
                    "size": 9617285,
                    "vd": -46059
                },
                "m": {
                    "br": 192000,
                    "fid": 0,
                    "size": 5770388,
                    "vd": -43487
                },
                "l": {
                    "br": 128000,
                    "fid": 0,
                    "size": 3846940,
                    "vd": -41737
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
                "mark": 8192,
                "rtype": 0,
                "rurl": null,
                "mst": 9,
                "cp": 7003,
                "mv": 0,
                "publishTime": 1585238400000,
                "alg": "alg_featured"
            },
            {
                "name": "会紧张",
                "id": 1433270731,
                "pst": 0,
                "t": 0,
                "ar": [
                    {
                        "id": 12333145,
                        "name": "DP龙猪",
                        "tns": [],
                        "alias": []
                    },
                    {
                        "id": 1142042,
                        "name": "徐梦圆",
                        "tns": [],
                        "alias": []
                    },
                    {
                        "id": 12084020,
                        "name": "嘿人李逵Noisemakers",
                        "tns": [],
                        "alias": []
                    }
                ],
                "alia": [],
                "pop": 100,
                "st": 0,
                "rt": "",
                "fee": 8,
                "v": 4,
                "crbt": null,
                "cf": "",
                "al": {
                    "id": 86762763,
                    "name": "会紧张",
                    "picUrl": "http://p1.music.126.net/aLSS_dfTjwwC_OjcXldoiA==/109951164830921763.jpg",
                    "tns": [],
                    "pic_str": "109951164830921763",
                    "pic": 109951164830921760
                },
                "dt": 186666,
                "h": {
                    "br": 320000,
                    "fid": 0,
                    "size": 7468974,
                    "vd": -69254
                },
                "m": {
                    "br": 192000,
                    "fid": 0,
                    "size": 4481402,
                    "vd": -66692
                },
                "l": {
                    "br": 128000,
                    "fid": 0,
                    "size": 2987616,
                    "vd": -65140
                },
                "a": null,
                "cd": "01",
                "no": 0,
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
                "cp": 1416499,
                "mv": 0,
                "publishTime": 0,
                "alg": "alg_featured"
            },
            {
                "name": "Like U",
                "id": 1434293647,
                "pst": 0,
                "t": 0,
                "ar": [
                    {
                        "id": 31051426,
                        "name": "杨胖雨",
                        "tns": [],
                        "alias": []
                    }
                ],
                "alia": [],
                "pop": 100,
                "st": 0,
                "rt": "",
                "fee": 8,
                "v": 3,
                "crbt": null,
                "cf": "",
                "al": {
                    "id": 86865401,
                    "name": "Eighteen",
                    "picUrl": "http://p1.music.126.net/-dq8WLPTVFpvrnvYsrl_Sg==/109951164843983261.jpg",
                    "tns": [],
                    "pic_str": "109951164843983261",
                    "pic": 109951164843983260
                },
                "dt": 228999,
                "h": {
                    "br": 320000,
                    "fid": 0,
                    "size": 9162754,
                    "vd": -69142
                },
                "m": {
                    "br": 192000,
                    "fid": 0,
                    "size": 5497670,
                    "vd": -66603
                },
                "l": {
                    "br": 128000,
                    "fid": 0,
                    "size": 3665128,
                    "vd": -65012
                },
                "a": null,
                "cd": "01",
                "no": 1,
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
                "cp": 1416517,
                "mv": 0,
                "publishTime": 0,
                "alg": "alg_featured"
            },
            {
                "name": "让我拥抱你",
                "id": 1433983534,
                "pst": 0,
                "t": 0,
                "ar": [
                    {
                        "id": 711683,
                        "name": "好妹妹",
                        "tns": [],
                        "alias": []
                    }
                ],
                "alia": [
                    "好妹妹十周年主题曲"
                ],
                "pop": 100,
                "st": 0,
                "rt": "",
                "fee": 8,
                "v": 3,
                "crbt": null,
                "cf": "",
                "al": {
                    "id": 86834073,
                    "name": "让我拥抱你",
                    "picUrl": "http://p1.music.126.net/cXdv6C6fSpJprPvbvi7rtw==/109951164839955765.jpg",
                    "tns": [],
                    "pic_str": "109951164839955765",
                    "pic": 109951164839955760
                },
                "dt": 292216,
                "h": {
                    "br": 320000,
                    "fid": 0,
                    "size": 11690925,
                    "vd": -36950
                },
                "m": {
                    "br": 192000,
                    "fid": 0,
                    "size": 7014573,
                    "vd": -34383
                },
                "l": {
                    "br": 128000,
                    "fid": 0,
                    "size": 4676397,
                    "vd": -32785
                },
                "a": null,
                "cd": "01",
                "no": 1,
                "rtUrl": null,
                "ftype": 0,
                "rtUrls": [],
                "djId": 0,
                "copyright": 0,
                "s_id": 0,
                "mark": 0,
                "rtype": 0,
                "rurl": null,
                "mst": 9,
                "cp": 1416476,
                "mv": 0,
                "publishTime": 0,
                "alg": "alg_featured"
            },
            {
                "name": "错的人",
                "id": 1434319901,
                "pst": 0,
                "t": 0,
                "ar": [
                    {
                        "id": 5350,
                        "name": "吴克群",
                        "tns": [],
                        "alias": []
                    }
                ],
                "alia": [
                    "电视剧《爱情的开关》插曲"
                ],
                "pop": 100,
                "st": 0,
                "rt": "",
                "fee": 8,
                "v": 3,
                "crbt": null,
                "cf": "",
                "al": {
                    "id": 86868479,
                    "name": "错的人",
                    "picUrl": "http://p1.music.126.net/e0xzbS2IItdDlfN6dUpv-Q==/109951164844216881.jpg",
                    "tns": [],
                    "pic_str": "109951164844216881",
                    "pic": 109951164844216880
                },
                "dt": 266746,
                "h": {
                    "br": 320000,
                    "fid": 0,
                    "size": 10672365,
                    "vd": -38644
                },
                "m": {
                    "br": 192000,
                    "fid": 0,
                    "size": 6403437,
                    "vd": -36043
                },
                "l": {
                    "br": 128000,
                    "fid": 0,
                    "size": 4268973,
                    "vd": -34394
                },
                "a": null,
                "cd": "01",
                "no": 1,
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
                "cp": 1397819,
                "mv": 0,
                "publishTime": 0,
                "alg": "alg_featured"
            },
            {
                "name": "Inner Voice 心仓万籁",
                "id": 1433585458,
                "pst": 0,
                "t": 0,
                "ar": [
                    {
                        "id": 1137391,
                        "name": "雷雨心",
                        "tns": [],
                        "alias": []
                    }
                ],
                "alia": [],
                "pop": 100,
                "st": 0,
                "rt": "",
                "fee": 8,
                "v": 2,
                "crbt": null,
                "cf": "",
                "al": {
                    "id": 86792402,
                    "name": "Inner Voice 心仓万籁",
                    "picUrl": "http://p1.music.126.net/n8V-5DWFKm5NK95PEaVOTQ==/109951164834858953.jpg",
                    "tns": [],
                    "pic_str": "109951164834858953",
                    "pic": 109951164834858960
                },
                "dt": 255000,
                "h": {
                    "br": 320000,
                    "fid": 0,
                    "size": 10202925,
                    "vd": -52069
                },
                "m": {
                    "br": 192000,
                    "fid": 0,
                    "size": 6121773,
                    "vd": -49465
                },
                "l": {
                    "br": 128000,
                    "fid": 0,
                    "size": 4081197,
                    "vd": -47706
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
                "mark": 0,
                "rtype": 0,
                "rurl": null,
                "mst": 9,
                "cp": 22036,
                "mv": 0,
                "publishTime": 1585065600000,
                "alg": "alg_featured"
            }
        ],
        "trackIds": [
            {
                "id": 1434062381,
                "v": -10000,
                "alg": "alg_featured"
            },
            {
                "id": 1432492654,
                "v": -10000,
                "alg": "alg_featured"
            },
            {
                "id": 1433507200,
                "v": -10000,
                "alg": "alg_featured"
            },
            {
                "id": 1433060985,
                "v": -10000,
                "alg": "alg_featured"
            },
            {
                "id": 1433274839,
                "v": -10000,
                "alg": "alg_featured"
            },
            {
                "id": 1432716793,
                "v": -10000,
                "alg": "alg_featured"
            },
            {
                "id": 1433313357,
                "v": -10000,
                "alg": "alg_featured"
            },
            {
                "id": 1433285784,
                "v": -10000,
                "alg": "alg_featured"
            },
            {
                "id": 1433569777,
                "v": -10000,
                "alg": "alg_featured"
            },
            {
                "id": 1429674667,
                "v": -10000,
                "alg": "alg_featured"
            },
            {
                "id": 1434398348,
                "v": -10000,
                "alg": "alg_featured"
            },
            {
                "id": 1433537418,
                "v": -10000,
                "alg": "alg_featured"
            },
            {
                "id": 1434386699,
                "v": -10000,
                "alg": "alg_featured"
            },
            {
                "id": 1434281676,
                "v": -10000,
                "alg": "alg_featured"
            },
            {
                "id": 1434057050,
                "v": -10000,
                "alg": "alg_featured"
            },
            {
                "id": 1433270731,
                "v": -10000,
                "alg": "alg_featured"
            },
            {
                "id": 1434293647,
                "v": -10000,
                "alg": "alg_featured"
            },
            {
                "id": 1433983534,
                "v": -10000,
                "alg": "alg_featured"
            },
            {
                "id": 1434319901,
                "v": -10000,
                "alg": "alg_featured"
            },
            {
                "id": 1433585458,
                "v": -10000,
                "alg": "alg_featured"
            }
        ],
        "updateFrequency": "每周一更新",
        "backgroundCoverId": 109951164854543840,
        "backgroundCoverUrl": "http://p2.music.126.net/9ZF0HO_eRDyQesrpnPjZFg==/109951164854543839.jpg",
        "titleImage": 109951164387895120,
        "titleImageUrl": "http://p2.music.126.net/86_5GVDrYZOU8cgVRc4ycA==/109951164387895115.jpg",
        "englishTitle": "C-pop",
        "opRecommend": false,
        "ordered": true,
        "status": 0,
        "adType": 0,
        "trackNumberUpdateTime": 1585497600000,
        "description": "优质华语新歌，网易云音乐每周二精选推荐。\n本周封面：周深",
        "trackUpdateTime": 1585750952983,
        "subscribedCount": 3644787,
        "cloudTrackCount": 0,
        "tags": [
            "华语"
        ],
        "createTime": 1505779515127,
        "highQuality": false,
        "updateTime": 1585568283426,
        "coverImgId": 109951164854549220,
        "newImported": false,
        "specialType": 100,
        "commentThreadId": "A_PL_0_924680166",
        "coverImgUrl": "http://p1.music.126.net/njthCVBccXZ4QpPYHIrNCQ==/109951164854549224.jpg",
        "userId": 1,
        "trackCount": 20,
        "privacy": 0,
        "playCount": 780210368,
        "name": "[华语速爆新歌] 最新华语音乐推荐",
        "id": 924680166,
        "shareCount": 23732,
        "coverImgId_str": "109951164854549224",
        "commentCount": 53605
    }
    }
  }
  formatPlayCount = count =>{
    return count < 10000 ? count : `${Number(count/10000).toFixed(0)}万`
  }
  componentWillReceiveProps(nextProps) {
    console.log(this.props, nextProps);
  }

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  render() {
    const { playListDetail } = this.state
    if (!playListDetail) return
    return (
      <View className="playListDetail_container">
        <View className='playList__header'>
          <Image
            className='playList__header__bg'
            src={playListDetail.coverImgUrl}
          />
          <View className='playList__header__cover'>
            <Image
              className='playList__header__cover__img'
              src={playListDetail.coverImgUrl}
            />
            <Text className='playList__header__cover__desc'>歌单</Text>
            <View className='playList__header__cover__num'>
              <Text className='at-icon at-icon-sound'></Text>
              {
                this.formatPlayCount(playListDetail.playCount)
              }
            </View>
          </View>
          <View className='playList__header__info'>
            <View className='playList__header__info__title'>
              {playListDetail.name}
            </View>
            <View className='playList__header__info__user'>
              <Image
                className='playList__header__info__user_avatar'
                src={playListDetail.creator.avatarUrl}
              />
              {playListDetail.creator.nickname}
            </View>
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
