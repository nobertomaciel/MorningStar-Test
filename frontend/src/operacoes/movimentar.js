import React, { useState } from "react";

//import Select from '../select'
import ProductSelect from '../componentes/select';

import { Dialog } from 'primereact/dialog';
import "primereact/resources/themes/lara-light-cyan/theme.css";

function Entrada() {
    const [visible, setVisible] = useState({"hidden":false,"tipo":0,"header":""});
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);

    const handleSelectChange = (selectedOption) => {
        setSelectedProduct(selectedOption);
    };
    
    const handleQuantityChange = (quant) => {
      setQuantity(quant);
    };
  
    const handleSave = () => {
      console.log("Produto Selecionado:", selectedProduct);
      console.log("Quantidade:", quantity);
      if(quantity>0 && selectedProduct != null){
        // Salvar os dados aqui
        setVisible({"hidden":false,"tipo":visible.tipo,"header":visible.header});
      }
      else if(quantity == 0){
        alert("Quantidade não pode ser igual a 0!");
      }
      else if(selectedProduct == null){
        alert("Selecione o produto para movimentar!");
      }
      else{
        alert("Erro desconhecido, tente novamente!");
      }
    };
      
    return (
    <div className="modal">
        <button className="entrada" label="Show" icon="pi pi-external-link" onClick={() => setVisible({"hidden":true,"tipo":1,"header":"Registro de entrada"})}>Entrada</button>
        <button className="saida" label="Show" icon="pi pi-external-link" onClick={() => setVisible({"hidden":true,"tipo":2,"header":"Registro de saída"})}>Saída</button>
        <Dialog header={visible.header} visible={visible.hidden} style={{ width: '50vw', height: '50vw'}} onHide={() => {if (!visible.hidden) return; setVisible({"hidden":false,"tipo":visible.tipo,"header":visible.header}); }}>
            
            {/* <Select/>
             */}
             
             <ProductSelect onSelectChange={handleSelectChange} onQuantityChange={handleQuantityChange} />

            <button className="close" label="Show" icon="pi pi-external-link" onClick={() => setVisible({"hidden":false,"tipo":visible.tipo,"header":visible.header})}>Fechar</button>
            
            {/* <button className="save" label="Show" icon="pi pi-external-link" onClick={() => setVisible(true)}>Salvar</button> */}
            <button className="save" label="Show" icon="pi pi-external-link" onClick={handleSave}>Salvar</button>
        </Dialog>
    </div>)
}

export default Entrada;