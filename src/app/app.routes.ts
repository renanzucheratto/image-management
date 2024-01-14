import { Routes } from '@angular/router';
import { UploadImageComponent } from './components/upload-image/upload-image.component';
import { HomeComponent } from './components/home/home.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'upload',
    component: UploadImageComponent
  }
];
