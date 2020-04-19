import Taro, { FC } from '@tarojs/taro'
import { View, Slider } from '@tarojs/components'

import './index.less'

type Props = {
  source: Array<{
    picUrl: string,
    id: number,
    name:string,
    playCount:number
  }>,
  goDetail: (object) => any,
  onChanging: (object) => any
}

 const PlayList: FC<Props> = ({ source }) => {

   function formatPlayCount (count){
     return count < 10000 ? count : `${Number(count/10000).toFixed(0)}万`
   }
  return (
    <View className='recommend_playlist__content'>
      {
        source&&source.map(item =>
          <View className='recommend_playlist__item' key={item.id} onClick={()=>this.props.goDetail(item)}>
            <Image
                src={item.picUrl+'?imageView&thumbnail=0x200'}
                className='recommend_playlist__item__img'
              />
              <View className='recommend_playlist__item__cover__num'>
                 <Text className='at-icon at-icon-sound'></Text>
                {formatPlayCount(item.playCount)}
              </View>
              <View className='recommend_playlist__item__title'>{item.name}</View>
          </View>)
      }
    </View>
  )
}

export default PlayList
