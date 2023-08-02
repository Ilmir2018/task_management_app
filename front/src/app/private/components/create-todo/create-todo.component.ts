import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  Complexity,
  CreateTodoFormGroup,
  Status,
} from '../../private-module.iterfaces';
import { complexityValues, statusValues } from '../../private-module.constants';

@Component({
  selector: 'app-create-todo',
  templateUrl: './create-todo.component.html',
  styleUrls: ['./create-todo.component.scss'],
})
export class CreateTodoComponent {
  complexityValues: Complexity[] = complexityValues;
  statusValues: Status[] = statusValues;

  form: FormGroup<CreateTodoFormGroup> = new FormGroup<CreateTodoFormGroup>({
    title: new FormControl('', [Validators.required]),
    subTitle: new FormControl('', [Validators.required]),
    text: new FormControl('', [Validators.required]),
    status: new FormControl('BACKLOG', [Validators.required]),
    complexity: new FormControl('MEDIUM', [Validators.required]),
  });

  get title(): FormControl {
    return this.form.get('title') as FormControl;
  }

  get subTitle(): FormControl {
    return this.form.get('subTitle') as FormControl;
  }

  get text(): FormControl {
    return this.form.get('text') as FormControl;
  }

  createTodoItem() {
    console.log(this.form.value);
  }
}
