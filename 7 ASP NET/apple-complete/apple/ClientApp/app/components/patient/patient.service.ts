
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Patient } from './patient';

@Injectable()
export class PatientService { 
  constructor(private http: Http) {
  }

  save(patient: Patient) {
    return this.http.post('/api/patients', patient);
  }
}