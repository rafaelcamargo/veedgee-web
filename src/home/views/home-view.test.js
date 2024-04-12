import { asyncMount, screen } from '@src/base/services/testing';
import { HomeView } from './home-view';

describe('Home View', () => {
  async function mount(){
    return await asyncMount(<HomeView />);
  }

  it('should contain a gretting', async () => {
    await mount();
    expect(screen.getByRole('heading', { name: 'Hello' })).toBeInTheDocument();
  });
});
