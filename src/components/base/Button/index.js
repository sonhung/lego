/* eslint-disable react/button-has-type */
import { useButton } from '@react-aria/button'
import cn from 'classnames'
import { motion } from 'framer-motion'
import PropTypes from 'prop-types'
import { forwardRef, useImperativeHandle, useRef } from 'react'

import Spin from '../Spin'

const Button = forwardRef(
  (
    {
      href,
      type = 'button',
      disabled,
      label,
      loading,
      fullWidth = false,
      className,
      leftIcon,
      onPress,
      onPressStart,
      onPressEnd,
      clean = false,
      variant = 'primary',
      size = 'medium',
      ...props
    },
    ref
  ) => {
    const { children } = props

    const nativeButtonRef = useRef()
    const { buttonProps } = useButton(
      {
        isDisabled: disabled,
        onPress,
        onPressStart,
        onPressEnd,
        ...props,
        elementType: 'button',
      },
      nativeButtonRef
    )

    useImperativeHandle(ref, () => ({
      get nativeElement() {
        return nativeButtonRef.current
      },
    }))

    const sizeClassNames = cn({
      'h-6 text-xs': size === 'tiny',
      'h-8 text-sm leading-[18px]': size === 'small',
      'h-10 text-sm leading-[18px]': size === 'medium',
      'h-[60px] text-xs leading-[18px]': size === 'large',
    })

    const rootClassnames = !clean
      ? cn(
          'px-4 select-none transition-all duration-200 ease-linear inline-flex items-center justify-center',
          'rounded-lg shadow-drop',
          true && {
            'bg-primary text-white': variant === 'primary',
            'bg-dark-brown text-white': variant === 'secondary',
            'bg-white border border-primary text-primary': variant === 'outline',
            'border border-solid border-light-brown bg-white text-light-brown':
              variant === 'default',
            'bg-gradient-to-r from-[#00CCFF] to-[#78DBFF] text-white': variant === 'gradient',
            'bg-white text-primary border border-solid border-light-brown': variant === 'cancel',
          },
          {
            'w-full': fullWidth,
            'text-light-brown bg-light-gray': disabled,
          },
          className
        )
      : className

    const classes = cn(sizeClassNames, rootClassnames, 'font-bold outline-none focus:outline-none')

    return (
      <motion.button
        whileTap={{ scale: 1.1 }}
        disabled={disabled}
        ref={nativeButtonRef}
        className={classes}
        type={type}
        {...(type !== 'submit' ? buttonProps : {})}
      >
        <div className={cn('flex-center w-full')}>
          {loading && <Spin className="mr-2" size={20} />}
          {!loading && leftIcon && <div className="mr-2">{leftIcon}</div>}
          {label || children}
        </div>
      </motion.button>
    )
  }
)

Button.propTypes = {
  onPress: PropTypes.func,
  onPressEnd: PropTypes.func,
  onPressStart: PropTypes.func,
  className: PropTypes.string,
  variant: PropTypes.oneOf([
    'primary',
    'secondary',
    'default',
    'danger',
    'outline',
    'light',
    'subtle',
    'cancel',
  ]),
  size: PropTypes.oneOf(['tiny', 'small', 'medium', 'large']), //  24 / 32 / 40 / 48 px
  clean: PropTypes.bool,
  fullWidth: PropTypes.bool,
  loading: PropTypes.bool,
}
export default Button
