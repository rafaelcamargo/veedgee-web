import { asyncMount, screen } from '@src/base/services/testing';
import homeViewTranslations from './home-view.trans.json';
import { HomeView } from './home-view';

describe('Home View', () => {
  async function mount(){
    return await asyncMount(<HomeView />);
  }

  it('should contain the main headings', async () => {
    await mount();
    const { find_events } = homeViewTranslations;
    expect(screen.getByRole('heading', { level: 1, name: 'Veedgee' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2, name: find_events })).toBeInTheDocument();
  });
});
