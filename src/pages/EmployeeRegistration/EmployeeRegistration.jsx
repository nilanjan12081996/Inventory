import { useEffect, useState } from "react";
import { Button, Label, Select, TextInput, FileInput } from "flowbite-react";
import { BsDashCircle, BsPlusCircle } from "react-icons/bs";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getAddress, getCountry } from "../../slices/NewEmpSlice";
import useStateCode from "../../hooks/CounteryRegHook";
import useDistCode from "../../hooks/StateRegHook";

const EmployeeRegistration = () => {
  const dispatch = useDispatch();
  const { register, handleSubmit, setValue, getValues } = useForm();
  const [empId, setEmpId] = useState("");
  const [isAutoFilled, setIsAutoFilled] = useState(false);
  const { formData, country, address } = useSelector((state) => state.empreg);
  console.log(address);

  const [isChecked, setIsChecked] = useState(false);
  const [countryCodeDropdownId, setCountryCodeDropdownId] = useState();
  const [countryCodeDropdownIdcpy, setCountryCodeDropdownIdcpy] = useState();
  const [stateCodeDropdownId, setStateCodeDropdownId] = useState();
  const [stateCodeDropdownIdcpy, setStateCodeDropdownIdcpy] = useState();

  const handleCountryTypeChange = (event) => {
    setCountryCodeDropdownId(event.target.value);
  };
  const handleCountryTypeChangecpy = (event) => {
    setCountryCodeDropdownIdcpy(event.target.value);
  };
  const handleStateTypeChange = (event) => {
    setStateCodeDropdownId(event.target.value);
  };
  const handleStateTypeChangecpy = (event) => {
    setStateCodeDropdownIdcpy(event.target.value);
  };
  const handleEmpIdChange = (event) => {
    const { value } = event.target;
    setEmpId(value);
    if (value !== "") {
      // Autofill other sections
      setValue("empcode", value);

      // Disable other employee code fields
      setIsAutoFilled(true);
    } else {
      // Clear and enable other employee code fields
      setValue("empcode", "");
      setIsAutoFilled(false);
    }
  };
  const stateList = useStateCode(countryCodeDropdownId);
  const distList = useDistCode(stateCodeDropdownId);
  const stateListcpy = useStateCode(countryCodeDropdownIdcpy);
  const distListcpy = useDistCode(stateCodeDropdownIdcpy);
  const [data, setData] = useState({
    employee: {
      address: [
        {
          type: " ",
          countryCode: " ",
          districtCode: " ",
          pincode: " ",
          email: " ",
        },
      ],
    },
  });

  // Initialize form data
  const initialFormData = {
    employee: {
      empId: "",
      empName: "",
      adharNo: "",
      panNo: "",
      departmentCode: "",
      experience: [
        {
          designation: "",
          company: "",
          name: "",
          from_experience: "",
          to_experience: "",
        },
      ],
      salary: {
        basic: "",
        hra: "",
        epf: "",
        pf: "",
        profeTax: "",
      },
      qualifications: [
        {
          qualification: "",
          university: "",
          from_year: "",
          to_year: "",
        },
      ],
      address: [
        {
          type: " ",
          countryCode: " ",
          districtCode: " ",
          pincode: " ",
          email: " ",
        },
      ],
    },
  };
  // let add_values;
  // const handleChange = (event) => {
  //   setIsChecked(event.target.checked);
  //   if (event.target.checked) {
  //     add_values = getValues();
  //     console.log("address", add_values);
  //     setData({
  //       ...initialFormData,
  //       addressCode: getValues().addressCode,
  //       empcode: getValues().empcode,
  //       vendorcode: getValues().vendorcode,
  //       address1: getValues().address1,
  //       Address2: getValues().Address2,
  //       Landmark: getValues().Landmark,
  //       countrycode: getValues().countrycode,
  //       countrycode1: getValues().countrycode1,
  //       state: getValues().state,
  //       district: getValues().district,
  //       pincode: getValues().pincode,
  //       phone1: getValues().phone1,
  //       phone2: getValues().phone2,
  //       addresstype: getValues().addresstype,
  //       email: getValues().email,
  //     });
  //   }
  // };
  const handleCheckboxChange = () => {
    setIsChecked(!isChecked); // Toggle the checkbox state
  };

  const onSubmit = (formData) => {
    const Data = new FormData();
    Data.append("file", formData.file);
    console.log("d", formData);
  };
  useEffect(() => {
    if (formData && formData.employee) {
      Object.keys(initialFormData).forEach((key) => {
        setValue(key, formData.employee[key]);
      });
    }
  }, [setValue, formData]);
  const [qualifications, setQualifications] = useState([
    { qualification: "", yop: "", university: "", file: "" },
  ]);
  const handleAddRow = () => {
    setQualifications([
      ...qualifications,
      { qualification: "", yop: "", university: "", file: "" },
    ]);
  };

  const handleChanges = (index, e) => {
    const { name, value } = e.target;
    const updatedQualifications = [...qualifications];
    updatedQualifications[index][name] = value;
    setQualifications(updatedQualifications);
  };
  const handleRemoveRow = (index) => {
    setQualifications(qualifications.filter((_, i) => i !== index));
  };
  useEffect(() => {
    dispatch(getCountry());
  }, [dispatch]);
  useEffect(() => {
    console.log(countryCodeDropdownId);
  }, []);
  useEffect(() => {
    console.log(stateCodeDropdownId);
  });
  useEffect(() => {
    let d = dispatch(getAddress());
    console.log("add", d);
  }, [dispatch]);

  return (
    <div className="wrapper_area max-w-7xl my-0 mx-auto px-0">
      <div className="bg-white mb-4 md:mb-0 py-6 px-6 shadow-md rounded-xl w-full h-full">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-medium text-[#556ee6]">
            Employee Registration
          </h1>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="my-8">
            <div className="flex items-center">
              <div className="flex justify-center items-center border border-[#d1d5db] bg-[#f9fafb] rounded-[5px] h-[120px] w-[100px] mb-2">
                <p className="text-[14px]">Photo</p>
              </div>
              <div className="ml-2">
                <Label>Upload Photo (max.Size 5mb) </Label>
                <FileInput id="file" accept=".jpg,.jpeg,.png,.gif" />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-2">
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="base" value="Emp ID" />
                </div>
                <TextInput
                  id="base1"
                  type="text"
                  sizing="md"
                  {...register("employee.empId", {
                    required: "Emp ID is required",
                  })}
                  onChange={handleEmpIdChange}
                />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="base" value="Emp Name" />
                </div>
                <TextInput
                  id="base1"
                  type="text"
                  sizing="md"
                  {...register("empname", {
                    required: "Emp Name is required",
                  })}
                />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="base" value="Aadhar No" />
                </div>
                <TextInput
                  id="base1"
                  type="text"
                  sizing="md"
                  {...register("aadharno", {
                    required: "Aadhar No is required",
                  })}
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-2">
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="base" value="PAN No" />
                </div>
                <TextInput
                  id="base1"
                  type="text"
                  sizing="md"
                  {...register("panno", {
                    required: "Pan No is required",
                  })}
                />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="base" value="Department Code" />
                </div>
                <TextInput
                  id="base1"
                  type="text"
                  sizing="md"
                  {...register("departmentCode", {
                    required: "Department Code is required",
                  })}
                />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="base" value="Designation Code" />
                </div>
                <TextInput
                  id="base1"
                  type="text"
                  sizing="md"
                  {...register("designationCode", {
                    required: "Designation Code is required",
                  })}
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-2">
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="base" value="Address Code" />
                </div>
                <TextInput
                  id="base1"
                  type="text"
                  sizing="md"
                  placeholder="Addreess Code copy 1"
                  {...register("address_code", {
                    required: "Address Code is required",
                  })}
                />
              </div>
            </div>
            <h2 className="text-xl text-[#556ee6] py-2">ADRESS</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-2">
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="base" value="Address code" />
                </div>
                <TextInput
                  id="base2"
                  type="text"
                  sizing="md"
                  placeholder="Addresscode copy"
                  {...register("addressCode", {
                    required: "Address Code is required",
                  })}
                />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="base" value="EMP Code" />
                </div>
                <TextInput
                  id="base2"
                  type="text"
                  sizing="md"
                  {...register("empcode", {
                    required: "Emp Code is required",
                  })}
                  disabled={isAutoFilled}
                />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="base" value="Vendor code" />
                </div>
                <TextInput
                  id="base2"
                  type="text"
                  sizing="md"
                  {...register("vendorcode", {
                    required: "Vendor Code  is required",
                  })}
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-2">
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="base" value="Adress 1 (Line 1)" />
                </div>
                <TextInput
                  id="base2"
                  type="text"
                  sizing="md"
                  {...register("address1", {
                    required: "Address 1 is required",
                  })}
                />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="base" value="Adress 2  (Line 1)" />
                </div>
                <TextInput
                  id="base2"
                  type="text"
                  sizing="md"
                  {...register("Address2", {
                    required: "Address 2 is required",
                  })}
                />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="base" value="Landmark" />
                </div>
                <TextInput
                  id="base2"
                  type="text"
                  sizing="md"
                  {...register("Landmark", {
                    required: "Landmark is required",
                  })}
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-2">
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="base" value="Country Code" />
                </div>

                <Select
                  id="country"
                  {...register("countrycode", {
                    required: "Country Code is required",
                  })}
                  onChange={handleCountryTypeChange}
                >
                  <option>Select</option>
                  {country.map((coun) => (
                    <option key={coun.id} value={coun.countryCode}>
                      {coun.countryCode}-{coun.countryName}
                    </option>
                  ))}
                </Select>
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="base" value="State" />
                </div>
                <Select
                  id="state"
                  {...register("state", {
                    required: "State is required",
                  })}
                  disabled={!countryCodeDropdownId}
                  onChange={handleStateTypeChange}
                >
                  <option>Select</option>
                  {stateList.map((data) => (
                    <option key={data.id} value={data?.label}>
                      {data?.label}
                    </option>
                  ))}
                </Select>
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="base" value="District Code" />
                </div>
                <Select
                  id="district"
                  {...register("district", {
                    required: "District is required",
                  })}
                  disabled={!stateCodeDropdownId}
                >
                  <option>Select</option>
                  {distList.map((data) => (
                    <option key={data.id} value={data?.label}>
                      {data?.label}
                    </option>
                  ))}
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-2">
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="base" value="PinCode" />
                </div>
                <TextInput
                  id="base"
                  type="text"
                  sizing="md"
                  {...register("pincode", {
                    required: "PinCode is required",
                  })}
                />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="base" value="Phone 1" />
                </div>
                <TextInput
                  id="base2"
                  type="tel"
                  sizing="md"
                  {...register("phone1", {
                    required: "Phone 1 is required",
                  })}
                />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="base" value="Phone 2" />
                </div>
                <TextInput
                  id="base2"
                  type="tel"
                  sizing="md"
                  {...register("phone2", {
                    required: "Phone 2 is required",
                  })}
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-2">
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="base" value="Adress type" />
                </div>
                <Select
                  id="adresstype"
                  required
                  {...register("addresstype", {
                    required: "Address Type is required",
                  })}
                >
                  {address?.map((ad) => (
                    <option key={ad.id} value={ad.addressType}>
                      {ad.addressType}
                    </option>
                  ))}
                </Select>
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="base" value="Email" />
                </div>
                <TextInput
                  id="base2"
                  type="email"
                  sizing="md"
                  {...register("email", {
                    required: "email is required",
                    pattern: {
                      value: /\S+@\S+\.\S+/,
                      message: "Entered value does not match email format",
                    },
                  })}
                />
              </div>
            </div>
            <div className="flex items-center py-3">
              <input
                type="checkbox"
                className="mr-2"
                name="autoFill"
                onChange={handleCheckboxChange}
              />

              <p className="text-[#556ee6] text-[14px]">
                Please tick the check box in case of permanent / present is
                same. Should auto fill in below table
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-2">
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="base" value="Address code" />
                </div>
                {!isChecked && <TextInput id="base3" type="text" sizing="md" />}
                {isChecked && (
                  <TextInput
                    id="base"
                    type="text"
                    sizing="md"
                    defaultValue={isChecked ? getValues("addressCode") : ""}
                  />
                )}
                {/* <TextInput
                  id="base"
                  type="text"
                  sizing="md"
                  value={isChecked ? getValues("addressCode") : ""}
                /> */}
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="base" value="EMP Code" />
                </div>
                {!isChecked && <TextInput id="base3" type="text" sizing="md" />}
                {isChecked && (
                  <TextInput
                    id="base"
                    type="text"
                    sizing="md"
                    defaultValue={isChecked ? getValues("empcode") : ""}
                    disabled={isAutoFilled}
                  />
                )}
                {/* <TextInput
                  id="base"
                  type="text"
                  sizing="md"
                  value={isChecked ? getValues("empcode") : ""}
                  disabled={isAutoFilled}
                /> */}
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="base" value="Vendor code" />
                </div>
                {!isChecked && <TextInput id="base3" type="text" sizing="md" />}
                {isChecked && (
                  <TextInput
                    id="base"
                    type="text"
                    sizing="md"
                    defaultValue={isChecked ? getValues("vendorcode") : ""}
                  />
                )}
                {/* <TextInput
                  id="base"
                  type="text"
                  sizing="md"
                  value={isChecked ? getValues("vendorcode") : ""}
                /> */}
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-2">
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="base" value="Adress 1 (Line 1)" />
                </div>
                {!isChecked && <TextInput id="base3" type="text" sizing="md" />}
                {isChecked && (
                  <TextInput
                    id="base"
                    type="text"
                    sizing="md"
                    defaultValue={isChecked ? getValues("address1") : ""}
                  />
                )}
                {/* <TextInput
                  id="base"
                  type="text"
                  sizing="md"
                  value={isChecked ? getValues("address1") : ""}
                /> */}
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="base" value="Adress 2  (Line 1)" />
                </div>
                {!isChecked && <TextInput id="base3" type="text" sizing="md" />}
                {isChecked && (
                  <TextInput
                    id="base"
                    type="text"
                    sizing="md"
                    defaultValue={isChecked ? getValues("Address2") : ""}
                  />
                )}
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="base" value="Landmark" />
                </div>
                {!isChecked && <TextInput id="base3" type="text" sizing="md" />}
                {isChecked && (
                  <TextInput
                    id="base"
                    type="text"
                    sizing="md"
                    defaultValue={isChecked ? getValues("Landmark") : ""}
                  />
                )}
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-2">
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="base" value="District Code" />
                </div>
                <Select
                  id="district2"
                  {...register("district1", {
                    required: "District is required",
                  })}
                  disabled={!stateCodeDropdownIdcpy}
                  // value={isChecked ? getValues("district") : ""}
                >
                  <option>
                    {isChecked ? getValues("district") : "Select"}
                  </option>
                  {distListcpy.map((data) => (
                    <option key={data.id} value={data.label}>
                      {data.lebel}
                    </option>
                  ))}
                </Select>
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="base" value="State" />
                </div>
                <Select
                  id="state2"
                  {...register("state1", {
                    required: "State is required",
                  })}
                  disabled={!countryCodeDropdownIdcpy}
                  onChange={handleStateTypeChangecpy}
                >
                  <option>{isChecked ? getValues("state") : "Select"}</option>
                  {stateListcpy.map((data) => (
                    <option key={data.id} value={data?.label}>
                      {data?.label}
                    </option>
                  ))}
                </Select>
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="base" value="Country Code" />
                </div>

                <Select
                  id="country1"
                  {...register("countrycode1", {
                    required: "Country Code is required",
                  })}
                  onChange={handleCountryTypeChangecpy}
                >
                  <option>
                    {isChecked ? getValues("countrycode") : "Select"}
                  </option>
                  {country.map((coun) => (
                    <option key={coun.id} value={coun.countryCode}>
                      {coun.countryCode}-{coun.countryName}
                    </option>
                  ))}
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-2">
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="base" value="PinCode" />
                </div>
                {!isChecked && <TextInput id="base3" type="text" sizing="md" />}
                {isChecked && (
                  <TextInput
                    id="base"
                    type="text"
                    sizing="md"
                    defaultValue={isChecked ? getValues("pincode") : ""}
                  />
                )}
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="base" value="Phone 1" />
                </div>
                {!isChecked && <TextInput id="base3" type="text" sizing="md" />}
                {isChecked && (
                  <TextInput
                    id="base"
                    type="text"
                    sizing="md"
                    defaultValue={isChecked ? getValues("phone1") : ""}
                  />
                )}
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="base" value="Phone 2" />
                </div>
                {!isChecked && <TextInput id="base3" type="text" sizing="md" />}
                {isChecked && (
                  <TextInput
                    id="base"
                    type="text"
                    sizing="md"
                    defaultValue={isChecked ? getValues("phone2") : ""}
                  />
                )}
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-2">
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="base" value="Adress type" />
                </div>
                <Select id="adresstype" required disabled={isChecked}>
                  <option>
                    {isChecked ? getValues("addresstype") : "Select"}
                  </option>
                  {address.map((ad) => (
                    <option key={ad.id} value={ad.addressType}>
                      {ad.addressType}
                    </option>
                  ))}
                </Select>
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="base" value="Email" />
                </div>
                {!isChecked && <TextInput id="base3" type="text" sizing="md" />}
                {isChecked && (
                  <TextInput
                    id="base"
                    type="text"
                    sizing="md"
                    defaultValue={isChecked ? getValues("email") : ""}
                  />
                )}
              </div>
            </div>
            <h2 className="text-xl text-[#556ee6] py-2">QUALIFICATIONS</h2>
            {qualifications.map((qualification, index) => (
              <div
                key={index}
                className="grid grid-cols-1 md:grid-cols-5 gap-2 mb-2"
              >
                <div>
                  <div className="mb-2 block">
                    <label htmlFor={`qualification-${index}`}>
                      Qualification
                    </label>
                  </div>
                  <TextInput
                    id="base"
                    type="text"
                    sizing="md"
                    {...register("qualification", {
                      required: "Qualification is required",
                    })}
                    onChange={(e) => handleChanges(index, e)}
                  />
                </div>
                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="base" value="Year of passing" />
                  </div>
                  <TextInput
                    id="base"
                    type="text"
                    sizing="md"
                    {...register("yop", {
                      required: "Year of Passing is required",
                    })}
                    onChange={(e) => handleChange(index, e)}
                  />
                </div>
                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="base" value="University" />
                  </div>
                  <TextInput
                    id="base"
                    type="text"
                    sizing="md"
                    {...register("university", {
                      required: "University is required",
                    })}
                    onChange={(e) => handleChange(index, e)}
                  />
                </div>
                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="base" value="Upload Files" />
                  </div>
                  <FileInput
                    id="file"
                    sizing="md"
                    helperText=""
                    {...register("file", {
                      required: "Upload files is required",
                    })}
                    onChange={(e) => handleChange(index, e)}
                  />
                </div>
                {/* Similar inputs for year of passing, university, and file */}
                <div className="mt-10 pl-4">
                  {index === qualifications.length - 1 && (
                    <>
                      <button onClick={handleAddRow}>
                        <BsPlusCircle className="text-xl text-green-700 mr-1" />
                      </button>
                      {index !== 0 && (
                        <button onClick={() => handleRemoveRow(index)}>
                          <BsDashCircle className="text-xl text-red-700 ml-1" />
                        </button>
                      )}
                    </>
                  )}
                </div>
              </div>
            ))}
            <h2 className="text-xl text-[#556ee6] py-2">SALARY DETAILS</h2>
            <div className="grid grid-cols-2 md:grid-cols-7 gap-2 mb-2">
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="base" value="salary Code" />
                </div>
                <TextInput
                  id="base"
                  type="text"
                  sizing="md"
                  {...register("salary", {
                    required: "Salary Code is required",
                  })}
                />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="base" value="Emp id" />
                </div>
                <TextInput
                  id="base"
                  type="text"
                  sizing="md"
                  {...register("empid", {
                    required: "Emp Id is required",
                  })}
                />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="base" value="Basic" />
                </div>
                <TextInput
                  id="base"
                  type="text"
                  sizing="md"
                  {...register("basic", {
                    required: "Basic is required",
                  })}
                />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="base" value="HRA" />
                </div>
                <TextInput
                  id="base"
                  type="text"
                  sizing="md"
                  {...register("hra", {
                    required: "Hra is required",
                  })}
                />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="base" value="EPF" />
                </div>
                <TextInput
                  id="base"
                  type="text"
                  sizing="md"
                  {...register("epf", {
                    required: "Epf is required",
                  })}
                />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="base" value="PF" />
                </div>
                <TextInput
                  id="base"
                  type="text"
                  sizing="md"
                  {...register("pf", {
                    required: "Pf is required",
                  })}
                />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="base" value="Professional tax" />
                </div>
                <TextInput
                  id="base"
                  type="text"
                  sizing="md"
                  {...register("tax", {
                    required: "Professional tax is required",
                  })}
                />
              </div>
            </div>
            <Button
              className="text-[14px] text-white mt-4 px-4 py-1"
              type="submit"
            >
              Save
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EmployeeRegistration;
