import { Box, Button, Divider, Flex, SimpleGrid, Text } from '@chakra-ui/react'
import Alert from './Alert'
import Label from './Label'

const SummaryLabel = ({ children, muted, tooltip, visible }) => (
  <>
    {visible && (
      <Flex minHeight="35px">
        <Label
          textTransform="capitalize"
          orientation="horizontal"
          color={muted ? 'gray.300' : 'gray.100'}
          fontWeight="medium"
          fontSize="md"
          tooltip={tooltip}
          info
        >
          {children}
        </Label>
      </Flex>
    )}
  </>
)

SummaryLabel.defaultProps = {
  visible: true,
}

const SummaryText = ({ children, align, fontSize, muted, visible }) => (
  <>
    {visible && (
      <Flex minHeight="35px" justifyContent={align ? align : 'left'}>
        <Text
          paddingTop={fontSize === 'sm' && '2px'}
          fontSize={fontSize}
          fontWeight="medium"
          color={muted ? 'gray.300' : 'gray.100'}
        >
          {children}
        </Text>
      </Flex>
    )}
  </>
)

SummaryText.defaultProps = {
  visible: true,
}

/**
 * Component
 */
function Summary({ items, additionalItems, proceedText, onProcced }) {
  return (
    <Box
      w="100%"
      padding="20px 30px 40px 30px"
      background="purple.900"
      borderRadius="10px"
    >
      <SimpleGrid templateColumns="2fr 1fr 50px" spacing="5px">
        <Box>
          {items.map((item) => (
            <SummaryLabel
              key={`${item.id}-label`}
              tooltip={item.tooltip}
              visible={item.visible}
            >
              {item.label}
            </SummaryLabel>
          ))}
        </Box>
        <Box>
          {items.map((item) => (
            <SummaryText
              key={`${item.id}-value`}
              visible={item.visible}
              align="right"
            >
              {item.value}
            </SummaryText>
          ))}
        </Box>
        <Box>
          {items.map((item) => (
            <SummaryText
              key={`${item.id}-symbol`}
              visible={item.visible}
              fontSize="sm"
            >
              {item.symbol}
            </SummaryText>
          ))}
        </Box>
      </SimpleGrid>
      {additionalItems.length > 0 && <Divider marginBottom="20px" />}
      <SimpleGrid
        templateColumns="2fr 1fr 50px"
        spacing="5px"
        marginBottom="20px"
      >
        <Box>
          {additionalItems.map((item) => (
            <SummaryLabel
              key={`${item.id}-label`}
              tooltip={item.tooltip}
              visible={item.visible}
              muted
            >
              {item.label}
            </SummaryLabel>
          ))}
        </Box>
        <Box>
          {additionalItems.map((item) => (
            <SummaryText key={`${item.id}-value`} align="right" muted>
              {item.value}
            </SummaryText>
          ))}
        </Box>
        <Box>
          {additionalItems.map((item) => (
            <SummaryText key={`${item.id}-symbol`} fontSize="sm" muted>
              {item.symbol}
            </SummaryText>
          ))}
        </Box>
      </SimpleGrid>
      {/* <Alert status="warning">LTV Warning Here</Alert> */}
      <Button w="100%" size="lg" borderRadius="40px" onClick={onProcced}>
        {proceedText}
      </Button>
    </Box>
  )
}

Summary.defaultProps = {
  items: [],
  additionalItems: [],
  proceedText: 'Proceed',
}

export default Summary
