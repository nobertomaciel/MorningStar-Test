import React, { useState } from 'react';

function Menu(){
    const [newNameValue, setNewNameValue] = useState("");
    const [newTypeValue, setNewTypeValue] = useState("");
    const [newManufactorerValue, setNewManufactorerValue] = useState("");
    const [newDescriptionValue, setNewDescriptionValue] = useState("");


    // setNewNameValue("");
    // setNewTypeValue("");
    // setNewManufactorerValue("");
    // setNewDescriptionValue("");

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