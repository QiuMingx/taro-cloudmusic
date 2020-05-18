import Taro, { FC } from '@tarojs/taro'
import { View, Slider } from '@tarojs/components'

import './index.less'

type Props = {
  percent: number,
  onChange: (object) => any,
  onChanging: (object) => any
}

 const CSlider: FC<Props> = ({ percent }) => {
  return (
    <View className='slider_components'>
        {/* <Text className='time-left'>{timeLengthFormator(currentyTime*1000)}</Text> */}
        <Slider step={0.01} value={percent} activeColor='#d43c33' blockColor='#fff' blockSize={10} onChange={(e) => this.props.onChange(e)} onChanging={(e) => this.props.onChanging(e) }></Slider>
        {/* <Text className='time-right'>{timeLengthFormator(currentSongInfo.dt)}</Text> */}
    </View>
    // <View className='slider_components'>
    //   <Slider value={percent} blockSize={15} activeColor='#d43c33' onChange={(e) => this.props.onChange(e)} onChanging={(e) => this.props.onChanging(e) } />
    // </View>
  )
}

export default CSlider
