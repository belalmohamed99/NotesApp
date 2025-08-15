import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { NoteData } from '../../interfaces/note-data';

@Injectable({
  providedIn: 'root',
})
export class NoteService {
  constructor(private _HttpClient: HttpClient) {}
  handleAddNotes(newNote: NoteData): Observable<any> {
    return this._HttpClient.post(`${environment.notesURL} `, newNote, {
      headers: {
        token: localStorage.getItem('token') || '',
      },
    });
  }
  getUserNotes(): Observable<any> {
    return this._HttpClient.get(`${environment.notesURL} `, {
      headers: {
        token: localStorage.getItem('token') || '',
      },
    });
  }
  handleDeleteNotes(noteId: string): Observable<any> {
    return this._HttpClient.delete(`${environment.notesURL + noteId}`, {
      headers: {
        token: localStorage.getItem('token') || '',
      },
    });
  }
  handleUpdateNote(noteData: NoteData, noteId: string): Observable<any> {
    return this._HttpClient.put(`${environment.notesURL + noteId}`, noteData, {
      headers: {
        token: localStorage.getItem('token') || '',
      },
    });
  }
}
