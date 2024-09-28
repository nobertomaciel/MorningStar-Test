import Produtos from './lista/produtos';

function Menu(){

    // const [newNameValue, setNewNameValue] = useState("");
    // const [newTypeValue, setNewTypeValue] = useState("");
    // const [newManufactorerValue, setNewManufactorerValue] = useState("");
    // const [newDescriptionValue, setNewDescriptionValue] = useState("");
    
    // // const newNameValue = "";
    // // const newTypeValue = "";
    // // const newManufactorerValue = "";
    // // const newDescriptionValue = "";

    // function newName(e) {
    //     setNewNameValue(e.target.value);
    // }
    // function newType(e) {
    //     setNewTypeValue(e.target.value);
    // }
    // function newManufactorer(e) {
    //     setNewManufactorerValue(e.target.value);
    // }
    // function newDescription(e) {
    //     setNewDescriptionValue(e.target.value);
    // }
    
    // setNewNameValue("");
    // setNewTypeValue("");
    // setNewManufactorerValue("");
    // setNewDescriptionValue(""); 

    // async function addData() {
    //     if(newNameValue == "" || newTypeValue == "" || newManufactorerValue == ""){
    //       alert("Todos os campos devem ser preenchidos!");
    //       return false;
    //     }
    //     if(newNameValue.match(/[^a-zA-Z 0-9]+/g) || newTypeValue.match(/[^a-zA-Z 0-9]+/g) || newManufactorerValue.match(/[^a-zA-Z 0-9]+/g) || newDescriptionValue.match(/[^a-zA-Z 0-9]+/g)){
    //       alert("Não utilize caracteres especiais!");
    //       return false;
    //     }
    
    //     let newData = {
    //       productImage: "no",
    //       productName: newNameValue,
    //       productType: newTypeValue,
    //       productManufactorer: newManufactorerValue,
    //       productDescription: newDescriptionValue
    //     };
    
    //     const result = await fetch(apiUrl, {
    //       method: "POST",
    //       body: JSON.stringify(newData),
    //       headers: {
    //         "Content-Type": "application/json"
    //       }
    //     });
    //     const getResult = await result.json();
    //     if(getResult["message"][0]==1062){
    //       alert("Produto com nome já cadastrado!");
    //       return false;
    //     }
    //     console.log(getResult);
    //     setEditId(0);
    //     setEditMode(false);
    //     getData();
    //     setNewNameValue("");
    //     setNewTypeValue("");
    //     setNewManufactorerValue("");
    //     setNewDescriptionValue("");
    //   }

      return (
        <div>
            <div className="cell">
            {/* <input type="text" className="inputNew" value={newNameValue} onChange={newName} required />
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
            <button onClick={addData}>Add Produto</button> */}
            </div>
      </div>
    );
}

export default Menu;