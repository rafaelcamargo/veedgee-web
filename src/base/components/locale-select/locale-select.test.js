import { asyncMount, screen, getTranslations } from '@src/base/services/testing';
import translations from './locale-select.trans.json';
import { LocaleSelect } from './locale-select';

describe('Locale Select', () => {
  async function mount(){
    return await asyncMount(<LocaleSelect />);
  }

  function getSearchParams(){
    return new URLSearchParams(window.location.search);
  }

  it('should save selected locale on local storage set it on url as "locale" search param', async () => {
    const { user } = await mount();
    const { language } = getTranslations(translations);
    const localeToSelect = 'pt-BR';
    const searchParamKey = 'locale';
    const storageKey = 'vlocale';
    expect(getSearchParams().get(searchParamKey)).toEqual(null);
    expect(localStorage.getItem('vlocale')).toEqual(null);
    await user.selectOptions(screen.getByRole('combobox', { name: language }), localeToSelect);
    expect(getSearchParams().get(searchParamKey)).toEqual(localeToSelect);
    expect(localStorage.getItem(storageKey)).toEqual(localeToSelect);
  });
});
