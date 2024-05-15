import { useSearchParams } from '@src/base/hooks/use-search-params';
import dateService from '@src/base/services/date';
import {
  CITY_FILTER_NAME,
  START_DATE_FILTER_NAME,
  END_DATE_FILTER_NAME,
  LIMIT_FILTER_NAME,
  DEFAULT_LIMIT
} from '@src/events/constants/event-filters';

export const useEventFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const setFilters = newFilters => {
    if(shouldResetLimit(newFilters, searchParams)) newFilters[LIMIT_FILTER_NAME] = DEFAULT_LIMIT;
    if(shouldResetEndDate(newFilters, searchParams)) newFilters[END_DATE_FILTER_NAME] = '';
    setSearchParams(newFilters);
  };

  return {
    filters: buildFilters(searchParams),
    setFilters
  };
};

function buildFilters(searchParams){
  return [
    CITY_FILTER_NAME,
    START_DATE_FILTER_NAME,
    END_DATE_FILTER_NAME,
    LIMIT_FILTER_NAME
  ].reduce((filters, filterName) => {
    const value = buildFilterValue(searchParams, filterName);
    return value ? { ...filters, [filterName]: value } : filters;
  }, {});
}

function buildFilterValue(searchParams, filterName){
  return {
    [START_DATE_FILTER_NAME]: buildInitialStartDate(searchParams[START_DATE_FILTER_NAME]),
    [LIMIT_FILTER_NAME]: buildInitialLimit(searchParams[LIMIT_FILTER_NAME]),
  }[filterName] || searchParams[filterName];
}

function buildInitialStartDate(customStartDate){
  if(customStartDate || customStartDate === '') return customStartDate;
  return dateService.getTodayISOString();
}

function buildInitialLimit(customLimit){
  return customLimit && parseInt(customLimit) || DEFAULT_LIMIT;
}

function shouldResetLimit(newFilters, currentFilters){
  return [
    CITY_FILTER_NAME,
    START_DATE_FILTER_NAME,
    END_DATE_FILTER_NAME
  ].some(filterName => {
    const currentFilterValue = currentFilters[filterName];
    const newFilterValue = newFilters[filterName];
    return (newFilterValue || newFilterValue === '') && newFilterValue != currentFilterValue;
  });
}

function shouldResetEndDate(newFilters, currentFilters){
  const newStartDate = newFilters[START_DATE_FILTER_NAME];
  const currentEndDate = currentFilters[END_DATE_FILTER_NAME];
  return newStartDate && newStartDate > currentEndDate;
}
