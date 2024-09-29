import { useState } from "react";
import { Modal } from "./Modal";

function PageComponent() {
  const [modal, setModal] = useState(false);

  return (
    <div><button
      onClick={() => setModal(true)}
    >
      Open modal
    </button>
    <Modal
      openModal={modal}
      closeModal={() => setModal(false)}
    >
      Modal content.
    </Modal></div>
  )
}
export default PageComponent;