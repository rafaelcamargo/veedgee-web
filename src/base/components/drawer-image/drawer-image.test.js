import { asyncMount, fireEvent, screen } from '@src/base/services/testing';
import { DrawerImage } from './drawer-image';

describe('Drawer Image', () => {
  async function mount({ src, alt, description } = {}){
    return await asyncMount(
      <DrawerImage src={src} alt={alt} description={description} />
    );
  }

  it('should not render an image tag when src is an invalid url', async () => {
    await mount({ src: 'https://genesisapi.diskingressos.com.br{{ngMeta.image}}/', alt: 'Event' });
    expect(screen.queryByRole('img')).not.toBeInTheDocument();
  });

  it('should render an image tag when src is a valid url', async () => {
    await mount({ src: 'https://example.com/image.webp', alt: 'Event' });
    expect(screen.getByRole('img')).toHaveAttribute('src', 'https://example.com/image.webp');
    expect(screen.getByRole('img')).toHaveAttribute('alt', 'Event');
  });

  it('should render a hidden backdrop image with the same src', async () => {
    const { container } = await mount({ src: 'https://example.com/image.webp', alt: 'Event' });
    const backdrop = container.querySelector('.v-drawer-image-backdrop');
    expect(backdrop).toHaveAttribute('src', 'https://example.com/image.webp');
    expect(backdrop).toHaveAttribute('aria-hidden', 'true');
  });

  it('should add is-loaded class after the picture finishes loading', async () => {
    const { container } = await mount({ src: 'https://example.com/image.webp', alt: 'Event' });
    const root = container.querySelector('.v-drawer-image');
    expect(root).not.toHaveClass('is-loaded');
    fireEvent.load(screen.getByRole('img'));
    expect(root).toHaveClass('is-loaded');
  });
});
