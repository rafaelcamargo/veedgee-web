import { asyncMount } from '@src/base/services/testing';
import { Drawer } from './drawer';

describe('Drawer', () => {
  async function mount({ isOpen = true, size, onClose = () => {} } = {}){
    return await asyncMount(
      <Drawer isOpen={isOpen} size={size} onClose={onClose}>
        Content
      </Drawer>
    );
  }

  function getWrapper(){
    return document.querySelector('.v-drawer-wrapper');
  }

  it('should render a medium drawer by default', async () => {
    await mount();
    expect(getWrapper().classList).not.toContain('is-large');
    expect(getWrapper().classList).not.toContain('is-small');
  });

  it('should optionally render a large drawer', async () => {
    await mount({ size: 'lg' });
    expect(getWrapper().classList).toContain('is-large');
  });

  it('should optionally render a small drawer', async () => {
    await mount({ size: 'sm' });
    expect(getWrapper().classList).toContain('is-small');
  });
});
