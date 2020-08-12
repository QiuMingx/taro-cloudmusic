import {
  GETRECOMMENDPLAYLIST,
  RESETPLAYLIST,
  GETPLAYLISTDETAIL,
  GETSONGINFO
} from '../constants/song'
import api from '../services/api'
import { parse_lrc } from '../utils/common'

export const add = () => {
  return {
    type: ADD
  }
}
export const minus = () => {
  return {
    type: MINUS
  }
}

// 异步的action
export function asyncAdd () {
  return dispatch => {
    setTimeout(() => {
      dispatch(add())
    }, 2000)
  }
}
// 装换为二维数组
const songsList = function(list){
    const items =[]
    list.forEach((item,index)=>{
      const children = Math.floor(index / 3)
      if(!items[children]){
        items[children]= []
      }
      items[children].push(item)
    })
    return items
}

// 获取推荐歌单 - 推荐歌曲
export const getRecommendPlayList = () => {
  return dispatch => {
    api.get('/personalized').then((res) => {
      let recommendPlayList = res.data.result
      api.get('/playlist/detail', {
        id:recommendPlayList[0].id
      }).then((res) => {
        let recommendSongList = res.data.playlist
        recommendSongList.tracks = recommendSongList.tracks.map((item) => {
          let temp: any = {}
          temp.name = item.name
          temp.id = item.id
          temp.ar = item.ar
          temp.al = item.al
          temp.copyright = item.copyright
          return temp
        })
        recommendSongList.tracks =  songsList(recommendSongList.tracks.slice(0,9))
        dispatch({
          type: GETRECOMMENDPLAYLIST,
          payload: {
            recommendSongList,
            recommendPlayList
          }
        })
      })
    })
  }
}
// 获取歌单详情
export const getPlayListDetail = (payload) => {
  const { id } = payload
  return dispatch => {
    dispatch({
      type: RESETPLAYLIST,
    })
    api.get('/playlist/detail', {
      id
    }).then((res) => {
      let playListDetailInfo = res.data.playlist
      playListDetailInfo.tracks = playListDetailInfo.tracks.map((item) => {
        let temp: any = {}
        temp.name = item.name
        temp.id = item.id
        temp.ar = item.ar
        temp.al = item.al
        temp.copyright = item.copyright
        return temp
      })
      dispatch({
        type: GETPLAYLISTDETAIL,
        payload: {
          playListDetailInfo,
          playListDetailPrivileges: res.data.privileges
        }
      })
    })
  }
}

// 获取歌曲详情信息
export const getSongInfo = (payload) => {
  const { id } = payload
  return dispatch => {
    api.get('/song/detail', {
      ids: id
    }).then((res) => {
      let songInfo = res.data.songs[0]
      api.get('/song/url', {
        id
      }).then((res) => {
        songInfo.url = res.data.data[0].url
        api.get('/lyric', {
          id
        }).then((res) => {
          const lrc = parse_lrc(res.data.lrc && res.data.lrc.lyric ? res.data.lrc.lyric : '');
          res.data.lrclist = lrc.now_lrc;
          res.data.scroll = lrc.scroll ? 1 : 0
          songInfo.lrcInfo = res.data
          dispatch({
            type: GETSONGINFO,
            payload: {
              currentSongInfo: songInfo
            }
          })
        }).catch((err) => {
          console.log('获取歌词失败', err)
          dispatch({
            type: GETSONGINFO,
            payload: {
              currentSongInfo: songInfo
            }
          })
        })
      }).catch((err) => {
        console.log('获取歌曲url失败', err)
        dispatch({
          type: GETSONGINFO,
          payload: {
            currentSongInfo: songInfo
          }
        })
      })
    })
  }
}
