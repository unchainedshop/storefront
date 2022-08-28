import React from 'react';
import { useIntl } from 'react-intl';
import getConfig from 'next/config';
import changeLanguage from '../utils/changeLanguage';

const {
  publicRuntimeConfig: { theme },
} = getConfig();

const LanguageSwitch = () => {
  const intl = useIntl();
  const currentLang = intl.locale.split('-')[0];
  intl.formatMessage({ id: 'language_en', defaultMessage: 'English' });

  return (
    <div className="select-wrap language-select">
      <label htmlFor="language-switcher" className="hidden">
        {intl.formatMessage({
          id: 'choose_language',
          defaultMessage: 'Choose language',
        })}
      </label>
      <select
        className="hover:cursor-pointer"
        value={currentLang}
        onChange={(e) => changeLanguage(e.target.value)}
        id="language-switcher"
      >
        {Object.entries(theme.locales)?.map(([lang]) => (
          <option key={lang} value={lang}>
            {intl.formatMessage({ id: `language_${lang}` })}
          </option>
        ))}
      </select>
    </div>
  );
};

export default LanguageSwitch;
