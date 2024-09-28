import React, { useState } from "react";
import Select from '../select'
import { Dialog } from 'primereact/dialog';
import "primereact/resources/themes/lara-light-cyan/theme.css";

function Saida() {
    const [visible, setVisible] = useState(false);
    return (
    <div className="modal">
    <button className="saida" label="Show" icon="pi pi-external-link" onClick={() => setVisible(true)}>Saída</button>
    <Dialog header={"Registrar saída"} visible={visible} style={{ width: '50vw', height: '50vw'}} onHide={() => {if (!visible) return; setVisible(false); }}>
        <Select/>
        <p className="m-0">
            
        </p>
    </Dialog>
    </div>)
}

export default Saida;