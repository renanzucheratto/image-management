import { Component } from '@angular/core';
import { CardImageComponent } from '../card-image/card-image.component';
import { ImageBankService } from '../../services/image-bank.service';
import { ImageDb } from '../../models/db';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CardImageComponent, CommonModule, ReactiveFormsModule],
  templateUrl: './home.component.html',
  providers: [ImageBankService],
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  imagesList: ImageDb[] = [];
  filteredImagesList: ImageDb[] = [];
  searchForm!: FormGroup;

  constructor(
    private imageBankService: ImageBankService,
    private formBuilder: FormBuilder,
  ) {}

  ngOnInit() {
    this.imageBankService.getAllImages().subscribe((images) => {
      this.imagesList = this.filteredImagesList = images;
    })

    this.searchForm = this.formBuilder.group({
      search: [null]
    })

    this.filterImage();
  }

  filterImage() {
    this.searchForm
      .get('search')!
      .valueChanges
      .pipe(
        debounceTime(400)
      )
      .subscribe((searchValue) => {
        if(!!searchValue){
          const filteredImages = this.imagesList.filter((image) => {
            return image.keywords.some(({label}) => {
              return label.includes(searchValue)
            })
          });
          this.filteredImagesList = filteredImages;
          return;
        }

        this.filteredImagesList = this.imagesList;
      })
  }
}
