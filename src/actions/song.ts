import {
  GETRECOMMENDPLAYLIST
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
