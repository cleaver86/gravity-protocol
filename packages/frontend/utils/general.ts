export const getPersonalLtvColor = (ltv:number, recoveryMode = false) => {
  if (recoveryMode) {
    if (ltv < 40) {
      return '#19F785'
    } else if (ltv < 55) {
      return '#F7AB19'
    } else {
      return '#FF505E'
    }
  } else {
    if (ltv < 55) {
      return '#19F785'
    } else if (ltv < 75) {
      return '#F7AB19'
    } else {
      return '#FF505E'
    }
  }
}

export const getSystemLtvColor = (ltv:number) => {
  if (ltv < 50) {
    return '#19F785'
  } else if (ltv < 60) {
    return '#F7AB19'
  } else {
    return '#FF505E'
  }
}