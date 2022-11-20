import React from 'react'

const SvgrMock = React.forwardRef((props, ref) => <svg ref={ref} {...props} />)
SvgrMock.displayName = 'svg'

export default SvgrMock

export const ReactComponent = SvgrMock
