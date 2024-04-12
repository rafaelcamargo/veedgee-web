import { act, render } from '@testing-library/react';
export * from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { I18nProvider } from '@src/base/providers/i18n';

export async function asyncMount(component){
  let result;
  const user = userEvent.setup();
  await act(async () => {
    result = render(
      <I18nProvider>
        {component}
      </I18nProvider>
    );
    await pause();
  });
  return { user, ...result };
}

export function getTranslations(translations){
  return translations['en-US'];
}

export async function pause(timeout){
  await new Promise(resolve => setTimeout(resolve, timeout));
}

export function mockSearchParams(paramsString){
  const { pathname } = window.location;
  const url = paramsString ? `${pathname}?${paramsString}` : pathname;
  window.history.pushState({}, '', url);
}
