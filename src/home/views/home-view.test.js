import { asyncMount, screen, getTranslations } from '@src/base/services/testing';
import localeSelectTranslations from '@src/base/components/locale-select/locale-select.trans';
import homeViewTranslations from './home-view.trans';
import { HomeView } from './home-view';

describe('Home View', () => {
  async function mount(){
    return await asyncMount(<HomeView />);
  }

  it('should contain the hero section', async () => {
    await mount();
    const { find_events } = getTranslations(homeViewTranslations);
    expect(screen.getByRole('heading', { level: 1, name: 'Veedgee' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2, name: find_events })).toBeInTheDocument();
  });

  it('should contain the about section', async () => {
    await mount();
    const { how_it_works } = getTranslations(homeViewTranslations);
    expect(screen.getByRole('heading', { level: 2, name: how_it_works })).toBeInTheDocument();
  });

  it('should locale be en-US by default', async () => {
    await mount();
    const { language } = getTranslations(localeSelectTranslations);
    expect(screen.getByRole('combobox', { name: language })).toHaveValue('en-US');
  });

  it('should optionally set pt-BR as locale', async () => {
    const { user } = await mount();
    const { language } = getTranslations(localeSelectTranslations);
    await user.selectOptions(screen.getByRole('combobox', { name: language }), 'pt-BR');
    const heroHeading = await screen.findByRole(
      'heading', { level: 2, name: homeViewTranslations['pt-BR'].find_events }
    );
    expect(heroHeading).toBeInTheDocument();
  });
});
