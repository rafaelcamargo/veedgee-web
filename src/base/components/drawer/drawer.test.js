import { asyncMount } from '@src/base/services/testing';
import Funnel from '@src/base/icons/funnel';
import { Drawer } from './drawer';

describe('Drawer', () => {
  async function mount({ isOpen = true, size, title, titleIcon, onClose = () => {} } = {}){
    return await asyncMount(
      <Drawer isOpen={isOpen} size={size} title={title} titleIcon={titleIcon} onClose={onClose}>
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

  it('should optionally prefix the title with an icon', async () => {
    await mount({ title: 'Filters', titleIcon: <Funnel /> });
    const titleContent = document.querySelector('.v-drawer-title-content');
    expect(titleContent.querySelector('.v-icon-funnel')).toBeInTheDocument();
    expect(titleContent.querySelector('.v-drawer-title').textContent).toEqual('Filters');
  });
});
