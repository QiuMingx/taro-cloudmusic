import {
  GETRECOMMENDPLAYLIST,
  RESETPLAYLIST,
  GETPLAYLISTDETAIL
} from '../constants/song'

const INITIAL_STATE = {
  playListDetailInfo: {
    coverImgUrl: '',
    name: '',
    playCount: 0,
    tags: [],
    creator: {
      avatarUrl: '',
      nickname: ''
    },
    tracks: []
  },
  canPlayList: [],
  playListDetailPrivileges: [],
  recommendPlayList: [],
  recommendDj: [],
  recommendNewSong: [],
  recommend: [],
  myCreateList: [],
  myCollectList: [],
  currentSongId: '',
  currentSongInfo: {
    id: 0,
    name: '',
    ar: [],
    al: {
      picUrl: '',
      name: ''
    },
    url: '',
    lrcInfo: '',
    dt: 0, // 总时长，ms
    st: 0 // 是否喜欢
  },
  currentSongIndex: 0,
  playMode: 'loop',
  likeMusicList: [],
  isPlaying: false,
  recentTab: 0
}

export default function song (state = INITIAL_STATE, action) {
  switch (action.type) {
      // 获取歌单详情
     case GETRECOMMENDPLAYLIST:
       const { recommendPlayList } = action.payload
       return {
         ...state,
         recommendPlayList
       }
     // 获取歌单详情
     case GETPLAYLISTDETAIL:
       const { playListDetailInfo, playListDetailPrivileges } = action.payload
       let canPlayList = playListDetailInfo.tracks.filter((_, index) => {
         return playListDetailPrivileges[index].st !== -200
       })
       return {
         ...state,
         playListDetailInfo,
         playListDetailPrivileges,
         canPlayList
       }
     case RESETPLAYLIST:
      return {
        ...state,
        playListDetailInfo: INITIAL_STATE.playListDetailInfo,
        playListDetailPrivileges: [],
        canPlayList: []
      }
     default:
       return state
  }
}
