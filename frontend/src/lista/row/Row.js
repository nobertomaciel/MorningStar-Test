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
      <div className="cell">
        {!props.editMode && (
          <>
            <button
              className="edit"
              id={props.x.id}
              onClick={() => {
                props.rowEdit(props.x);
              }}
            >
              Editar
            </button>
            <button
              className="delete"
              id={props.x.id}
              onClick={() => {
                props.deleteData(props.x.id);
              }}
            >
              Remover
            </button>
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
