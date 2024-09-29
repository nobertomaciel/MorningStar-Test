import React, { useState } from "react";
import Select from '../select'
import { Dialog } from 'primereact/dialog';
import "primereact/resources/themes/lara-light-cyan/theme.css";

function Entrada() {
    const [visible, setVisible] = useState(false);
    return (
    <div className="modal">
        <button className="entrada" label="Show" icon="pi pi-external-link" onClick={() => setVisible(true)}>Entrada</button>
        <Dialog header={"Registrar entrada"} visible={visible} style={{ width: '50vw', height: '50vw'}} onHide={() => {if (!visible) return; setVisible(false); }}>
            <Select/>
            <button className="close" label="Show" icon="pi pi-external-link" onClick={() => setVisible(false)}>Fechar</button>
            <button className="save" label="Show" icon="pi pi-external-link" onClick={() => setVisible(true)}>Salvar</button>
        </Dialog>
    </div>)
}

export default Entrada;