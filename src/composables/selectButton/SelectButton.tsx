import React, { useCallback } from 'react'
import { useCryptoContext } from '../../context/CryptoContext';

import styles from './selectButton.module.scss'


interface SelectButtonProps {
  day: {
    label: string;
    value: number;
  };
  selected: boolean;
}



export const SelectButton: React.FC <SelectButtonProps> = React.memo(({day, selected}) => {
  const {setDays} = useCryptoContext()
  const onChangeChartDays = useCallback(() => {
    setDays(day.value)
  }, [setDays, day.value])

  return (
    <button
      className={`${styles.button} ${selected ? styles.button__select : ''}`}
      onClick={onChangeChartDays}
    >{day.label}</button>
  )
})
