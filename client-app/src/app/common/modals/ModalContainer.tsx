import { observer } from "mobx-react-lite";
import { Button, Icon, Modal } from "semantic-ui-react";
import { useStore } from "../../stores/stores";



export default observer(function ModalContainer() {
    const {modalStore} = useStore();
    return (
        <Modal open={modalStore.modal.open} onClose={modalStore.closeModal} size='mini'>
            <Modal.Content>
               
                <Icon onClick={()=> modalStore.closeModal()}  name='times circle' size='large' color='black'  style={{ position: 'absolute', top: '10px', right: '10px',cursor:'pointer'  }}/>
              
                {modalStore.modal.body}
            </Modal.Content>
        </Modal>
    )
})