import { NgStyle } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { SideNavComponent } from '../../components/side-nav/side-nav.component';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../../components/dialog/dialog.component';
import { NoteService } from '../../core/services/note/note.service';
import { NoteData } from '../../core/interfaces/note-data';
import Swal from 'sweetalert2';
import { SearchPipe } from '../../core/pipes/search.pipe';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-notes',
  standalone: true,
  imports: [NgStyle, SideNavComponent, SearchPipe, FormsModule],
  templateUrl: './notes.component.html',
  styleUrl: './notes.component.css',
})
export class NotesComponent implements OnInit {
  constructor(public dialog: MatDialog, private _NoteService: NoteService) {}
  searchInput: string = '';
  allNotes: NoteData[] = [];
  openDialog(noteData?: NoteData): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      height: '350px',
      width: '550px',
      data: {
        title: noteData?.title,
        content: noteData?.content,
        _id: noteData?._id,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      this.ngOnInit();
    });
  }
  ngOnInit(): void {
    this._NoteService.getUserNotes().subscribe({
      next: (res) => {
        console.log(res);
        this.allNotes = res.notes;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  deleteNote(deleteNote: string, noteIndex: number) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: 'Deleted!',
          text: 'Your file has been deleted.',
          icon: 'success',
        }).then(() => {
          this._NoteService.handleDeleteNotes(deleteNote).subscribe({
            next: () => {
              this.allNotes.splice(noteIndex, 1);
              this.ngOnInit();
            },
            error: (err) => {
              console.log(err);
            },
          });
        });
      }
    });
  }
  updateData(noteData: NoteData, noteIndex: number) {
    this.openDialog({
      title: noteData.title,
      content: noteData.content,
      _id: noteData._id,
    });
  }
}
