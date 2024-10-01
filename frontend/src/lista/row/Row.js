import Grafico from "../../componentes/grafico";
import TrashBtn from "../../img/trash.svg";
import EditBtn from "../../img/edit.svg";

function Row(props) {
  return (
    <div className="row">
      <div className="idCell">
        {props.x.id}
      </div>
      <div className="cell">
        {(!props.editMode || props.x.id !== props.editId) &&
          props.x.productName}
        {props.editMode && props.x.id === props.editId && (
          <input
            type="text"
            value={props.nameValue}
            onChange={(e) => {
              props.setNameValue(e.target.value);
            }}
          />
        )}
      </div>
      <div className="cell">
        {(!props.editMode || props.x.id !== props.editId) &&
          props.x.productType}
        {props.editMode && props.x.id === props.editId && (
          <input
            type="text"
            value={props.typeValue}
            onChange={(e) => {
              props.setTypeValue(e.target.value);
            }}
          />
        )}
      </div>
      <div className="cell">
        {(!props.editMode || props.x.id !== props.editId) &&
          props.x.productManufactorer}
        {props.editMode && props.x.id === props.editId && (
          <input
            type="text"
            value={props.manufactorerValue}
            onChange={(e) => {
              props.setManufactorerValue(e.target.value);
            }}
          />
        )}
      </div>
      <div className="cell">
        {(!props.editMode || props.x.id !== props.editId) &&
          props.x.productDescription}
        {props.editMode && props.x.id === props.editId && (
          <input
            type="text"
            value={props.descriptionValue}
            onChange={(e) => {
              props.setDescriptionValue(e.target.value);
            }}
          />
        )}
      </div>
      <div className="cell" style={{width: '50%'}}>
        {!props.editMode && (
          <>
            <button style={{backgroundColor: 'rgba(0,0,0,0)', backgroundImage: `url(${EditBtn})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center', height: '20px', width: '20px', border: 'none'}}
              className="edit"
              id={props.x.id}
              onClick={() => {
                props.rowEdit(props.x);
              }}
            >
              {/* Editar */}
            </button>
            <button disabled={true} style={{opacity: '0.3', backgroundColor: 'rgba(0,0,0,0)', backgroundImage: `url(${TrashBtn})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center', height: '20px', width: '20px', border: 'none'}}
              className="delete"
              id={props.x.id}
              onClick={() => {
                props.deleteData(props.x.id);
              }}
            >
              {/* Remover */}
            </button>
            <Grafico idProduct={props.x.id}/>
          </>
        )}
        {props.editMode && props.x.id === props.editId && (
          <>
            <button
              className="save"
              id={props.x.id}
              onClick={() => {
                props.patchData(props.x.id);
              }}
            >
              Ok
            </button>
            <button
              className="cancel"
              id={props.x.id}
              onClick={() => {
                props.rowEditCancel("0");
              }}
            >
              Cancelar
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default Row;
