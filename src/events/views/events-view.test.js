import {
  TestingRouter,
  asyncMount,
  act,
  pause,
  screen,
  within,
  mockSearchParams,
  getTranslations,
  flushEventsCache
} from '@src/base/services/testing';
import dateService from '@src/base/services/date';
import viewportService from '@src/base/services/viewport';
import windowService from '@src/base/services/window';
import eventListTranslations from '@src/events/components/event-list/event-list.trans';
import eventsMock from '@src/events/mocks/events';
import eventsResource from '@src/events/resources/events';
import topbarTranslations from '@src/base/components/topbar/topbar.trans';
import localeSelectTranslations from '@src/base/components/locale-select/locale-select.trans';
import eventCardTranslations from '@src/events/components/event-card/event-card.trans';
import eventFiltersTranslations from '@src/events/components/event-filters/event-filters.trans';
import EventsView from './events-view';

describe('Events View', () => {
  async function mount(){
    return await asyncMount(
      <TestingRouter>
        <EventsView />
      </TestingRouter>
    );
  }

  function buildEventsMock(numberOfEvents, overrides = []){
    return new Array(numberOfEvents).fill({}).map((item, index) => {
      const id = index + 1;
      return {
        id,
        title: `Event #${id}`,
        slug: `event-${id}`,
        date: '2024-04-21',
        time: '20:00',
        city: 'Joinville',
        state: 'SC',
        country: 'BR',
        url: `https://some.external.site/${id}`,
        ...overrides[index]
      };
    });
  }

  function getSearchParam(paramName){
    const params = new URLSearchParams(window.location.search);
    return params.get(paramName);
  }

  async function filterByTitle(user, eventTitle){
    const { title } = getTranslations(eventFiltersTranslations);
    await user.type(screen.getByRole('textbox', { name: title  }), eventTitle);
  }

  async function selectCity(user, cityName){
    const { city } = getTranslations(eventFiltersTranslations);
    await user.selectOptions(screen.getByRole('combobox', { name: city  }), [cityName]);
  }

  async function selectDate(user, labelText, dateString){
    const dateInput = screen.getByLabelText(labelText);
    await user.clear(dateInput);
    await user.type(dateInput, dateString);
  }

  function simulateScreenType(type){
    const width = type == 'mobile' ? 767 : 768;
    viewportService.getWidth = jest.fn(() => width);
    viewportService.listenResize = jest.fn(listener => listener({ target: { innerWidth: width } }));
  }

  function mockMobile({ model }){
    const userAgent = {
      'iphone': 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.1 Mobile/15E148 Safari/604.1',
      'android': 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.6723.102 Mobile Safari/537.36'
    }[model];
    windowService.getUserAgent = jest.fn(() => userAgent);
  }

  beforeEach(() => {
    dateService.getNow = (() => new Date(2024, 2, 1));
    eventsResource.get = jest.fn(() => Promise.resolve({ data: eventsMock }));
    viewportService.listenResize = jest.fn();
    window.scroll = jest.fn();
    simulateScreenType('desktop');
    flushEventsCache();
  });

  afterEach(() => {
    mockSearchParams('');
    window.localStorage.removeItem('vmode');
  });

  it('should contain a link to homepage', async () => {
    await mount();
    const { homepage } = getTranslations(topbarTranslations);
    expect(screen.getByRole('link', { name: homepage })).toHaveAttribute('href', '/');
  });

  it('should contain an event list', async () => {
    dateService.getNow = jest.fn(() => new Date(2024, 2, 23, 23, 59, 59));
    await mount();
    const eventHeadings = screen.getAllByRole('heading', { level: 2 });
    eventHeadings.forEach((heading, index) => {
      expect(heading.textContent).toEqual(eventsMock[index].title);
    });
    expect(eventHeadings).toHaveLength(3);
    expect(eventsResource.get).toHaveBeenCalledWith({ minDate: '2024-03-23' });
  });

  it('should format event location', async () => {
    await mount();
    const [firstEvent, secondEvent] = eventsMock;
    const firstEventItem = screen.getByRole('listitem', { name: firstEvent.title });
    const secondEventItem = screen.getByRole('listitem', { name: secondEvent.title });
    expect(within(firstEventItem).getByText('Balneário Camboriú, SC'));
    expect(within(secondEventItem).getByText('Blumenau, SC'));
  });

  it('should format date and time in English by default', async () => {
    await mount();
    const [firstEvent, secondEvent] = eventsMock;
    const firstEventItem = screen.getByRole('listitem', { name: firstEvent.title });
    const secondEventItem = screen.getByRole('listitem', { name: secondEvent.title });
    expect(within(firstEventItem).getByText('Mar 23, 2024'));
    expect(within(secondEventItem).getByText('Apr 14, 2024'));
    expect(within(secondEventItem).getByText('5:00 PM'));
  });

  it('should optionally format date and time in Portuguese', async () => {
    const { user } = await mount();
    const { language } = getTranslations(localeSelectTranslations);
    const { view_event_details } = eventCardTranslations['pt-BR'];
    await user.selectOptions(screen.getByRole('combobox', { name: language }), 'pt-BR');
    const [firstEvent, secondEvent] = eventsMock;
    const firstEventItem = screen.getByRole('listitem', { name: firstEvent.title });
    const secondEventItem = screen.getByRole('listitem', { name: secondEvent.title });
    const firstEventItemLink = within(firstEventItem).getByRole('link', { name: view_event_details });
    const secondEventItemLink = within(secondEventItem).getByRole('link', { name: view_event_details });
    expect(within(firstEventItem).getByText('23 mar, 2024'));
    expect(firstEventItemLink).toHaveAttribute('href', firstEvent.url);
    expect(within(secondEventItem).getByText('14 abr, 2024'));
    expect(within(secondEventItem).getByText('17:00'));
    expect(secondEventItemLink).toHaveAttribute('href', secondEvent.url);
    await user.selectOptions(
      screen.getByRole('combobox', { name: localeSelectTranslations['pt-BR'].language }),
      'en-US'
    );
  });

  it('should show no more than thirty events on initialization by default', async () => {
    eventsResource.get = jest.fn(() => Promise.resolve({ data: buildEventsMock(31) }));
    await mount();
    expect(screen.getByRole('heading', { name: 'Event #1' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Event #10' })).toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: 'Event #31' })).not.toBeInTheDocument();
  });

  it('should optionally initialize showing more than thirty events', async () => {
    mockSearchParams('limit=60');
    eventsResource.get = jest.fn(() => Promise.resolve({ data: buildEventsMock(31) }));
    await mount();
    expect(screen.getByRole('heading', { name: 'Event #1' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Event #10' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Event #31' })).toBeInTheDocument();
  });

  it('should optionally load more events', async () => {
    mockSearchParams('limit=30');
    eventsResource.get = jest.fn(() => Promise.resolve({ data: buildEventsMock(31) }));
    const { user } = await mount();
    const { load_more } = getTranslations(eventListTranslations);
    expect(screen.queryByRole('heading', { name: 'Event #31' })).not.toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: load_more }));
    expect(screen.getByRole('heading', { name: 'Event #1' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Event #10' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Event #31' })).toBeInTheDocument();
    expect(getSearchParam('limit')).toEqual('60');
    expect(screen.queryByRole('button', { name: load_more })).not.toBeInTheDocument();
  });

  it('should not show mobile filter elements on desktop', async () => {
    simulateScreenType('desktop');
    await mount();
    const { show_filters, done } = getTranslations(eventFiltersTranslations);
    expect(screen.queryByRole('button', { name: show_filters })).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: done })).not.toBeInTheDocument();
  });

  it('should filter events by start date, end date, city, and title', async () => {
    dateService.getNow = jest.fn(() => new Date(2024, 3, 30));
    const events = buildEventsMock(8, [
      { date: '2024-04-30', city: 'Blumenau', title: 'Tributo a Bob Dylan' },
      { date: '2024-04-30', city: 'Joinville', title: 'Orquestra de Joinville' },
      { date: '2024-05-01', city: 'Joinville', title: 'Orquestra de Joinville - Sessão Extra' },
      { date: '2024-05-01', city: 'Curitiba', title: 'Orquestra de Curitiba' },
      { date: '2024-05-02', city: 'Joinville', title: 'Orquestra de Joinville - Sessão Especial' },
      { date: '2024-05-03', city: 'Joinville', title: 'Apresentação da Escola Bolshoi' },
      { date: '2024-05-03', city: 'Florianópolis', title: 'Show Dazaranha' },
      { date: '2024-05-04', city: 'Joinville', title: 'Show Nós na Aldeia' }
    ]);
    eventsResource.get = jest.fn(() => Promise.resolve({ data: events }));
    mockSearchParams('limit=60');
    const { user } = await mount();
    const { start_date, to, end_date } = getTranslations(eventFiltersTranslations);
    await filterByTitle(user, 'orquestra');
    await selectCity(user, 'Joinville');
    await selectDate(user, start_date, '2024-05-01');
    await selectDate(user, end_date, '2024-05-03');
    await act(async () => await pause(1050));
    expect(screen.queryByText(to)).not.toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: 'Tributo a Bob Dylan' })).not.toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: 'Orquestra de Joinville' })).not.toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Orquestra de Joinville - Sessão Extra' })).toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: 'Orquestra de Curitiba' })).not.toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Orquestra de Joinville - Sessão Especial' })).toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: 'Apresentação da Escola Bolshoi' })).not.toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: 'Show Dazaranha' })).not.toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: 'Show Nós na Aldeia' })).not.toBeInTheDocument();
    expect(getSearchParam('title')).toEqual('orquestra');
    expect(getSearchParam('limit')).toEqual('30');
    expect(getSearchParam('city')).toEqual('joinville');
    expect(getSearchParam('startDate')).toEqual('2024-05-01');
    expect(getSearchParam('endDate')).toEqual('2024-05-03');
  });

  it('should not show load more button if filtered events do not exceed current limit', async () => {
    dateService.getNow = jest.fn(() => new Date(2024, 2, 30));
    const events = buildEventsMock(35, [{ date: '2024-05-01', city: 'Curitiba' }]);
    eventsResource.get = jest.fn(() => Promise.resolve({ data: events }));
    mockSearchParams('limit=60');
    const { user } = await mount();
    const { start_date, end_date } = getTranslations(eventFiltersTranslations);
    const { load_more } = getTranslations(eventListTranslations);
    await selectCity(user, 'Curitiba');
    await selectDate(user, start_date, '2024-05-01');
    await selectDate(user, end_date, '2024-05-01');
    expect(screen.getByRole('heading', { name: 'Event #1' })).toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: 'Event #2' })).not.toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: 'Event #35' })).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: load_more })).not.toBeInTheDocument();
  });

  it('should filter events by search params found on url', async () => {
    dateService.getNow = jest.fn(() => new Date(2024, 4, 3));
    const events = buildEventsMock(8, [
      { date: '2024-05-04', city: 'Blumenau' },
      { date: '2024-05-04', city: 'São José' },
      { date: '2024-05-04', city: 'Joinville' }
    ]);
    eventsResource.get = jest.fn(() => Promise.resolve({ data: events }));
    mockSearchParams('city=sao-jose&startDate=2024-05-04&endDate=2024-05-05');
    await mount();
    const { city, start_date, end_date } = getTranslations(eventFiltersTranslations);
    expect(screen.queryByRole('heading', { name: 'Event #1' })).not.toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Event #2' })).toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: 'Event #3' })).not.toBeInTheDocument();
    expect(screen.getByRole('combobox', { name: city })).toHaveValue('sao-jose');
    expect(screen.getByLabelText(start_date)).toHaveValue('2024-05-04');
    expect(screen.getByLabelText(end_date)).toHaveValue('2024-05-05');
  });

  it('should clear end date filter if start date is ahead end date', async () => {
    dateService.getNow = jest.fn(() => new Date(2024, 4, 3));
    const events = buildEventsMock(8, [
      { date: '2024-05-03', city: 'Blumenau' },
      { date: '2024-05-04', city: 'São José' },
      { date: '2024-05-20', city: 'Joinville' }
    ]);
    eventsResource.get = jest.fn(() => Promise.resolve({ data: events }));
    const { user } = await mount();
    const { start_date, end_date } = getTranslations(eventFiltersTranslations);
    await selectDate(user, end_date, '2024-05-04');
    expect(screen.getByRole('heading', { name: 'Event #1' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Event #2' })).toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: 'Event #3' })).not.toBeInTheDocument();
    await selectDate(user, start_date, '2024-05-10');
    expect(screen.queryByRole('heading', { name: 'Event #1' })).not.toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: 'Event #2' })).not.toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Event #3' })).toBeInTheDocument();
  });

  it('should show no results message if no event has been found', async () => {
    dateService.getNow = jest.fn(() => new Date(2024, 4, 3));
    const events = buildEventsMock(8, [
      { date: '2024-05-04', city: 'Blumenau' },
      { date: '2024-05-04', city: 'São José' },
      { date: '2024-05-04', city: 'Joinville' }
    ]);
    eventsResource.get = jest.fn(() => Promise.resolve({ data: events }));
    const { user } = await mount();
    const { no_results, try_redo_filters } = getTranslations(eventListTranslations);
    await selectCity(user, 'Curitiba');
    expect(screen.queryByRole('heading', { name: 'Event #1' })).not.toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: 'Event #2' })).not.toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: 'Event #3' })).not.toBeInTheDocument();
    expect(screen.getByRole('heading', { name: no_results })).toBeInTheDocument();
    expect(screen.getByText(try_redo_filters)).toBeInTheDocument();
  });

  it('should show error message and a button to retry on events fetch fail', async () => {
    const events = buildEventsMock(1, [{ date: '2024-05-03', city: 'Blumenau' }]);
    let fetchPromise;
    eventsResource.get = jest.fn(() => new Promise((resolve, reject) => {
      fetchPromise = { resolve, reject };
    }));
    const { user } = await mount();
    const { something_went_wrong, could_not_be_possible_to_fetch_events, retry, loading } = getTranslations(eventListTranslations);
    expect(screen.getByText(loading)).toBeInTheDocument();
    await act(() => fetchPromise.reject());
    expect(screen.getByRole('heading', { name: something_went_wrong })).toBeInTheDocument();
    expect(screen.getByText(could_not_be_possible_to_fetch_events)).toBeInTheDocument();
    expect(eventsResource.get).toHaveBeenCalledTimes(1);
    await user.click(screen.getByRole('button', { name: retry }));
    expect(eventsResource.get).toHaveBeenCalledTimes(2);
    await act(() => fetchPromise.resolve({ data: events }));
    expect(screen.queryByRole('heading', { name: events[0].title })).toBeInTheDocument();
  });

  it('should show special date labels for events happening today or tomorrow', async () => {
    dateService.getNow = jest.fn(() => new Date(2024, 4, 3));
    const events = buildEventsMock(8, [
      { date: '2024-05-03', city: 'Blumenau' },
      { date: '2024-05-04', city: 'São José' },
      { date: '2024-05-05', city: 'Joinville' }
    ]);
    eventsResource.get = jest.fn(() => Promise.resolve({ data: events }));
    const { container } = await mount();
    const { today, tomorrow } = getTranslations(eventCardTranslations);
    const [firstEventTime, secondEventTime, thirdEventTime] = container.querySelectorAll('time');
    expect(screen.getByText(today)).toBeInTheDocument();
    expect(firstEventTime.classList).toContain('v-event-card-datetime-featured');
    expect(screen.getByText(tomorrow)).toBeInTheDocument();
    expect(secondEventTime.classList).toContain('v-event-card-datetime-featured');
    expect(screen.getByText('May 5, 2024')).toBeInTheDocument();
    expect(thirdEventTime.classList).not.toContain('v-event-card-datetime-featured');
  });

  it('should not show filters on mobile by default', async () => {
    simulateScreenType('mobile');
    const { user, container } = await mount();
    const { show_filters, done } = getTranslations(eventFiltersTranslations);
    const eventFilterFieldEl = container.querySelector('#eventFilterFields');
    expect(eventFilterFieldEl.classList).not.toContain('v-event-filter-fields-visible');
    expect(eventFilterFieldEl).toHaveAttribute('aria-hidden', 'true');
    await user.click(screen.getByRole('button', { name: show_filters }));
    expect(eventFilterFieldEl.classList).toContain('v-event-filter-fields-visible');
    expect(eventFilterFieldEl).toHaveAttribute('aria-hidden', 'false');
    await user.click(screen.getByRole('button', { name: done }));
    expect(eventFilterFieldEl.classList).not.toContain('v-event-filter-fields-visible');
    expect(eventFilterFieldEl).toHaveAttribute('aria-hidden', 'true');
  });

  it('should show filters counter on mobile', async () => {
    simulateScreenType('mobile');
    const { user, container } = await mount();
    const { all_cities, to, end_date, show_filters, done } = getTranslations(eventFiltersTranslations);
    const eventFilterCounterEl = container.querySelector('#eventFiltersCounter');
    const eventFilterCounterWrapperEl = container.querySelector('#eventFiltersCounterWrapper');
    const getCounterElClassNames = () => eventFilterCounterEl.classList;
    const getCounterWrapperElClassNames = () => eventFilterCounterWrapperEl.classList;
    expect(getCounterElClassNames()).not.toContain('v-event-filters-counter-visible');
    expect(getCounterWrapperElClassNames()).not.toContain('v-event-filters-counter-wrapper-center');
    expect(eventFilterCounterEl).toHaveAttribute('aria-hidden', 'true');
    expect(eventFilterCounterEl.textContent).toEqual('0');
    await user.click(screen.getByRole('button', { name: show_filters }));
    await selectCity(user, 'Curitiba');
    await selectDate(user, end_date, '2024-05-05');
    expect(screen.getByText(to)).toBeInTheDocument();
    expect(getCounterElClassNames()).toContain('v-event-filters-counter-visible');
    expect(getCounterWrapperElClassNames()).toContain('v-event-filters-counter-wrapper-center');
    expect(eventFilterCounterEl).toHaveAttribute('aria-hidden', 'false');
    expect(eventFilterCounterEl.textContent).toEqual('2');
    await selectCity(user, all_cities);
    expect(getCounterElClassNames()).toContain('v-event-filters-counter-visible');
    expect(eventFilterCounterEl).toHaveAttribute('aria-hidden', 'false');
    expect(eventFilterCounterEl.textContent).toEqual('1');
    await user.clear(screen.getByLabelText(end_date));
    expect(getCounterElClassNames()).not.toContain('v-event-filters-counter-visible');
    expect(eventFilterCounterEl).toHaveAttribute('aria-hidden', 'true');
    expect(eventFilterCounterEl.textContent).toEqual('0');
    await user.click(screen.getByRole('button', { name: done }));
    expect(window.scroll).toHaveBeenCalledWith({ top: 0, left: 0 });
    expect(getCounterWrapperElClassNames()).not.toContain('v-event-filters-counter-wrapper-center');
  });

  it('should not show an installation banner by default', async () => {
    await mount();
    expect(screen.queryByText('Install Veedgee on your iPhone')).not.toBeInTheDocument();
    expect(screen.queryByText('Install Veedgee on your Android')).not.toBeInTheDocument();
    expect(screen.queryByText('Loads faster and works offline')).not.toBeInTheDocument();
    expect(screen.queryByRole('link', { name: 'View instructions' })).not.toBeInTheDocument();
  });

  it('should not show an installation banner on pwa', async () => {
    window.localStorage.setItem('vmode', 'pwa');
    mockMobile({ model: 'iphone' });
    await mount();
    expect(screen.queryByText('Install Veedgee on your iPhone')).not.toBeInTheDocument();
    expect(screen.queryByText('Install Veedgee on your Android')).not.toBeInTheDocument();
    expect(screen.queryByText('Loads faster and works offline')).not.toBeInTheDocument();
    expect(screen.queryByRole('link', { name: 'View instructions' })).not.toBeInTheDocument();
  });

  it('should show an installation banner for iphone if device is an iphone', async () => {
    mockMobile({ model: 'iphone' });
    await mount();
    expect(screen.getByText('Install Veedgee on your iPhone')).toBeInTheDocument();
    expect(screen.getByText('Loads faster and works offline')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'View instructions' })).toHaveAttribute('href', '/install?device=iphone');
  });

  it('should show an installation banner for android if device is an android', async () => {
    mockMobile({ model: 'android' });
    await mount();
    expect(screen.getByText('Install Veedgee on your Android')).toBeInTheDocument();
    expect(screen.getByText('Loads faster and works offline')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'View instructions' })).toHaveAttribute('href', '/install?device=android');
  });
});
