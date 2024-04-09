import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineBell } from "react-icons/ai";
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { getNotification, postAddNotification } from '../slices/NotificationSlice';
import { useNotification } from '../pages/Notification/Notification';

const DropdownNotification = () => {
 
  const [dropdownOpen, setDropdownOpen] = useState(false);
  let { notificationCount } = useNotification();
 const [read,setRead] = useState(notificationCount)
 console.log("notisf",read);
  const trigger = useRef<any>(null);
  const dropdown = useRef<any>(null);
const handleChange = () =>{
  setDropdownOpen(!dropdownOpen)
  dispatch(getNotification({read:false})).then(()=>{
    notificationCount=null
    console.log(notificationCount);
    setRead(notificationCount)
    
  })

}
  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!dropdown.current) return;
      if (
        !dropdownOpen ||
        dropdown.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setDropdownOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }: KeyboardEvent) => {
      if (!dropdownOpen || keyCode !== 27) return;
      setDropdownOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  });
   const dispatch = useDispatch()
  
  const { add } = useSelector((state) => state.noti);
  console.log("add",add);
  useEffect(() => {
    dispatch(postAddNotification());
  }, [dispatch]);

  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000); // Update every second

    return () => clearInterval(interval);
  }, []);

  const formatDate = (date) => {
    const options = { day: 'numeric', month: 'short', year: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  };
  return (
    <li className="relative">
      <Link
        ref={trigger}
        onClick={handleChange}
        to="#"
        className="relative flex h-8 w-8 items-center r-68 justify-center rounded-full border-[0.5px] border-stroke bg-gray-100 hover:text-primary dark:border-strokedark dark:bg-meta-4 dark:text-white"
      >
        <span className="absolute -top-0.5 right-0 z-1 h-2 w-2 rounded-full bg-meta-1">
          <span className="absolute -z-1 inline-flex h-full w-full animate-ping rounded-full bg-meta-1 opacity-75"></span>
        </span>
        <AiOutlineBell className='text-xl text-[#556ee6]'/>
        {notificationCount > 0 && read !== null ? (
  <span
    style={{
      height: '14px',
      width: '16px',
      color: 'white',
      borderRadius: '50%',
      backgroundColor: 'red',
      fontSize: '11px',
      textAlign: 'center',
      transform: 'translate(-5px, -10px)'
    }}
  >
    {notificationCount}
  </span>
 
):
null

}
      </Link>

      <div
        ref={dropdown}
        onFocus={() => setDropdownOpen(true)}
        onBlur={() => setDropdownOpen(false)}
        className={`absolute -right-27 mt-2.5 flex h-90 w-75 flex-col rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark sm:right-0 sm:w-80 ${
          dropdownOpen === true ? 'block' : 'hidden'
        }`}
      >
        <div className="px-4 py-3">
          <h5 className="text-sm font-medium text-gray-400">Notification</h5>
        </div>

        <ul className="flex h-80 flex-col overflow-y-auto">
          <li>
            <Link
              className="flex flex-col gap-2 border-t border-stroke px-4 py-3 hover:bg-gray-2 text-gray-600"
              to="/"
            >
             
             <p className="text-sm" >
                 {add.tableName} {add.type}
                 <span className="text-xs text-black" style={{paddingLeft:'40%'}}>{formatDate(currentDate)}</span>
             </p>
        
            

              
            </Link>
          </li>
          {/* <li>
            <Link
              className="flex flex-col gap-2 border-t border-stroke px-4 py-3 hover:bg-gray-2 text-gray-600"
              to="/"
            >
              <p className="text-sm">
                It is a long established fact that a reader will be distracted by the readable.
              </p>

              <p className="text-xs text-black">24 Feb, 2025</p>
            </Link>
          </li> */}
          {/* <li>
            <Link
              className="flex flex-col gap-2 border-t border-stroke px-4 py-3 hover:bg-gray-2 text-gray-600"
              to="#"
            >
              <p className="text-sm">
                There are many variations of passages of Lorem Ipsum available, but the majority have
                suffered
              </p>

              <p className="text-xs text-black">04 Jan, 2025</p>
            </Link>
          </li> */}
          {/* <li>
            <Link
              className="flex flex-col gap-2 border-t border-stroke px-4 py-3 hover:bg-gray-2 text-gray-600"
              to="#"
            >
              <p className="text-sm">
                There are many variations of passages of Lorem Ipsum available, but the majority have
                suffered
              </p>

              <p className="text-xs text-black">01 Dec, 2024</p>
            </Link>
          </li> */}
        </ul>
      </div>
    </li>
  );
};

export default DropdownNotification;
