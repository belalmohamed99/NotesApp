import { Component, Inject, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NoteService } from './../../core/services/note/note.service';
import { NoteData } from '../../core/interfaces/note-data';

@Component({
  selector: 'app-dialog',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.css',
})
export class DialogComponent {
  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: NoteData
  ) {}
  private _NoteService = inject(NoteService);

  noteForm!: FormGroup;

  ngOnInit(): void {
    this.noteForm = new FormGroup({
      title: new FormControl(this.data.title ? this.data.title : ''),
      content: new FormControl(this.data.content ? this.data.content : ''),
    });
  }
  noteSubmit(form: FormGroup): void {
    if (!this.data.title && !this.data.content) {
      this.addNote(form.value);
    } else {
      this.updateNote(form.value);
    }
  }
  addNote(newNote: NoteData) {
    this._NoteService.handleAddNotes(newNote).subscribe({
      next: (res) => {
        console.log(res);
        this.dialogRef.close();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  updateNote(updateNote: NoteData): void {
    this._NoteService.handleUpdateNote(updateNote, this.data._id).subscribe({
      next: (res) => {
        this.dialogRef.close();
      },
      error: () => {},
    });
  }
}
