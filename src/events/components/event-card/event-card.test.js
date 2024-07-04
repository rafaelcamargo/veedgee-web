import { asyncMount, screen } from '@src/base/services/testing';
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
});
