import './draw-photos';
import './toggle-photo-modal';
import './toggle-form-modal';
import './upload-photo-form';
import './api';
import { getData } from './api';
import { renderPhotos } from './draw-photos';
import { onDocumentKeydown, resetForm, setPhotoFormSubmit } from './upload-photo-form';
import { closeFormModal } from './toggle-form-modal';

getData(renderPhotos);

setPhotoFormSubmit(closeFormModal(resetForm, onDocumentKeydown));
