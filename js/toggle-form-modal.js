const pageBody = document.querySelector('body');
const photoEditorModal = document.querySelector('.img-upload__overlay');

const openFormModal = (onDocumentKeydown) => {
  photoEditorModal.classList.remove('hidden');
  pageBody.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
};

const closeFormModal = (resetForm, onDocumentKeydown) => {
  photoEditorModal.classList.add('hidden');
  pageBody.classList.remove('modal-open');
  resetForm();
  document.removeEventListener('keydown', onDocumentKeydown);
};

export {openFormModal, closeFormModal};

