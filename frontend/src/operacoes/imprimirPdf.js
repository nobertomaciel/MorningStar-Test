import { useEffect, useState } from 'react';
import generatePDF, { Resolution, Margin } from 'react-to-pdf';
import PrintBtn from '../img/print.svg';
import { getData } from '../lista/produtos';

const options = {
   // default is `save`
   method: 'open',
   // default is Resolution.MEDIUM = 3, which should be enough, higher values
   // increases the image quality but also the size of the PDF, so be careful
   // using values higher than 10 when having multiple pages generated, it
   // might cause the page to crash or hang.
   resolution: Resolution.HIGH,
   page: {
      // margin is in MM, default is Margin.NONE = 0
      margin: Margin.SMALL,
      // default is 'A4'
      format: 'letter',
      // default is 'portrait'
      orientation: 'landscape',
   },
   canvas: {
      // default is 'image/jpeg' for better size performance
      mimeType: 'image/png',
      qualityRatio: 1
   },
   // Customize any value passed to the jsPDF instance and html2canvas
   // function. You probably will not need this and things can break, 
   // so use with caution.
   overrides: {
      // see https://artskydj.github.io/jsPDF/docs/jsPDF.html for more options
      pdf: {
         compress: true
      },
      // see https://html2canvas.hertzen.com/configuration for more options
      canvas: {
         useCORS: true
      }
   },
};

// you can use a function to return the target element besides using React refs
const getTargetElement = () => document.getElementById('content-id');



const Imprimir = ({ data }) => {
   // const [data, setData] = useState([]);

   // useEffect(() => {
   //    const fetchData = async () => {
   //       try {
   //          const result = await getData(); // Chame sua função getData
   //          setData(result); // Armazene os dados no estado
   //       } catch (error) {
   //          console.error("Erro ao buscar os dados:", error);
   //       }
   //    };

   //    fetchData(); // Chame a função fetchData
   // }, []); // O array vazio garante que o efeito só seja executado uma vez

   return (
         // <div>
         //    <button 
         //       style={{ 
         //          cursor: 'pointer', 
         //          backgroundColor: 'rgba(0,0,0,0)', 
         //          backgroundImage: `url(${PrintBtn})`, 
         //          backgroundSize: 'cover', 
         //          backgroundRepeat: 'no-repeat', 
         //          backgroundPosition: 'center', 
         //          height: '30px', 
         //          width: '30px', 
         //          border: 'none' 
         //       }} 
         //       onClick={() => generatePDF(getTargetElement, options)}
         //    ></button>
            
         //    <div id="content-id" style={{ position: 'absolute', display: 'block' }}>
         //       {/* Renderize os dados aqui */}
         //       <h2>Relatório de Produtos</h2>
         //       <ul>
         //          {data.map((item) => (
         //             <li key={item.idProduct}>{item.productName}</li>
         //          ))}
         //       </ul>
         //    </div>
         // </div>

      <div>
         <button style={{cursor: 'pointer', backgroundColor: 'rgba(0,0,0,0)', backgroundImage: `url(${PrintBtn})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center', height: '30px', width: '30px', border: 'none'}} onClick={() => generatePDF(getTargetElement, options)}></button>
         <div id="content-id" style={{position: 'absolute', display: 'block'}}>
            {/* Content to be generated to PDF */}
                   <ul>
                   {data.map((item) => (
                      <li key={item.idProduct}>{item.productName}</li>
                   ))}
                </ul>
         </div>
      </div>
   );
}

export default Imprimir;