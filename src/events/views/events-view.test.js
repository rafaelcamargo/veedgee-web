import {
  TestingRouter,
  asyncMount,
  screen,
  within,
  mockSearchParams,
  getTranslations,
  flushEventsCache
} from '@src/base/services/testing';
import dateService from '@src/base/services/date';
import eventListTranslations from '@src/events/components/event-list/event-list.trans';
import eventsMock from '@src/events/mocks/events';
import eventsResource from '@src/events/resources/events';
import topbarTranslations from '@src/base/components/topbar/topbar.trans';
import localeSelectTranslations from '@src/base/components/locale-select/locale-select.trans';
import eventCardTranslations from '@src/events/components/event-card/event-card.trans';
import EventsView from './events-view';

describe('Events View', () => {
  async function mount(){
    return await asyncMount(
      <TestingRouter>
        <EventsView />
      </TestingRouter>
    );
  }

  function buildEventsMock(numberOfEvents){
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
        url: 'https://some.external.site/123'
      };
    });
  }

  function getSearchParam(paramName){
    const params = new URLSearchParams(window.location.search);
    return params.get(paramName);
  }

  beforeEach(() => {
    eventsResource.get = jest.fn(() => Promise.resolve({ data: eventsMock }));
    flushEventsCache();
  });

  afterEach(() => {
    mockSearchParams('');
  });

  it('should contain a link to homepage', async () => {
    await mount();
    const { homepage } = getTranslations(topbarTranslations);
    expect(screen.getByRole('link', { name: homepage })).toHaveAttribute('href', '/');
  });

  it('should contain an event list', async () => {
    dateService.getNow = jest.fn(() => new Date(2024, 3, 23));
    await mount();
    const eventHeadings = screen.getAllByRole('heading', { level: 2 });
    eventHeadings.forEach((heading, index) => {
      expect(heading.textContent).toEqual(eventsMock[index].title);
    });
    expect(eventHeadings).toHaveLength(3);
    expect(eventsResource.get).toHaveBeenCalledWith({ minDate: '2024-04-23' });
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

  it('should not show more than thirty events on initialization by default', async () => {
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

  it('should optionally show more than thirty events', async () => {
    mockSearchParams('limit=30');
    eventsResource.get = jest.fn(() => Promise.resolve({ data: buildEventsMock(31) }));
    const { user } = await mount();
    const { load_more } = getTranslations(eventListTranslations);
    await user.click(screen.getByRole('button', { name: load_more }));
    expect(screen.getByRole('heading', { name: 'Event #1' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Event #10' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Event #31' })).toBeInTheDocument();
    expect(getSearchParam('limit')).toEqual('60');
    expect(screen.queryByRole('button', { name: load_more })).not.toBeInTheDocument();
  });
});
