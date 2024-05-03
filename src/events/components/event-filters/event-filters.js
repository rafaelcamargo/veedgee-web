import { useState, useEffect } from 'react';
import { Button } from '@src/base/components/button/button';
import { Loupe } from '@src/base/icons/loupe';
import { Close } from '@src/base/icons/close';
import { useTranslation } from '@src/base/hooks/use-translation';
import cityService from '@src/base/services/city';
import dateService from '@src/base/services/date';
import { useViewport } from '@src/base/hooks/use-viewport';
import {
  CITY_FILTER_NAME,
  START_DATE_FILTER_NAME,
  END_DATE_FILTER_NAME,
  LIMIT_FILTER_NAME
} from '@src/events/constants/event-filters';
import translations from './event-filters.trans';

// eslint-disable-next-line max-statements
export const EventFilters = ({ filters, onChange }) => {
  const { isMobile } = useViewport();
  const [isFiltersVisibile, setFiltersVisibility] = useState();
  const toggleFiltersVisibility = () => setFiltersVisibility(!isFiltersVisibile);

  useEffect(() => {
    setFiltersVisibility(!isMobile);
  }, [isMobile]);

  return (
    <div className="v-event-filters-wrapper">
      { isMobile && (
        <FiltersVisibilityButton
          filters={filters}
          isFiltersVisibile={isFiltersVisibile}
          onClick={toggleFiltersVisibility}
        />
      )}
      <FilterFields
        filters={filters}
        isFiltersVisibile={isFiltersVisibile}
        isMobile={isMobile}
        onChange={onChange}
      />
    </div>
  );
};

function FiltersVisibilityButton({ filters, isFiltersVisibile, onClick }){
  const { t } = useTranslation(translations);
  const { label, Icon } = isFiltersVisibile ? {
    label: t('hide_filters'),
    Icon: Close
  } : {
    label: t('show_filters'),
    Icon: Loupe
  };

  return (
    <Button
      aria-label={label}
      theme="icon"
      className="v-event-filters-visibility-toggler"
      onClick={onClick}
    >
      <FiltersCounter
        filters={filters}
        isFiltersVisibile={isFiltersVisibile}
      />
      <Icon />
    </Button>
  );
}

function FilterFields({ filters, isFiltersVisibile, isMobile, onChange }){
  const { t } = useTranslation(translations);
  const getFilterValue = attrName => filters[attrName] || '';
  const handleFilterChange = ({ target: { name, value } }) => onChange({ [name]: value });
  const minStartDate = dateService.buildISOString(dateService.getNow());

  return (
    <div
      id="eventFilterFields"
      className={buildFilterFieldsClassName(isFiltersVisibile)}
      aria-hidden={!isFiltersVisibile}
    >
      { isMobile && <h3>{t('filters')}</h3> }
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
          <input
            type="date"
            min={minStartDate}
            name={START_DATE_FILTER_NAME}
            value={getFilterValue(START_DATE_FILTER_NAME)}
            aria-label={t('start_date')}
            onChange={handleFilterChange}
          />
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
    </div>
  );
}

function buildFilterFieldsClassName(isFiltersVisibile){
  const baseClassName = 'v-event-filter-fields';
  return isFiltersVisibile ? `${baseClassName} v-event-filter-fields-visible` : baseClassName;
}

function FiltersCounter({ filters, isFiltersVisibile }){
  const count = countFilters(filters);
  return (
    <div
      id="eventFiltersCounterWrapper"
      className={buildFiltersCounterWrapperClassName(isFiltersVisibile)}
    >
      <div
        id="eventFiltersCounter"
        aria-hidden={!count}
        className={buildFiltersCounterClassName(count)}
      >
        {count}
      </div>
    </div>
  );
}

function countFilters(filters){
  return Object.keys(filters)
    .filter(filterName => ![START_DATE_FILTER_NAME, LIMIT_FILTER_NAME].includes(filterName))
    .length;
}

function buildFiltersCounterWrapperClassName(isFiltersVisibile){
  const className = ['v-event-filters-counter-wrapper'];
  if(isFiltersVisibile) className.push('v-event-filters-counter-wrapper-center');
  return className.join(' ');
}

function buildFiltersCounterClassName(count){
  const className = ['v-event-filters-counter'];
  if(count > 0) className.push('v-event-filters-counter-visible');
  return className.join(' ');
}
