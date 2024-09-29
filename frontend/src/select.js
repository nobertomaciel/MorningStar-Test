import React, { useState } from 'react';
import Select from 'react-select';
import { InputNumber } from 'primereact/inputnumber';
        


function productSelect(){
    const apiUrl = "http://localhost:5000/data";
    const [selectedOption, setSelectedOption] = useState(null);
    const options = [];
    const [quant, setQuant] = useState(1);
    async function getData() {
      const result = await fetch(apiUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*"
        }
      });
      const getResult = await result.json();
      getResult.forEach(e => {
        options.push({value: e.id, label: e.productName});
      });
    }

    getData();

    return (
      <div className="card flex flex-wrap gap-3 p-fluid">
        <div className="flex-auto">
        <label htmlFor="produto" className="font-bold block mb-2">Produto</label>
        <Select inputId="produto" defaultValue={selectedOption} onChange={setSelectedOption} options={options} />
        </div>
        <div className="flex-auto">
                <label htmlFor="quantidade" className="font-bold block mb-2">Quantidade</label>
                <InputNumber inputId="quantidade" value={quant} onValueChange={(e) => setQuant(e.value)} mode="decimal" showButtons min={1} max={10000000} />
        </div>
      </div>
    );
}

export default productSelect;