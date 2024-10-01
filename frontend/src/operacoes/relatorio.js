import { useState } from 'react';
import { Dialog } from 'primereact/dialog';
import { Calendar } from 'primereact/calendar';
import PrintBtn from '../img/print.svg';
import Imprimir from '../operacoes/imprimirPdf';

const Relatorio = () => {
   const [startDate, setStartDate] = useState('2024/01/01');
   const [endDate, setEndDate] = useState('2050/12/01');
   const [printData, setPrintData] = useState([]);


   const getPrintData = async () => {
      try {
         let byDate = {
            startDate: startDate,
            endDate: endDate,
          };
         const apiUrl = "http://localhost:5000/report";
         const result = await fetch(apiUrl, {
            method: "POST",
            body: JSON.stringify(byDate),
            headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
            }
         });
         const reportResult = await result.json();
         console.log("REPORT");
         console.log(reportResult);
         setPrintData(reportResult);
      } catch (error) {
         console.error("Erro ao buscar os dados:", error);
      }
   };


   const [visible, setVisible] = useState({"show":false,"tipo":0,"header":""});
   return (
      <div>
         <button style={{cursor: 'pointer', backgroundColor: 'rgba(0,0,0,0)', backgroundImage: `url(${PrintBtn})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center', height: '30px', width: '30px', border: 'none'}} onClick={() => setVisible({"show":true,"tipo":0,"header":"Relatório de estoque"})}></button>
         <Dialog header={visible.header} visible={visible.show} style={{ width: '50vw', height: '50vw'}} onHide={() => {if (!visible.show) return; setVisible({"show":false,"tipo":visible.tipo,"header":visible.header}); }}>
            <table>
               <tbody>
                  <tr>
                     <td style={{ verticalAlign: 'bottom' }}>De: <Calendar className="calendar" style={{margin: '5px'}} value={startDate} onChange={(e) => setStartDate(e.value)} /></td>
                     <td style={{ verticalAlign: 'bottom' }}>a <Calendar className="calendar" style={{margin: '5px'}} value={endDate} onChange={(e) => setEndDate(e.value)} /></td>
                     <td style={{ verticalAlign: 'bottom' }}><button  className='pesquisar' onClick={() => getPrintData()}>Pesquisar</button></td>
                  </tr>
               </tbody>
            </table>
            
            <Imprimir data = {printData}/>
         
         </Dialog>
      </div>
   );
}

export default Relatorio;