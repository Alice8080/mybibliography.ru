import { useSelector, useDispatch } from "react-redux";
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { useEffect, useState } from 'react';
import { Icon } from '@iconify/react';
import { toggleTheme, setTheme } from '../../store/themeSlice';
import Sidebar from '../sidebar/Sidebar';
import Logo from '../logo/Logo';
import './header.scss';
import themes from '../../styles/themes.json';

const Header = () => {
  const dispatch = useDispatch();
  const { theme } = useSelector(state => state.theme);
  const [storageTheme, setStorageTheme] = useLocalStorage('theme', undefined);
  const changeTheme = (theme) => {
    for (let [value, color] of Object.entries(themes[theme])) {
      document.documentElement.style.setProperty(`--${value}`, color);
    }
  };

  useEffect(() => {
    if (!storageTheme) {
      dispatch(setTheme('light'));
      setStorageTheme('light');
    } else {
      dispatch(setTheme(storageTheme));
      changeTheme(storageTheme);
    }
  }, []);

  useEffect(() => {
    if (theme) {
      setStorageTheme(theme);
      changeTheme(theme);
    }    
  }, [theme]);

  return (
    <header className="header">
      <nav className="header__nav">
        <Logo />
        <div className="header__content">
          <a href="search" className='header__link'>Поиск</a>
          <a href="help" className='header__link'>Помощь с курсовыми, контрольными, дипломами</a>
          <a href="zakazat-spisok-literatury" className='header__button'>Заказать список литературы</a>
          <button className='header__svg MuiButtonBase-root MuiIconButton-root MuiIconButton-sizeMedium css-78trlr-MuiButtonBase-root-MuiIconButton-root' onClick={() => {
            dispatch(toggleTheme());
          }}> {theme == 'light' ? <Icon icon="system-uicons:moon" /> : <Icon icon="system-uicons:sun" />}  </button>
          <div className="header__menu">
            <Sidebar />
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;