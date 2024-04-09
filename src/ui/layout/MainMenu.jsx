import React from "react";
import { BsChevronDown, BsChevronRight } from "react-icons/bs";
import { NavLink, Link } from "react-router-dom";

const MainMenu = () => {
  const roles = localStorage.getItem("userRole");
  console.log("item master Role: ", roles);
  return (
    <div className="main_menu">
      <ul className="flex">
        <li className="mr-2 md:pr-6">
          <NavLink to="/" className="text-base text-black hover:text-[#556ee6]">
            Dashboard
          </NavLink>
        </li>

        <li className="mr-2 md:pr-6">
          <NavLink className="flex items-center text-base text-black hover:text-[#556ee6]">
            QA <BsChevronDown className="ml-[3px] text-[14px]" />
          </NavLink>
          <ul>
            {roles === "ROLE_HREXECUTIVE" ||
            roles === "ROLE_USER" ||
            roles === "ROLE_HRSUPERVISOR" ? (
              <></>
            ) : (
              <li>
                <NavLink
                  to="/item-master"
                  className="flex items-center justify-between"
                >
                  Item master <BsChevronRight />
                </NavLink>
                <ul>
                  {roles === "ROLE_WHMANAGER" ||
                  roles === "ROLE_WHEXECUTIVE" ||
                  roles === "ROLE_WHSUPERVISOR" ? (
                    <></>
                  ) : (
                    <li>
                      <NavLink to="/item-master">New Item Creation</NavLink>
                    </li>
                  )}

                  <li>
                    <NavLink to="/item-master">View List of Items</NavLink>
                  </li>
                  {roles === "ROLE_WHMANAGER" ||
                  roles === "ROLE_WHEXECUTIVE" ||
                  roles === "ROLE_QAEXECUTIVE" ||
                  roles === "ROLE_WHSUPERVISOR" ? (
                    <></>
                  ) : (
                    <li>
                      <NavLink to="/item-master">Update</NavLink>
                    </li>
                  )}
                  {roles === "ROLE_WHMANAGER" ||
                  roles === "ROLE_WHEXECUTIVE" ||
                  roles === "ROLE_QAEXECUTIVE" ||
                  roles === "ROLE_QASUPERVISOR" ||
                  roles === "ROLE_WHSUPERVISOR" ? (
                    <></>
                  ) : (
                    <li>
                      <NavLink to="/item-master">Delete</NavLink>
                    </li>
                  )}
                </ul>
              </li>
            )}

            {roles === "ROLE_QAEXECUTIVE" ||
            roles === "ROLE_HREXECUTIVE" ||
            roles === "ROLE_USER" ||
            roles === "ROLE_WHEXECUTIVE" ||
            roles === "ROLE_WHMANAGER" ||
            roles === "ROLE_WHSUPERVISOR" ||
            roles === "ROLE_HRSUPERVISOR" ? (
              <></>
            ) : (
              <li>
                <NavLink
                  className="flex items-center justify-between"
                  to="/bom-master"
                >
                  IP BOM master <BsChevronRight />
                </NavLink>
                <ul>
                  <li>
                    <NavLink to="/bom-master">Save Bom List</NavLink>
                  </li>
                  <li>
                    <NavLink to="/view-bom-list">View Bom List</NavLink>
                  </li>
                </ul>
              </li>
            )}
          </ul>
        </li>
        <li className="mr-2 md:pr-6">
          <NavLink to="/" className="text-base text-black hover:text-[#556ee6]">
            HW
          </NavLink>
        </li>
        <li className="mr-2 md:pr-6">
          <NavLink className="flex items-center text-base text-black hover:text-[#556ee6]">
            HR <BsChevronDown className="ml-[3px] text-[14px]" />
          </NavLink>
          <ul>
            <li>
              <NavLink to="/employee-registration">
                Employee Registration
              </NavLink>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  );
};

export default MainMenu;
