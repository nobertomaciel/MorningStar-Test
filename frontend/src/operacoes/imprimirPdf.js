import generatePDF, { Resolution, Margin } from 'react-to-pdf';
import PrintBtn from '../img/print.svg';

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
   return (
      <div className='reportContent'>
         <br></br>
         <button style={{cursor: 'pointer', backgroundColor: 'rgba(0,0,0,0)', backgroundImage: `url(${PrintBtn})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center', height: '30px', width: '30px', border: 'none'}} onClick={() => generatePDF(getTargetElement, options)}></button>
         <div id="content-id" style={{width: '100%', position: 'absolute', display: 'block'}}>
                  <br></br>
                  <h3>Relatório de estoque por período (mensal)</h3>
                   <table id="table-content-id" style={{width: '100%'}}>
                     <thead style={{fontWeight: 'bold'}}>
                        <tr id="head-content-id">
                           <td>ID</td>
                           <td>Produto</td>
                           <td>Tipo</td>
                           <td>Fabricante</td>
                           <td>Entradas</td>
                           <td>Saídas</td>
                           <td>Estoque</td>
                           <td>Período</td>
                        </tr>
                     </thead>
                     <tbody>
                     {data.map((item) => (
                        <tr key={item.idProduct}>
                           <td>{item.idProduct}</td>
                           <td>{item.productName}</td>
                           <td>{item.productType}</td>
                           <td>{item.productManufactorer}</td>
                           <td>{item.total_entrance}</td>
                           <td>{item.total_exit}</td>
                           <td>{item.stock}</td>
                           <td>{item.period}</td>
                        </tr>
                     ))}
                     </tbody>
                </table>
         </div>
      </div>
   );
}

export default Imprimir;