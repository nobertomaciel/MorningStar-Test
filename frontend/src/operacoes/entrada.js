import React, { useState } from "react";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import Select from '../select'
import { Dialog } from 'primereact/dialog';


function Entrada() {

    const [visible, setVisible] = useState(false);
    return (
    <div className="modal">
    <button className="entrada" label="Show" icon="pi pi-external-link" onClick={() => setVisible(true)}>Entrada</button>
    <Dialog header={"Registrar entrada"} visible={visible} style={{ width: '50vw', height: '50vw'}} onHide={() => {if (!visible) return; setVisible(false); }}>
        <Select/>
        <p className="m-0">
            
        
        </p>
    </Dialog>
    </div>)
}

export default Entrada;