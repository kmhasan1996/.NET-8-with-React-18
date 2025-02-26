import { makeAutoObservable } from "mobx"

interface Modal {
    open: boolean;
    body: JSX.Element | null;
   // size:any;
}

export default class ModalStore {
    modal: Modal = {
        open: false,
        body: null,
      //  size:'mini'
    }

    constructor() {
        makeAutoObservable(this);
    }

    openModal = (content: JSX.Element) => {
        this.modal.open = true;
        this.modal.body = content;
        //this.modal.size = size;

       // console.log(size);
    }

    closeModal = () => {
        this.modal.open = false;
        this.modal.body = null;
    }
}