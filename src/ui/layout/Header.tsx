import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { logo, logoIcon } from '../../assets/images/images';

import DropdownMessage from '../../components/DropdownMessage';
import DropdownNotification from '../../components/DropdownNotification';

import { BiMenu } from 'react-icons/bi';
import DropdownUser from '../../components/DropdownUser';
import MainMenu from './MainMenu';
import { useNotification } from '../../pages/Notification/Notification';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { postAddNotification } from '../../slices/NotificationSlice';


function Header(props: {
  sidebarOpen: string | boolean | undefined;
  setSidebarOpen: (arg0: boolean) => void;
})

{
 
  return (
    <div className='z-10 sticky top-0 z-999 flex w-full bg-white shadow-md'>
      <div className='flex flex-grow items-center justify-between py-4 px-2 shadow-2 md:px-6 2xl:px-11'>
        <Link to='/'>
          <h1 className='text-xl font-bold text-[#173f7e]'>LOGO</h1>
        </Link>
        <MainMenu />
        <div className='flex items-center gap-2 sm:gap-4 hidden'>
          {/* <!-- Hamburger Toggle BTN --> */}
          <button
            aria-controls='sidebar'
            onClick={(e) => {
              e.stopPropagation();
              props.setSidebarOpen(!props.sidebarOpen);
            }}
            className='z-99999 block rounded-sm border border-stroke bg-white p-1 shadow-sm dark:border-strokedark dark:bg-boxdark lg:hidden'
          >
            <BiMenu className='text-2xl' />
          </button>
          {/* <!-- Hamburger Toggle BTN --> */}
          <Link className='block flex-shrink-0 lg:hidden' to='/'>
            <img src={logoIcon} alt='Logo' />
          </Link>
        </div>

        <div className='hidden sm:block'> &nbsp;</div>

        <div className='flex items-center gap-3 2xsm:gap-7'>
          <ul className='flex items-center gap-2 2xsm:gap-4'>
            {/* <!-- Notification Menu Area --> */}
            <DropdownNotification />
            {/* <!-- Notification Menu Area --> */}
          </ul>

          {/* <!-- User Area --> */}
          <DropdownUser />
          {/* <!-- User Area --> */}
        </div>
      </div>
    </div>
  );
}

export default Header;
