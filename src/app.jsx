// app.jsx
/* eslint-disable import/no-duplicates */
import { useEffect, useContext } from 'react';

import { useTheme, useMediaQuery } from '@mui/material';

import Router from 'src/routes/sections';

import { useScrollToTop } from 'src/hooks/use-scroll-to-top';

import 'src/global.css';
import ThemeProvider from 'src/theme'; // Correct default import for ThemeProvider
import { OpacityContext } from 'src/theme'; // Named import for OpacityContext

import PullToRefreshComponent from 'src/components/pull-to-refresh/PullToRefreshComponent';

import { useSystemHealthMonitor } from './utils/systemHealthMonitor'; // Import the custom hook
import useIdleTimer from './hooks/use-idle-timer'; // Import the idle timer hook

export default function App() {

  useScrollToTop();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { opacity } = useContext(OpacityContext); // Get opacity from context

  useSystemHealthMonitor(); // Use the custom hook to monitor system health and set opacity
  useIdleTimer(900000); // Set idle timeout to 5 minutes (300000 ms)

  // Use useEffect to log the ASCII art only once when the app loads
  useEffect(() => {
    console.log(
      '%cWhy do programmers prefer dark mode? %c Because the light attracts bugs! 🐛',
      'color: #ff6347; font-size: 20px; font-weight: bold; padding: 10px;',
      'color: #3498db; font-size: 18px; font-style: italic; padding: 10px;'
    );

    console.log(
      `%c
                                                                                                    
                                                                   .....                            
                                                                   .#%+.                            
                                                                   .%%%-.                           
                                                                   .=%%#.                           
                                                                   .:%%%:                           
                                                                    .#%%-                           
                                                                    .#%%-                           
                                    ...                             :%%%.                           
                                  .=%%*.                           .=%%*.                           
                                  .#%%*.                           .%%%-.                           
                                  :%%%=                           .*%%*.                            
                                ..+%%%.                . ..:----:.*%%#..                            
                                 .%%%+.             ..+#%%%%%%%%%%%%%%*=:..                         
                                .+%%%:.   ....    .-%%%%%%%%%%%%%%%%%%%%%%..    ...::---::..        
                                .*%%%%:...-%%-.. .#%%%%%%%%%%%%%%%%%%%%%%%*..:+%%%%%%%%%%%%%%%=.    
               .....            ..:#%%%#-#%%%%#:...:%%%%%%%%%%%%%%%%%%%%%%%#%%%%%%#+-:::-+#%%%%:    
              .*%%%%%######**:.    .-#%%%%%%%%%%#:...-%%%%%%%%%%%%%%%%%%%%%%%+-...          ...     
              :#%%%%%%%%%%%%%%#:.....*%%%%%%%%%%%%*....=%%%%%%%%%%%%%%%%%%%%..                      
                          .-%%%%*..*%%%%%%%%%%%%%%%%*....+%%%%%%%%%%%%%%%%%%..                      
                          ...=%%%%%%%%%%%%%%%%%%%%%%%%+....*%%%%%%%%%%%%%%%%.                       
                   .....    ...*%%%%%%%%%%%%%%%%%%%%%%%%=...:#%%%%%%%%%%%%%%..                      
                  .+%%*... ..-#%%%%%%%%%%%%%%%%%%%%%%%%%%#-...:#%%%%%%%%%%%+..                      
     ............+%%%%%%*..:#%%%%%%###%%%%%%%%%%%%%%%%%%%%%#:...-%%%%%%%%%#:                        
    .-**********%%%%*+%%%%%%%%%%%-.....:%%%%%%%%%%%%%%%%%%%%%#....-%%%%%%%:.                        
  ..-%%%%%%%%%%%%%*....+%%%%%%%%+.:#%%=.:%%%%%%%%%%%%%%%%%%%%%%+....=%%%#:..                        
    .:===========:.   .=%%%%%%%%=.:%%%+.:%%%%%%%%%%%%%%%%%%%%%%%%+....+=..                          
                    ..-%%%%%%%%%=.......#%%%%%%%%%%%%%%%%%%%%%%%%%%-....                            
                    ..%%%%%%%%+...%%#%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%:..                            
                    .=%%%%%%#...#%%%%%#-::-#%%%%%%%%%%%%%%%%%%%%%%%%%%#:.                           
                    .*%%%%%%%:.:%%%%%-..==..:#%%%%%*=:-=#%%%%%%%%%%%%%#:.                           
                    .#%%%%%%%+..%%%%*..#%%#:.*%%%%...--..=%%%%%%%%%%#-.                             
                    .#%%%%%%%-..=%%%#:.:%#-..#%%%-..%%%#..%%%%%%%%%%%-..  ..........                
                    .#%%%%%=..:#%%%*.......=%%%%%#..=%#:.:%%%%%%%+*%%%#-.-+*#%%%%%*.                
                    .*%%%+...*%%%#:..=%%%%%%%%%%+.......+%%%%%%*...:#%%%%%%%%%%%%*:.                
                    .=%*...+%%%#-..-%%%%##%%%%*...+%%%%%%%%%%%=..   .-#%#*+-.....                   
                    .....+%%%%=..:%%%%#:   .....=%%%%%%%%%%%%%%%:.    .                             
                      .=%%%%+...#%%%#:..-######%%%%%%%%%%%-.:#%%%#..                                
                      .#%%+...*%%%#-..-#%%%%%%%%%%%%%%%%=.  ..-#%%%-.                               
                      .=*...+%%%%=..:#%%%%%%%%%%%%%%%%*..     ..%%%-.                               
                        ..=%%%%+..:#%%%%%%%%%%%%%%%%%%%#:...   .%%%-.                               
                        ....-+...*%%%%%%%%%%%%%%#:..:%%%%#...  .%%%=.                               
                            ......::--====--:.....  ..*%%%%-. ..%%%+.                               
                                                  ..-#%%%*..  ..#%%+.                               
                                                 .:#%%%#..     .#%%*.                               
                                                 .:%%%:.      ..=%%=.                               
                                                 .:%%%:          ..                                 
                                                 .:%%%:                                             
                                                 .:%%%:                                             
                                                 .:%%%:                                             
                                                 .:%%%:                                             
                                                  .-=:..                                            
                                                                                                    
                                                                                                    
      `,
      'color: #00ff00; font-size: 6px; font-family: monospace;'
    );
  }, []); // Empty dependency array ensures this runs only once
  // return <div>Hello, World!</div>;

  return (
    <ThemeProvider>
      {/* Apply opacity to a wrapper div that contains all content */}
      <div
        style={{
          opacity,
          transition: 'opacity 0.5s ease',
          width: '100%',
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {isMobile ? (
          <PullToRefreshComponent>
            <Router />
          </PullToRefreshComponent>
        ) : (
          <Router />
        )}
      </div>
    </ThemeProvider>
  );
}
