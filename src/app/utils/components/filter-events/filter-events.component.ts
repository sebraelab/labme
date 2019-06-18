import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormArray, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import * as moment from 'moment';

import { Espaco } from '@app/espacos/espacos.types';

@Component({
  selector: 'filter-events',
  templateUrl: './filter-events.component.html',
  styleUrls: ['./filter-events.component.scss']
})
export class FilterEventsComponent {
  formFilter: FormGroup;
  espacosField: FormArray;
  espacos: Espaco[] = [];

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<FilterEventsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.formFilter = this.fb.group({
      data_inicial: Date(),
      espacos: new FormArray([])
    });
    this.espacosField = this.formFilter.get('espacos') as FormArray;

    this.espacos = data.espacos;
    this.formFilter.patchValue({
      data_inicial: moment(data.formValue.data_inicial).toDate(),
      espacos: []
    });
    this.espacos.forEach(espaco =>
      this.espacosField.push(
        new FormControl(data.formValue.espacos.indexOf(espaco.calendarId) > -1)
      )
    );
  }

  onFilter() {
    this.dialogRef.close({
      ...this.formFilter.value,
      espacos: this.formFilter.value.espacos
        .reduce(
          (prev, curr, index) => [
            ...prev,
            curr ? this.espacos[index].calendarId : false
          ],
          []
        )
        .filter((filter: boolean | string) => filter)
    });
  }
}
