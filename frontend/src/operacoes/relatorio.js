import { useEffect, useState } from 'react';
import { Dialog } from 'primereact/dialog';
import PrintBtn from '../img/print.svg';
import Imprimir from '../operacoes/imprimirPdf';
import { getData } from '../lista/produtos';

const Relatorio = () => {
   const [data, setData] = useState([]);
   useEffect(() => {
      const fetchData = async () => {
         try {
            const result = await getData();
            setData(result);
         } catch (error) {
            console.error("Erro ao buscar os dados:", error);
         }
      };

      fetchData();
   }, []);

   const [visible, setVisible] = useState({"show":false,"tipo":0,"header":""});
   return (
      <div>
         <button style={{cursor: 'pointer', backgroundColor: 'rgba(0,0,0,0)', backgroundImage: `url(${PrintBtn})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center', height: '30px', width: '30px', border: 'none'}} onClick={() => setVisible({"show":true,"tipo":0,"header":"Relatório mensal"})}></button>
         <Dialog header={visible.header} visible={visible.show} style={{ width: '50vw', height: '50vw'}} onHide={() => {if (!visible.show) return; setVisible({"show":false,"tipo":visible.tipo,"header":visible.header}); }}>
            
            <Imprimir data = {data}/>
         
         </Dialog>
      </div>
   );
}

export default Relatorio;