import './draw-photos';
import './toggle-photo-modal';
import './toggle-form-modal';
import './upload-photo-form';
import './api';
import { getData } from './api';
import { renderPhotos } from './draw-photos';
import { setPhotoFormSubmit } from './upload-photo-form';


getData(renderPhotos);
setPhotoFormSubmit();
