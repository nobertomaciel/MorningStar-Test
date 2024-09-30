import React, { useState } from "react";
import ProductSelect from '../componentes/select';
import { Dialog } from 'primereact/dialog';
import "primereact/resources/themes/lara-light-cyan/theme.css";

function Movimentar() {
    const [visible, setVisible] = useState({"show":false,"tipo":0,"header":""});
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
        // salvar os dados
        async function putData (){
          let newData = {
              idProduct: selectedProduct.value,
              movimentType: visible.tipo,
              quantity: quantity
          };
          const apiUrl = "http://localhost:5000/moviment";
          const result = await fetch(apiUrl, {
            method: "POST",
            body: JSON.stringify(newData),
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*"
            }
          });
          const getResult =  await result.json();
          const regexTest = /\d{4}/;
          if(regexTest.test(getResult["message"])){
            alert("Erro ao inserir registro de movimentação!");
            setVisible({"show":true,"tipo":visible.tipo,"header":visible.header});
          }
          else{
            alert("Registro inserido!");
          }
        }
        
        putData();

        // salvar os dados
        setVisible({"show":false,"tipo":visible.tipo,"header":visible.header});
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
        <button className="entrada" icon="pi pi-external-link" onClick={() => setVisible({"show":true,"tipo":1,"header":"Registro de entrada"})}>Entrada</button>
        <button className="saida" icon="pi pi-external-link" onClick={() => setVisible({"show":true,"tipo":2,"header":"Registro de saída"})}>Saída</button>
        <Dialog header={visible.header} visible={visible.show} style={{ width: '50vw', height: '50vw'}} onHide={() => {if (!visible.show) return; setVisible({"show":false,"tipo":visible.tipo,"header":visible.header}); }}>
             
             <ProductSelect onSelectChange={handleSelectChange} onQuantityChange={handleQuantityChange} />

            <button className="close" icon="pi pi-external-link" onClick={() => setVisible({"show":false,"tipo":visible.tipo,"header":visible.header})}>Fechar</button>
            
            <button className="save" icon="pi pi-external-link" onClick={handleSave}>Salvar</button>
        </Dialog>
    </div>)
}

export default Movimentar;