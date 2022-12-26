import React, { useContext, useEffect, useLayoutEffect, useRef } from 'react';
import { ThemeProvider } from 'react-jss';
import { ReactNotifications } from 'react-notifications-component';
import { useFullscreen } from 'react-use';
import { ToastProvider } from 'react-toast-notifications';
import { TourProvider } from '@reactour/tour';
import ThemeContext from '../src/contexts/themeContext';
import Wrapper from '../src/layout/Wrapper/Wrapper';
import Portal from '../src/layout/Portal/Portal';
import { Toast, ToastContainer } from '../src/components/bootstrap/Toasts';
import useDarkMode from '../src/hooks/useDarkMode';
import COLORS from '../src/common/data/enumColors';
import { getOS } from '../src/helpers/helpers';
import steps, { styles } from '../src/steps';
import AsideRoutes from '../src/layout/Aside/AsideRoutes';
import NavigationHandler from './routes/NavigationHandler';
import { Provider } from 'react-redux';
import { store } from './Redux/store';
import { defineRules } from './Configurations/CASL/can';



function App() {
  getOS();

  /**
   * Dark Mode
   */
  const { themeStatus, darkModeStatus } = useDarkMode();
  const theme = {
    theme: themeStatus,
    primary: COLORS.PRIMARY.code,
    secondary: COLORS.SECONDARY.code,
    success: COLORS.SUCCESS.code,
    info: COLORS.INFO.code,
    warning: COLORS.WARNING.code,
    danger: COLORS.DANGER.code,
    dark: COLORS.DARK.code,
    light: COLORS.LIGHT.code,
  };

  //re-register the permissions on the logged user
  let permissions = JSON.parse(localStorage.getItem('permissions')||"[]")
  if(permissions.length >0){
    defineRules(permissions)
  }

  useEffect(() => {
    if (darkModeStatus) {
      document.documentElement.setAttribute('theme', 'dark');
    }
    return () => {
      document.documentElement.removeAttribute('theme');
    };

  }, [darkModeStatus]
  );
  /**
   * Full Screen
   */
  // @ts-ignore
  const { fullScreenStatus, setFullScreenStatus } = useContext(ThemeContext);
  const ref = useRef(null);
  useFullscreen(ref, fullScreenStatus, {
    onClose: () => setFullScreenStatus(false),
  });

  /**
   * Modern Design
   */
  useLayoutEffect(() => {
    if (process.env.REACT_APP_MODERN_DESGIN === 'true') {
      document.body.classList.add('modern-design');
    } else {
      document.body.classList.remove('modern-design');
    }
  });

  return (  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <ToastProvider components={{ ToastContainer, Toast }}>
        <TourProvider
          steps={steps}
          styles={styles}
          showNavigation={false}
          showBadge={false}>
          <div
            ref={ref}
            className='app'
            style={{
              backgroundColor: fullScreenStatus ? 'var(--bs-body-bg)' : undefined,
              zIndex: fullScreenStatus ? 1 : undefined,
              overflow: fullScreenStatus ? 'scroll' : undefined,
            }}>
            {/* <NavigationHandler /> */}
          
              <AsideRoutes />
              <Wrapper />
          
          </div>
          <Portal id='portal-notification'>
            <ReactNotifications />
          </Portal>
        </TourProvider>
      </ToastProvider>
    </ThemeProvider>
    </Provider>
  );
}

export default App;
