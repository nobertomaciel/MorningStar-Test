import React, { useState } from "react";

//import Select from '../select'
import ProductSelect from '../select';

import { Dialog } from 'primereact/dialog';
import "primereact/resources/themes/lara-light-cyan/theme.css";

function Entrada() {
    const [visible, setVisible] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);  // Estado para o produto selecionado
    const [quantity, setQuantity] = useState(1);  // Estado para a quantidade

    const handleSelectChange = (selectedOption) => {
        setSelectedProduct(selectedOption);
    };
    
    const handleQuantityChange = (quant) => {
      setQuantity(quant);
    };
  
    const handleSave = () => {
      console.log("Produto Selecionado:", selectedProduct);
      console.log("Quantidade:", quantity);
      // Salvar os dados aqui
      setVisible(false);
    };
      
    return (
    <div className="modal">
        <button className="entrada" label="Show" icon="pi pi-external-link" onClick={() => setVisible(true)}>Entrada</button>
        <button className="saida" label="Show" icon="pi pi-external-link" onClick={() => setVisible(true)}>Saída</button>
        <Dialog header={"Registrar entrada"} visible={visible} style={{ width: '50vw', height: '50vw'}} onHide={() => {if (!visible) return; setVisible(false); }}>
            
            {/* <Select/>
             */}
             
             <ProductSelect onSelectChange={handleSelectChange} onQuantityChange={handleQuantityChange} />

            <button className="close" label="Show" icon="pi pi-external-link" onClick={() => setVisible(false)}>Fechar</button>
            
            {/* <button className="save" label="Show" icon="pi pi-external-link" onClick={() => setVisible(true)}>Salvar</button> */}
            <button className="save" label="Show" icon="pi pi-external-link" onClick={handleSave}>Salvar</button>
        </Dialog>
    </div>)
}

export default Entrada;