import {
  GETRECOMMENDPLAYLIST,
  RESETPLAYLIST,
  GETPLAYLISTDETAIL
} from '../constants/song'
import api from '../services/api'

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
// 获取推荐歌单
export const getRecommendPlayList = () => {
  return dispatch => {
    api.get('/personalized').then((res) => {
      let recommendPlayList = res.data.result
      dispatch({
        type: GETRECOMMENDPLAYLIST,
        payload: {
          recommendPlayList
        }
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
