import {
  Slider,
  SliderFilledTrack,
  SliderMark,
  SliderThumb,
  SliderTrack,
} from '@chakra-ui/react'

/**
 * Component
 */
function LeverageSlider({ onChange }): JSX.Element {
  return (
    <Slider
      defaultValue={0}
      min={1}
      max={10}
      step={1}
      size="lg"
      marginTop="40px"
      onChange={onChange}
    >
      <SliderMark
        fontWeight="semibold"
        fontSize="sm"
        marginTop="15px"
        color="gray.300"
        value={1}
      >
        1X
      </SliderMark>
      <SliderMark
        fontWeight="semibold"
        fontSize="sm"
        marginTop="15px"
        color="gray.300"
        value={5}
      >
        5X
      </SliderMark>
      <SliderMark
        fontWeight="semibold"
        fontSize="sm"
        marginTop="15px"
        color="gray.300"
        value={10}
      >
        10X
      </SliderMark>
      <SliderTrack>
        <SliderFilledTrack />
      </SliderTrack>
      <SliderThumb bg="purple.300" />
    </Slider>
  )
}

export default LeverageSlider
