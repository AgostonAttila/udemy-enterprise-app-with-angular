
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';

// import { Medication, Patient } from './patient';
import { PatientService } from './patient.service';
import { normalizeCamelCase } from '../../utilities/camelCaseNormalizer';

@Component({
  templateUrl: './patient.component.html'
}) 
export class PatientComponent { 
  form: FormGroup; 

  constructor(
    private fb: FormBuilder,
    private patientService: PatientService) {
      this.form = fb.group({
        name: [''],
        address: fb.group({
          street: [''],
          city: ['']
        }),
        medications: fb.array([])
      });
  }

  save() {
    this.patientService.save(this.form.value).subscribe(
      res => {
        console.log("SUCCESS", res.json());
      },
      err => {
        var errors = err.json();
        console.log("Errors", errors);

        for (var key in errors) {
          var control = this.form.get(normalizeCamelCase(key));
          control.setErrors({
            'remote': errors[key].join()
          });
        }
      });
  }

  addMedication(input) {
    if (!input.value)
      return;

    var medications = <FormArray> this.form.get('medications');
    var newMedication = this.fb.group({ 
      name: [input.value]
    });
    medications.push(newMedication);

    input.value = '';
  }
}