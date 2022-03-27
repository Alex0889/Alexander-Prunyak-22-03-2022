import { FC } from 'react';
import s from './Tabs.module.scss';
import clsx from 'clsx';
import { TabsState } from 'prebuild/interfaces/tabs';
import withTranslate from 'components/WithTranslate';
import { IWithTranslate } from 'prebuild/interfaces/IWithTranslate';
import Button from 'prebuild/components/Button';

interface TabProps {
  readonly handleTabChange: (key: TabsState) => void;
  readonly selectedTab: string;
}

const Tabs: FC<TabProps & IWithTranslate> = (
  {
    handleTabChange,
    selectedTab,
    t
  },
) => {
  const tabs = [
    { key: 'day' },
    { key: 'week' },
  ];

  const handleTabSelect = (key: TabsState) => {
    if (key !== selectedTab) {
      handleTabChange(key);
    }
  };

  const handleCancelBtn = () => {
    handleTabChange(tabs[0].key as TabsState);
  };

  return (
    <div className={s.root}>
      <div className={s.root__tabs}>
        {tabs.map((tab) => (
          <Button
            className={clsx(
              s.root__tab,
              tab.key === selectedTab && s.active
            )}
            key={tab.key}
            onClick={() => handleTabSelect(tab.key as TabsState)}
          >
            {t[tab.key]}
          </Button>
        ))}
      </div>
      <Button
        onClick={handleCancelBtn}
        className={clsx(s.cancel)}>
        {t['cancel']}
      </Button>
    </div>
  );
};

export default withTranslate(Tabs);
