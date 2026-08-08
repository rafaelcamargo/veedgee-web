import { asyncMount, screen } from '@src/base/services/testing';
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
  });
});
