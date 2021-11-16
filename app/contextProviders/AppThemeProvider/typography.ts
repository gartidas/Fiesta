import { UseWindowSizeReturn } from '@hooks/useWindowSize'
import { TypographyOptions } from '@material-ui/core/styles/createTypography'

const desktopTypo: TypographyOptions = {
  h2: {
    fontSize: '3.75rem'
  },
  h4: {
    fontSize: '2.2rem'
  },
  h5: {
    fontSize: '1.7rem'
  },
  h6: {
    fontSize: '1.25rem'
  },
  body1: {
    fontSize: '0.98rem'
  },
  body2: {
    fontSize: '0.9rem'
  },
  subtitle1: {
    fontSize: '1.1rem'
  },
  subtitle2: {
    fontSize: '0.85rem'
  }
}

const tabletTypo: TypographyOptions = {
  h2: {
    fontSize: '3.45rem'
  },
  h4: {
    fontSize: '2rem'
  },
  h5: {
    fontSize: '1.5rem'
  },
  h6: {
    fontSize: '1.2rem'
  },
  body1: {
    fontSize: '0.93rem'
  },
  body2: {
    fontSize: '0.83rem'
  },
  subtitle1: {
    fontSize: '1rem'
  },
  subtitle2: {
    fontSize: '0.77rem'
  }
}

const mobileTypo: TypographyOptions = {
  h2: {
    fontSize: '3.2rem'
  },
  h4: {
    fontSize: '1.8rem'
  },
  h5: {
    fontSize: '1.3rem'
  },
  h6: {
    fontSize: '1.05rem'
  },
  body1: {
    fontSize: '0.875rem'
  },
  body2: {
    fontSize: '0.75rem'
  },
  subtitle1: {
    fontSize: '1rem'
  },
  subtitle2: {
    fontSize: '0.72rem'
  }
}

export const getTypographyOptions = ({
  maxMedium,
  maxSmall
}: UseWindowSizeReturn): TypographyOptions => {
  let newTypo: TypographyOptions = desktopTypo

  if (maxSmall) newTypo = mobileTypo
  else if (maxMedium) newTypo = tabletTypo

  return {
    button: {
      textTransform: 'none',
      fontWeight: 400
    },
    ...newTypo
  }
}
