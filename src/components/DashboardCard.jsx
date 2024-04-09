import { useDispatch } from "react-redux";
import {
  AiFillTag,
  AiFillTags,
  AiOutlineArrowUp,
  AiOutlineBulb,
  AiOutlineShoppingCart,
  BsCollection,
} from "../assets/icons/index";
import { useSelector } from "react-redux";
import {
  itemsExpired,
  itemsRetest,
  minimumStock,
} from "../slices/DashBoardPieCharSlice";
import { useEffect } from "react";

const DashboardCard = () => {
  const { ItemsExpired, ItemsRetest, MinimumStock } = useSelector(
    (state) => state.dashPie
  );
  console.log("min", ItemsExpired);
  const roles = localStorage.getItem("userRole");
  console.log("item master Role: ", roles);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(minimumStock());
    dispatch(itemsRetest());
    dispatch(itemsExpired());
  }, [dispatch]);

  return (
    <>
      {roles === "ROLE_HRSUPERVISOR" || roles === "ROLE_USER" ? (
        <></>
      ) : (
        <div className="rounded-md shadow-md border border-stroke bg-[#1d2939] py-4 px-4 shadow-default">
          <div className="flex items-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
              <AiFillTag className="text-2xl text-teal-400" />
            </div>
            <p className="pl-2 text-lg text-white font-medium">EXPIRED</p>
          </div>

          <div className="mt-4">
            {Array.isArray(itemsExpired) &&
              ItemsExpired.map((exp) => (
                <div className="flex justify-between" key={exp.id}>
                  <h4 className="text-2xl font-medium text-white">
                    {exp.materialsubtype_code}-{exp.materialtype_code}-
                    {exp.count}
                  </h4>
                </div>
              ))}
          </div>
        </div>
      )}

      {roles === "ROLE_HRSUPERVISOR" || roles === "ROLE_USER" ? (
        <></>
      ) : (
        <div className="rounded-md shadow-md border border-stroke bg-[#0766c6] py-4 px-4 shadow-default">
          <div className="flex items-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
              <AiOutlineBulb className="text-2xl text-teal-400" />
            </div>
            <p className="pl-2 text-lg text-white font-medium">RETEST</p>
          </div>

          <div className="mt-4">
            {Array.isArray(ItemsRetest) &&
              ItemsRetest.map((res) => (
                <div className="flex justify-between" key={res.id}>
                  <h4 className="text-2xl font-medium text-white">
                    {res.materialsubtype_code}-{res.materialtype_code}-
                    {res.count}
                  </h4>
                </div>
              ))}
          </div>
        </div>
      )}

      {roles === "ROLE_QASUPERVISOR" ||
      roles === "ROLE_WHSUPERVISOR" ||
      roles === "ROLE_HRSUPERVISOR" ||
      roles === "ROLE_USER" ? (
        <></>
      ) : (
        <div className="rounded-md shadow-md border border-stroke bg-[#dd3544] py-4 px-4 shadow-default">
          <div className="flex items-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
              <AiFillTags className="text-2xl text-teal-400" />
            </div>
            <p className="pl-2 text-lg text-white font-medium">
              STOCK MIN THANLESS
            </p>
          </div>

          <div className="mt-4">
            {Array.isArray(MinimumStock) &&
              MinimumStock.map((dat) => (
                <div className="flex justify-between" key={dat.id}>
                  <h4 className="text-2xl font-medium text-white">
                    {dat.materialsubtype_code}-{dat.materialtype_code}-
                    {dat.count}
                  </h4>
                </div>
              ))}
          </div>
        </div>
      )}
      {roles === "ROLE_QASUPERVISOR" ||
      roles === "ROLE_QAMANAGER" ||
      roles === "ROLE_WHSUPERVISOR" ||
      roles === "ROLE_WHMANAGER" ? (
        <></>
      ) : (
        <div className="rounded-md shadow-md border border-stroke bg-[#00b297] py-4 px-4 shadow-default">
          <div className="flex items-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
              <BsCollection className="text-2xl text-teal-400" />
            </div>
            <p className="pl-2 text-lg text-white font-medium">Users</p>
          </div>

          <div className="mt-4">
            <div className="flex justify-between">
              <h4 className="text-2xl font-medium text-white"></h4>
              {/* <p className="text-white">Total Visitors</p> */}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DashboardCard;
