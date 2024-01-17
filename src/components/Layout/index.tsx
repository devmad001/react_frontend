import React, {FC} from 'react';
import { Outlet } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

interface IProps{
  children:JSX.Element
}

const Layout:FC<IProps> = ({children}) => {
  return (
    <>
     <HelmetProvider>
       {children}
      </HelmetProvider>
    <Outlet />
    </>
  )
}

export default Layout