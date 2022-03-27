import React, { FC } from 'react';
import s from './DayInfoItem.module.scss';
import { IItem } from 'prebuild/interfaces/IItem';
import IndicatorSvgSelector from 'prebuild/assets/icons/IndicatorSvgSelector';

type DayInfoItemProps = {
  readonly item: IItem;
};

const DayInfoItem: FC<DayInfoItemProps> = (
  {
    item: { icon_id, name, value },
  }) => {
  return (
    <div className={s.root}>
      <div className={s.root__wrapper}>
        <div className={s.root__icon}><IndicatorSvgSelector id={icon_id} /></div>
        <div className={s.root__name}>{name}</div>
      </div>
      <div className={s.root__value}>{value}</div>
    </div>
  );
};

export default DayInfoItem;
