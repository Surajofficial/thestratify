// utils/ModalService.js
const ModalService = {
    modalRef: null,
    wasOpened: false, // track if modal ever opened
    register(modalInstance) {
        this.modalRef = modalInstance;
    },
    open() {
        if (this.modalRef) {
            this.modalRef.show();
            this.wasOpened = true;
        }
    },
    close() {
        this.modalRef?.hide();
    },
};

export default ModalService;
