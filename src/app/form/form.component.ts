import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Key } from 'protractor';
import { DataService } from '../service/data.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  providers: [FormBuilder]
})
export class FormComponent implements OnInit {

  constructor(
    public formBuilder: FormBuilder,
    private readonly dataService: DataService
  ) { }

  form: FormGroup;
  isSubmitted: boolean = false;

  get errorControl(){
    return this.form.controls;
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      lastname: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      age: ['', [Validators.required, Validators.min(13), Validators.max(99), Validators.pattern('^[0-9]+$')]],
      mobile: ['', [Validators.required, Validators.pattern('^[0-9]+$')]]
    });
  }

  addContact() {
    this.isSubmitted = true
    if (!this.form.valid) {
      console.log("por favor, rellenar los campos requeridos");
      return false;
    } else {
      this.dataService.createContact(this.form.value);
      console.log("listo!");
      this.form.reset();
      Object.keys(this.form.controls).forEach(Key => {
        this.form.get(Key).setErrors(null);
      });
    }
  }
}
