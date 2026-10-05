import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ServiceService } from '../../services/service.service';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-create-service',
  imports: [ 
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './create-service.html',
  styleUrl: './create-service.scss'
})
export class CreateService {
  form: FormGroup;
  imageFile?: File;
  uploading = false;
  previewUrl: string | ArrayBuffer | null | undefined;

  constructor(
    private fb: FormBuilder,
    private serviceService: ServiceService,
    private router: Router
  ) {
    this.form = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      category: ['', Validators.required],
      price: [null, [Validators.required, Validators.min(1)]],
      image: [null, Validators.required]
    });
  }

  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input?.files?.length) {
      const file = input.files[0];

      // Update form value without trying to write back to the input
      this.form.get('image')?.setValue(file);
  
      // Optional preview
      const reader = new FileReader();
      reader.onload = () => {
        this.previewUrl = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }

  submit() {
    console.log("this.form",this.form)
    if (this.form.invalid) return;

    this.uploading = true;
    const formData = new FormData();

    formData.append('title', this.form.value.title);
    formData.append('description', this.form.value.description);
    formData.append('category', this.form.value.category);
    formData.append('price', this.form.value.price);
    formData.append('image', this.form.value.image);

    this.serviceService.createService(formData).subscribe({
      next: () => {
        this.uploading = false;
        this.router.navigate(['/']);
      },
      error: (err: object) => {
        console.error(err);
        this.uploading = false;
      }
    });
  }
}
