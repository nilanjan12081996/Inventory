const convertToReadableFormat = (date = null, format = 'd/m/y') => {
  if (!date || date === null) return;

  const inputDate = new Date(date);

  const year = inputDate.getFullYear();
  const month = inputDate.toLocaleString('en-US', {
    month: 'short',
  });

  const day = inputDate.getDate().toString().padStart(2, '0');

  return `${day}-${month}-${year}`;
};

export { convertToReadableFormat };

// const convertToReadableFormat = (date = null, format = 'd/m/y') => {
//   if (!date || date === null) return;

//   const inputDate = new Date(date);

//   const year = inputDate.getFullYear();
//   const month = inputDate.getMonth() + 1; // Months are 0-based, so add 1
//   const day = inputDate.getDate();
//   let dateFormats;
//   if (format === 'string') {
//     dateFormats = `${date.getFullYear()}-${(date.getMonth() + 1)
//       .toString()
//       .padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
//     return dateFormats;
//   } else {
//     dateFormats = {
//       'd/m/y': `${day}/${month}/${year}`,
//       'd-m-y': `${day}-${month}-${year}`,
//     };
//     return dateFormats[format];
//   }
// };

// export { convertToReadableFormat };
