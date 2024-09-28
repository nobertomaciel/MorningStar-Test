import React, { useState } from 'react';
import Select from 'react-select';

function productSelect(){
    const apiUrl = "http://localhost:5000/data";
    const [selectedOption, setSelectedOption] = useState(null);
    const options = [];
    // const options = [
    //   { value: 'chocolate', label: 'Chocolate' }
    // ];

    async function getData() {
      const result = await fetch(apiUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*"
        }
      });
      console.log(result);
      const getResult = await result.json();
      console.log(getResult);

      getResult.forEach(e => {        
        options.push({value: e.idProduct, label: e.productName});
      });
    }
    getData();

    return (
      <div>
        <Select
          defaultValue={selectedOption}
          onChange={setSelectedOption}
          options={options}
        />
      </div>
    );
}

export default productSelect;