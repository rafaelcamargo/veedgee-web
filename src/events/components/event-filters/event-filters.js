import { useState } from 'react';
import { Button } from '@src/base/components/button/button';
import { DebouncedInput } from '@src/base/components/debounced-input/debounced-input';
import { Drawer } from '@src/base/components/drawer/drawer';
import Funnel from '@src/base/icons/funnel';
import Loupe from '@src/base/icons/loupe';
import { useTranslation } from '@compilorama/polang';
import cityService from '@src/base/services/city';
import dateService from '@src/base/services/date';
import {
  CITY_FILTER_NAME,
  CATEGORY_FILTER_NAME,
  START_DATE_FILTER_NAME,
  END_DATE_FILTER_NAME,
  TITLE_FILTER_NAME
} from '@src/events/constants/event-filters';
import { useEventCategories } from '@src/events/hooks/use-event-categories';
import translations from './event-filters.t.js';

export const EventFilters = ({ filters, onChange }) => {
  const { t } = useTranslation(translations);
  const [isDrawerOpen, setDrawerVisibility] = useState(false);
  const closeDrawer = () => setDrawerVisibility(false);

  return (
    <div className="v-event-filters-wrapper">
      <Button
        theme="icon"
        className="v-event-filters-trigger"
        aria-label={t('show_filters')}
        onClick={() => setDrawerVisibility(true)}
      >
        <Funnel />
      </Button>
      <Drawer isOpen={isDrawerOpen} title={t('filters')} onClose={closeDrawer}>
        <FilterFields
          filters={filters}
          onChange={onChange}
          onFinish={closeDrawer}
        />
      </Drawer>
    </div>
  );
};

// eslint-disable-next-line
function FilterFields({ filters, onChange, onFinish }){
  const { t } = useTranslation(translations);
  const { getCategories } = useEventCategories();
  const getFilterValue = attrName => filters[attrName] || '';
  const handleFilterChange = ({ target: { name, value } }) => onChange({ [name]: value });
  const resetFilters = () => onChange({
    [TITLE_FILTER_NAME]: '',
    [CITY_FILTER_NAME]: '',
    [CATEGORY_FILTER_NAME]: '',
    [START_DATE_FILTER_NAME]: dateService.getTodayISOString(),
    [END_DATE_FILTER_NAME]: ''
  });
  const onFinishButtonClick = () => {
    window.scroll({ top: 0, left: 0 });
    onFinish();
  };

  return (
    <div
      id="eventFilterFields"
      className="v-event-filter-fields"
    >
      <div className="v-event-filter-field-group">
        <div className="v-event-filter-field">
          <Loupe />
          <DebouncedInput
            name={TITLE_FILTER_NAME}
            value={getFilterValue(TITLE_FILTER_NAME)}
            aria-label={t('title')}
            placeholder={t('title')}
            className="v-event-filter-title"
            onChange={handleFilterChange}
          />
        </div>
      </div>
      <div className="v-event-filter-field-group">
        <div className="v-event-filter-field">
          <select
            name={CITY_FILTER_NAME}
            value={getFilterValue(CITY_FILTER_NAME)}
            aria-label={t('city')}
            onChange={handleFilterChange}
          >
            <option value="">{t('all_cities')}</option>
            {
              cityService.getCities().map(({ code, name }) => (
                <option key={code} value={code}>
                  {name}
                </option>
              ))
            }
          </select>
        </div>
      </div>
      <div className="v-event-filter-field-group">
        <div className="v-event-filter-field">
          <select
            name={CATEGORY_FILTER_NAME}
            value={getFilterValue(CATEGORY_FILTER_NAME)}
            aria-label={t('category')}
            onChange={handleFilterChange}
          >
            <option value="">{t('all_categories')}</option>
            {
              getCategories().map(({ id, name }) => (
                <option key={id} value={id}>
                  {name}
                </option>
              ))
            }
          </select>
        </div>
      </div>
      <div className="v-event-filter-field-group">
        <div className="v-event-filter-field">
          <input
            type="date"
            min={dateService.getTodayISOString()}
            name={START_DATE_FILTER_NAME}
            value={getFilterValue(START_DATE_FILTER_NAME)}
            aria-label={t('start_date')}
            onChange={handleFilterChange}
          />
        </div>
        <div className="v-event-filter-date-field-divider">
          {t('to')}
        </div>
        <div className="v-event-filter-field">
          <input
            type="date"
            min={filters.startDate}
            name={END_DATE_FILTER_NAME}
            value={getFilterValue(END_DATE_FILTER_NAME)}
            aria-label={t('end_date')}
            onChange={handleFilterChange}
          />
        </div>
      </div>
      <div className="v-event-filter-actions">
        <Button onClick={resetFilters}>
          {t('reset')}
        </Button>
        <Button theme="primary" onClick={onFinishButtonClick}>
          {t('done')}
        </Button>
      </div>
    </div>
  );
}
