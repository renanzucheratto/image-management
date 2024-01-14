import { Injectable } from '@angular/core';
import { ImageDb } from '../models/db';
import { BehaviorSubject } from 'rxjs';
import { ToastService } from './toast.service';

@Injectable({
  providedIn: 'root'
})
export class ImageBankService {

  private db = localStorage.getItem('images');
  private imagesSubject: BehaviorSubject<ImageDb[]> = new BehaviorSubject<ImageDb[]>([]);
  imagesDb$ = this.imagesSubject.asObservable();

  constructor(public toastService: ToastService) {
    this.loadImagesFromLocalStorage();
  }

  private loadImagesFromLocalStorage() {
    if (this.db) {
      const images: ImageDb[] = JSON.parse(this.db);
      this.imagesSubject.next(images);
    }
  }

  getAllImages() {
    return this.imagesDb$;
  }

  setNewImage(payload: ImageDb) {
    const images = this.imagesSubject.value;
    const imagePayload = {...payload, id: images.length +1};
    const newImage = images.concat(imagePayload);
    this.imagesSubject.next(newImage);
    console.log(newImage)
    localStorage.setItem('images', JSON.stringify(newImage));
  }

  removeImage(id: number) {
    const filterImages = this.imagesSubject.value.filter((image) => image.id !== id);
    const selectedImaged = this.imagesSubject.value.find((image) => image.id === id);
    console.log(selectedImaged)
    this.imagesSubject.next(filterImages);
    localStorage.setItem('images', JSON.stringify(filterImages))
    this.toastService.show({
      body: `Ficheiro "${selectedImaged?.title}" removido com sucesso!`,
      type: 'success'
    })
  }
}
