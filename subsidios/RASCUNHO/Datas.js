import { useEffect, useState } from "react";
import Row from "./row/Row";
import * as yup from "yup";

//nome, número de registro, o fabricante, o tipo e a descrição


function getApiData() {
  const apiUrl = "http://localhost:5000/data";
  //const apiUrl = "https://614b8c82e4cc2900179eb140.mockapi.io/api/v1/restaurants";
  const [datas, setDatas] = useState([]);

  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(""); //current selected id

  const [newNameValue, setNewNameValue] = useState("");
  const [newTypeValue, setNewTypeValue] = useState("");
  const [newManufactorerValue, setNewManufactorerValue] = useState("");
  const [newDescriptionValue, setNewDescriptionValue] = useState("");

  const [nameValue, setNameValue] = useState("");
  const [typeValue, setTypeValue] = useState("");
  const [manufactorerValue, setManufactorerValue] = useState("");
  const [descriptionValue, setDescriptionValue] = useState("");

  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    const result = await fetch(apiUrl);
    const getResult = await result.json();
    setDatas(getResult);
  }

  async function addData() {
    if(newNameValue == "" || newTypeValue == "" || newManufactorerValue == "" || newDescriptionValue == ""){
      alert("Todos os campos devem ser preenchidos!");
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
        "Content-Type": "application/json"
      }
    });
    const getResult = await result.json();
    console.log(getResult);
    setEditId(0);
    setEditMode(false);
    getData();
    setNewNameValue("");
    setNewTypeValue("");
    setNewManufactorerValue("");
    setNewDescriptionValue("");
  }

  async function patchData(id) {
    if(nameValue == "" || typeValue == "" || manufactorerValue == "" || descriptionValue == ""){
      alert("Todos os campos devem ser preenchidos!");
      return false;
    }
    let patchData = {
      productName: nameValue,
      productType: typeValue,
      productManufactorer: manufactorerValue,
      productDescription: descriptionValue
    };
    const result = await fetch(apiUrl + "/" + id, {
      method: "PUT",
      body: JSON.stringify(patchData),
      headers: {
        "Content-Type": "application/json"
      }
    });
    const getResult = await result.json();
    console.log(getResult);
    setEditId(0);
    setEditMode(false);
    getData();
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
      getData();
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
        <div className="headerCell">
        </div>
      </div>
      <div className="row">
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
        <div className="cell">
          <button onClick={addData}>Add Produto</button>
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
