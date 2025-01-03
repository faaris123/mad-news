import { NavigationContainer } from '@react-navigation/native';
import { useState } from 'react';

import BadgerTabs from './navigation/BadgerTabs';
import CS571 from '@cs571/mobile-client';
import BadgerNewsContext from './BadgerNewsContext';

export default function BadgerNews(props) {

  // Just a suggestion for Step 4! Maybe provide this to child components via context...
  const [prefs, setPrefs] = useState({});

  // Set provider to send prefs and setPrefs to child components
  return (
    <>
      <BadgerNewsContext.Provider value={{ prefs, setPrefs }}>
        <NavigationContainer>
          <BadgerTabs />
        </NavigationContainer>
      </BadgerNewsContext.Provider>
    </>
  );
}
