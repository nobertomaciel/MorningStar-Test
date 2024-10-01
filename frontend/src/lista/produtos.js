import { useEffect, useState } from "react";
import Row from "./row/Row";
import Movimentar from '../operacoes/movimentar';
import Relatorio from "../operacoes/relatorio";

const apiUrl = "http://localhost:5000/data";

export async function getData() {
  const result = await fetch(apiUrl, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*"
    }
  });
  const getResult = await result.json();
  return getResult;
}

function getApiData() {
  const [datas, setDatas] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState("");
  const [newNameValue, setNewNameValue] = useState("");
  const [newTypeValue, setNewTypeValue] = useState("");
  const [newManufactorerValue, setNewManufactorerValue] = useState("");
  const [newDescriptionValue, setNewDescriptionValue] = useState("");
  const [nameValue, setNameValue] = useState("");
  const [typeValue, setTypeValue] = useState("");
  const [manufactorerValue, setManufactorerValue] = useState("");
  const [descriptionValue, setDescriptionValue] = useState("");
  const [estoqueValue, setEstoqueValue] = useState("");

  useEffect(() => {
    async function fetchData() {
      const data = await getData();
      setDatas(data);
    }
    fetchData();
  }, []);

  async function addData() {
    if(newNameValue == "" || newTypeValue == "" || newManufactorerValue == ""){
      alert("Todos os campos devem ser preenchidos!");
      return false;
    }
    if(newNameValue.match(/[^a-zA-Z 0-9]+/g) || newTypeValue.match(/[^a-zA-Z 0-9]+/g) || newManufactorerValue.match(/[^a-zA-Z 0-9]+/g) || newDescriptionValue.match(/[^a-zA-Z 0-9]+/g)){
      alert("Não utilize caracteres especiais!");
      return false;
    }

    let newData = {
      productImage: "no",
      productName: newNameValue,
      productType: newTypeValue,
      productManufactorer: newManufactorerValue,
      productDescription: newDescriptionValue
    };

    const result = await fetch(apiUrl, {
      method: "POST",
      body: JSON.stringify(newData),
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      }
    });
    const getResult = await result.json();
    if(getResult["message"][0]==1062){
      alert("Produto com nome já cadastrado!");
      return false;
    }
    console.log(getResult);
    setEditId(0);
    setEditMode(false);
    
    const updatedData = await getData();  
    setDatas(updatedData);

    setNewNameValue("");
    setNewTypeValue("");
    setNewManufactorerValue("");
    setNewDescriptionValue("");
  }

  async function patchData(id) {
    if(nameValue == "" || typeValue == "" || manufactorerValue == ""){
      alert("Todos os campos devem ser preenchidos!");
      return false;
    }
    if(nameValue.match(/[^a-zA-Z 0-9]+/g) || typeValue.match(/[^a-zA-Z 0-9]+/g) || manufactorerValue.match(/[^a-zA-Z 0-9]+/g) || descriptionValue.match(/[^a-zA-Z 0-9]+/g)){
      alert("Não utilize caracteres especiais!");
      return false;
    }
    let patchData = {
      id: id,
      productName: nameValue,
      productType: typeValue,
      productManufactorer: manufactorerValue,
      productDescription: descriptionValue,
      productEstoque: estoqueValue
    };
    const result = await fetch(apiUrl + "/" + id, {
      method: "PUT",
      body: JSON.stringify(patchData),
      headers: {
        "Content-Type": "application/json"
      }
    });
    const getResult = await result.json();
    if(getResult["message"][0]==1062){
      alert("Produto com nome já cadastrado!");
      return false;
    }
    console.log(getResult);
    setEditId(0);
    setEditMode(false);

    const updatedData = await getData();  
    setDatas(updatedData);
  }

  async function deleteData(id) {
    if(confirm("Remover o produto de ID "+id+"?")){
      const result = await fetch(apiUrl + "/" + id, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        }
      });
      const getResult = await result.json();
      console.log(getResult);
      setEditMode(false);
      
      const updatedData = await getData();  
      setDatas(updatedData);
    }
  }

  function rowEdit(e) {
    setEditId(e.id);
    setEditMode(!editMode);
    setNameValue(e.productName);
    setTypeValue(e.productType);
    setManufactorerValue(e.productManufactorer);
    setDescriptionValue(e.productDescription);
  }
  function rowEditCancel(e) {
    setEditId(e);
    setEditMode(!editMode);
  }
  function newName(e) {
    setNewNameValue(e.target.value);
  }
  function newType(e) {
    setNewTypeValue(e.target.value);
  }
  function newManufactorer(e) {
    setNewManufactorerValue(e.target.value);
  }
  function newDescription(e) {
    setNewDescriptionValue(e.target.value);
  }

  return (
    <div className="data_table">
      <div className="headerRow">
        <div className="headerIdCell">
        </div>
        <div className="headerCell">
        </div>
        <div className="headerCell">
        </div>
        <div className="headerCell">
        </div>
        <div className="headerCell">
        </div>
        <div className="headerCell" style={{width:'50%', justifyContent: 'center'}}>
        <Relatorio setDatas={setDatas} />
        </div>
        <div style={{width:'50%'}} className="headerCell">
          <Movimentar setDatas={setDatas} />
        </div>
      </div>
      <div className="row" style={{background: 'white'}}>
        <div className="idCell"></div>
        <div className="cell">
          <input type="text" className="inputNew" value={newNameValue} onChange={newName} required />
        </div>
        <div className="cell">
          <input type="text" className="inputNew" value={newTypeValue} onChange={newType} required />
        </div>
        <div className="cell">
          <input type="text" className="inputNew" value={newManufactorerValue} onChange={newManufactorer} required />
        </div>
        <div className="cell">
          <input type="text" className="inputNew" value={newDescriptionValue} onChange={newDescription} required />
        </div>
        <div style={{width:'50%'}} className="cell">
        </div>
        <div style={{width:'50%'}} className="cell">
          <button onClick={addData}>Add</button>
        </div>
      </div>

      <div className="headerRow">
        <div className="headerIdCell">
          ID
        </div>
        <div className="headerCell">
          Nome
        </div>
        <div className="headerCell">
        Tipo
        </div>
        <div className="headerCell">
        Fabricante
        </div>
        <div className="headerCell">
        Descrição
        </div>
        <div className="headerCell" style={{width:'50%', justifyContent: 'center'}}>
        Estoque
        </div>
        <div style={{width:'50%'}} className="headerCell">
        </div>
      </div>

      {datas.map((x) => {
        return (
          <Row
            key={x.id}
            x={x}
            editMode={editMode}
            editId={editId}
            nameValue={nameValue}
            setNameValue={setNameValue}
            typeValue={typeValue}
            setTypeValue={setTypeValue}
            manufactorerValue={manufactorerValue}
            setManufactorerValue={setManufactorerValue}
            descriptionValue={descriptionValue}
            setDescriptionValue={setDescriptionValue}
            estoqueValue={estoqueValue}
            setEstoqueValue={setEstoqueValue}
            rowEdit={rowEdit}
            deleteData={deleteData}
            patchData={patchData}
            rowEditCancel={rowEditCancel}
          />
        );
      })}
    </div>
  );
}

export default getApiData;
