import { TestingRouter, asyncMount, screen, mockSearchParams } from '@src/base/services/testing';
import InstallationView from './installation-view';

describe('Installation View', () => {
  async function mount(){
    return await asyncMount(
      <TestingRouter>
        <InstallationView />
      </TestingRouter>
    );
  }

  it('should show installation steps for iphone and android by default', async () => {
    await mount();
    expect(screen.getByRole('link', { name: 'Homepage' })).toHaveAttribute('href', '/');
    expect(screen.getByRole('heading', { level: 1, name: 'Installation' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2, name: 'iPhone' })).toBeInTheDocument();
    expect(screen.getByText(new RegExp('Tap Share'))).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2, name: 'Android' })).toBeInTheDocument();
    expect(screen.getByText(new RegExp('Tap More'))).toBeInTheDocument();
  });

  it('should show installation for iphone only if the value of the search param device is iphone', async () => {
    mockSearchParams('device=iphone');
    await mount();
    expect(screen.getByRole('link', { name: 'Homepage' })).toHaveAttribute('href', '/');
    expect(screen.getByRole('heading', { level: 1, name: 'Installation' })).toBeInTheDocument();
    expect(screen.queryByRole('heading', { level: 2, name: 'iPhone' })).not.toBeInTheDocument();
    expect(screen.getByText(new RegExp('Tap Share'))).toBeInTheDocument();
    expect(screen.queryByRole('heading', { level: 2, name: 'Android' })).not.toBeInTheDocument();
    expect(screen.queryByText(new RegExp('Tap More'))).not.toBeInTheDocument();
  });

  it('should show installation for android only if the value of the search param device is android', async () => {
    mockSearchParams('device=android');
    await mount();
    expect(screen.getByRole('link', { name: 'Homepage' })).toHaveAttribute('href', '/');
    expect(screen.getByRole('heading', { level: 1, name: 'Installation' })).toBeInTheDocument();
    expect(screen.queryByRole('heading', { level: 2, name: 'iPhone' })).not.toBeInTheDocument();
    expect(screen.queryByText(new RegExp('Tap Share'))).not.toBeInTheDocument();
    expect(screen.queryByRole('heading', { level: 2, name: 'Android' })).not.toBeInTheDocument();
    expect(screen.getByText(new RegExp('Tap More'))).toBeInTheDocument();
  });
});
