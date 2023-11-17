 /* eslint-disable */
 import { useState } from 'react';

function DatePicker({inputValues, setInputValues}) {
  const [minDate, setMinDate] = useState(getTodayDate());

  function getTodayDate() {
    const today = new Date();
    const year = today.getFullYear();
    let month = today.getMonth() + 1;
    let day = today.getDate();

    if (month < 10) {
      month = '0' + month;
    }
    if (day < 10) {
      day = '0' + day;
    }

    return `${year}-${month}-${day}`;
  }

  return (
    <>
      <label htmlFor="date"  className={`text-sm text-white-100 md:text-xl lg:text-2xl`}>Datum:</label>
      <input
        value={inputValues.date}
        type="date"
        id="date"
        name="date"
        className={`border border-gray-300 rounded-md p-1.5 text-sm text-gray-400 my-2 h-8 lg:h-12 lg:text-lg lg:p-3`}
        min={minDate}
        onChange={(e) => setInputValues({...inputValues, date: e.target.value})}
      />
    </>
  );
}

export default DatePicker;