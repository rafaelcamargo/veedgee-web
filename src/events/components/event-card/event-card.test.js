import { asyncMount, getTranslations, screen, within } from '@src/base/services/testing';
import eventsMock from '@src/events/mocks/events';
import eventCategoryTagTranslations from '@src/events/components/event-category-tag/event-category-tag.t.js';
import eventCategoriesTranslations from '@src/events/hooks/use-event-categories.t.js';
import { EventCard } from './event-card';

describe('Event Card', () => {
  async function mount({ eventDetails, titleId }){
    return await asyncMount(
      <EventCard
        eventDetails={eventDetails}
        titleId={titleId}
      />
    );
  }

  function buildEvents(){
    return [
      eventsMock[3],
      eventsMock[4],
      buildEventMock({ id: 'sports-1', category: 'sports' }),
      buildEventMock({ id: 'family-1', category: 'family' }),
      buildEventMock({ id: 'exhibitions-1', category: 'exhibitions' }),
      buildEventMock({ id: 'nightlife-1', category: 'nightlife' }),
      buildEventMock({ id: 'festivals-1', category: 'festivals' }),
      buildEventMock({ id: 'food-1', category: 'food' }),
      buildEventMock({ id: 'theater-1', category: 'theater' }),
      buildEventMock({ id: 'comedy-1', category: 'comedy' }),
      buildEventMock({ id: 'education-1', category: 'education' }),
      buildEventMock({ id: 'musicals-1', category: 'musicals' }),
      buildEventMock({ id: 'music-1', category: 'music' }),
      buildEventMock({ id: 'business-1', category: 'business' }),
      buildEventMock({ id: 'fair-1', category: 'fair' }),
    ];
  }

  function buildEventMock({ id, category }){
    return {
      id,
      title: category,
      date: '2024-01-01',
      city: 'Curitiba',
      state: 'PR',
      url: `https://example.com/${id}`,
      category,
    };
  }

  function getCategoryIconNames(){
    return {
      sports: 'ball',
      family: 'balloon',
      exhibitions: 'brush',
      nightlife: 'cocktail',
      movies: 'film',
      festivals: 'flag',
      food: 'fork',
      theater: 'masks',
      comedy: 'mic',
      education: 'mortarboard',
      musicals: 'musical',
      music: 'note',
      dance: 'shoe',
      business: 'suitcase',
      fair: 'tent',
    };
  }

  it('should truncate event titles longer than 108 characters', async () => {
    const eventDetails = {
      id: '123',
      title: 'Rede De Teatros Sesc: Espetáculo "frágil, Ou, Essa Dança É 30 Minutos Mais Longa Do Que Poderia Ser Para Competir", De Letícia Souza',
      slug: 'some-slug',
      date: '2024-07-27',
      time: '17:00',
      city: 'Joinville',
      state: 'SC',
      country: 'BR',
      url: 'https://some.external.site'
    };
    await mount({ eventDetails, titleId: '123' });
    const expectedTitle = 'Rede De Teatros Sesc: Espetáculo "frágil, Ou, Essa Dança É 30 Minutos Mais Longa Do Que Poderia Ser Para Co…';
    expect(screen.queryByText(eventDetails.title)).not.toBeInTheDocument();
    expect(screen.getByText(expectedTitle)).toBeInTheDocument();
  });

  it('should not show event category icon by default', async () => {
    const [firstEvent] = eventsMock;
    const { container } = await mount({ eventDetails: firstEvent, titleId: firstEvent.id });
    const header = container.querySelector(`#eventCardHeader_${firstEvent.id}`);
    expect(header.querySelector('.v-icon')).not.toBeInTheDocument();
  });

  it('should optionally show event category icon', async () => {
    const events = buildEvents();
    const categoryIconNames = getCategoryIconNames();
    const { category_label } = getTranslations(eventCategoryTagTranslations);
    const categoryNames = getTranslations(eventCategoriesTranslations);
    const { container } = await asyncMount(
      <>
        {events.map(event => (
          <EventCard key={event.id} eventDetails={event} titleId={event.id} />
        ))}
      </>
    );
    events.forEach(event => {
      const header = container.querySelector(`#eventCardHeader_${event.id}`);
      const categoryName = categoryNames[event.category];
      const categoryLabel = category_label.replace('{{ name }}', categoryName);
      expect(header.querySelector(`.v-icon-${categoryIconNames[event.category]}`)).toBeInTheDocument();
      expect(within(header).getByText(categoryLabel)).toBeInTheDocument();
    });
  });
});
