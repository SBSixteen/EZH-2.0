import logo from './logo.svg';
import './App.css';
import {AppShell, Navbar, MediaQuery, Text, Header, Burger,ActionIcon, Group} from '@mantine/core'
import { MantineProvider } from '@mantine/core';
import {SunIcon, MoonIcon} from '@modulz/radix-icons'
import {useState} from 'react'
import { createStyles, GlobalStyles, useMantineTheme } from '@mantine/styles';
import {MemoryRouter,NavLink,Route,Routes} from 'react-router-dom'
import {invoke} from '@tauri-apps/api/tauri'



function App() {

const views =[
{
  path:'/home',
  name: 'Home',
  component : null
},
{
  path:'/settings',
  name: 'Settings',
  component : null
},
{
  path:'/login',
  name: 'Logout',
  component : null
},]

const [opened, setOpened] = useState(false);
const defColorScheme = 'dark';
const [colorScheme, setColorScheme] = useState(defColorScheme);

const toggleColorScheme = value =>{
  const newValue = value || (colorScheme === 'dark' ? 'light' : 'dark');
  setColorScheme(newValue);
}

const useStyles = createStyles((theme) => ({
  navLink: {
    display: 'block',
    width: '100%',
    padding: theme.spacing.xs,
    borderRadius: theme.spacing.sm,
    color: colorScheme ==='dark' ? theme.colors.dark[0]:theme.black,
    textDecoration: 'none',

    '&:hover' : {
      backgroundColor: colorScheme ==='dark' ? theme.colors.dark[6]:theme.colors.gray[1],
    }
  },
  navLinkActive:{
    backgroundColor: colorScheme ==='dark' ? theme.colors.dark[6]:theme.colors.gray[1],
  }
}));

const {classes} = useStyles();

  return (
    <MantineProvider theme = {{colorScheme: colorScheme, fontFamily:'Exo 2, sans-serif'}} with GlobalStyles>
      <MemoryRouter>
        <AppShell padding="md" navbarOffsetBreakpoint="sm" fixed navbar={
          <Navbar width={{sm:200}} padding="xs" hidden={!opened} hiddenBreakpoint="sm">
            {
              views.map((view,index) => 
              <NavLink align="left" to={view.path} key={index} onClick={() =>setOpened(false)} className={({ isActive }) => classes.navLink + ' ' +  (isActive ? classes.navLinkActive: '')}>
                {
                  //Icons go here
                }
                <Group>
                  <Text>
                    {view.name}
                  </Text></Group>
              </NavLink>
              )
            }
          </Navbar>
        }
        
        header = {
          <Header height ={70} padding = "md">
            <div style = {{display : 'flex', alignItems : 'center', height:'100%'}}>

          <MediaQuery largerThan="sm" styles = {{display: 'none'}}>
            <Burger opened ={opened} onClick = {() => setOpened((o) => !o)} size ="sm" color ={useMantineTheme().colors.gray[6]} mr="x1" />
          </MediaQuery>
          <Text> EZHire </Text>
          <div style ={{marginLeft: "auto"}}>
            <ActionIcon variant="default" onClick={() => toggleColorScheme()} size={30}>
              {colorScheme === 'dark' ? <SunIcon /> : <MoonIcon/>}
            </ActionIcon>
            </div>
         
            </div>
          </Header>
        }
        styles = {theme => ({
          main : {backgroundColor : theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.dark[0]},
        })}
        >
          <Routes>
            {
            views.map((view, index) => <Route key={index} path ={view.path} element = {<view.component />} />)
}
          </Routes>
          </AppShell>
        </MemoryRouter>
        </MantineProvider>
  );
}

export default App;
