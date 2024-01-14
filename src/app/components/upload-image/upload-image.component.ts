import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { 
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import {
  NgbDateParserFormatter,
  NgbDatepickerModule,
  NgbInputDatepickerConfig,
} from '@ng-bootstrap/ng-bootstrap';
import { CustomDateParserFormatter } from './datepicker-adapter';
import { ImageBankService } from '../../services/image-bank.service';
import { ImageDb } from '../../models/db';
import { inputValueIsNumber, tagsValidator } from '../../utils/validators';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-upload-image',
  standalone: true,
  imports: [
    ReactiveFormsModule, 
    CommonModule, 
    NgbDatepickerModule,
  ],
  providers: [
    NgbInputDatepickerConfig,
    ImageBankService,
    { 
      provide: NgbDateParserFormatter,
      useClass: CustomDateParserFormatter
    },
  ],
  templateUrl: './upload-image.component.html',
  styleUrl: './upload-image.component.scss'
})
export class UploadImageComponent {

  uploadImageForm!: FormGroup;
  now: Date = new Date();
  startDateObject: any;

  constructor(
    private formBuilder: FormBuilder,
    private dateAdapter: NgbDateParserFormatter,
    private imageBankService: ImageBankService,
    public toastService: ToastService
  ) {}

  ngOnInit() {
    this.startDateObject = {
      year: this.now.getFullYear(),
      month: this.now.getMonth() + 1,
      day: this.now.getDate()
    };
    this.uploadImageForm = this.formBuilder.group({
      price: [null, [Validators.required, inputValueIsNumber()]],
      title: [null, [Validators.required]], 
      description: [null, [Validators.required]], 
      image: ['', [Validators.required]],
      keywords: [null, [Validators.required, tagsValidator()]],
      fileName: [null],
      createdAt: [this.startDateObject, [Validators.required]], 
    })
  }

  isFieldValid(field: string) {
    return this.uploadImageForm.get(field)!.invalid && this.uploadImageForm.get(field)!.touched;
  }

  displayFieldCss(field: string) {
    return {
      'form-control': true,
      'is-invalid': this.isFieldValid(field)
    };
  }

  onFileSelected(event: Event) {
    const target = event.target as HTMLInputElement;
    const file = target.files![0];
    const reader = new FileReader();
    console.log(file, this.uploadImageForm.value);

    reader.readAsDataURL(file);
    reader.onload = () => {
      this.uploadImageForm.patchValue({
        image: reader.result,
        fileName: file.name
      });
    }
  }

  handleFormSubmit() {
    const { price, title, description, image, fileName, keywords, createdAt } = this.uploadImageForm.value;
    const formattedKeywords = keywords.split(',').map((keyword: string, id: number) => ({id: id++, label: keyword}));

    const createdAtFormatted = this.dateAdapter.format(createdAt)
    const payload: ImageDb = {
      price,
      title,
      description,
      file: { 
        fileName,
        base64: image
      },
      createdAt: createdAtFormatted,
      keywords: formattedKeywords
    }

    this.imageBankService.setNewImage(payload)
    this.uploadImageForm.reset({
      price: null,
      title: null,
      description: null,
      image: '',
      keywords: null,
      fileName: null,
      createdAt: this.startDateObject
    })
    this.toastService.show({
      body: 'Ficheiro adicionado com sucesso!',
      type: 'success'
    });
  }

}
