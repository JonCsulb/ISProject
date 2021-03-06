import { Injectable } from '@angular/core'

import { Observable, from } from 'rxjs'
import { map } from 'rxjs/operators'

import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore'

export interface Board {
  id?: string
  Name: string
  Email: string
  Phone: string
}

@Injectable({
  providedIn: 'root',
})
export class FirestoreService {
  private boardCollection: AngularFirestoreCollection<Board>

  constructor(private afs: AngularFirestore) {
    this.boardCollection = afs.collection<Board>('Contact')
  }

  getBoards(): Observable<Board[]> {
    return this.boardCollection.snapshotChanges().pipe(
      map(actions =>
        actions.map(a => {
          const data = a.payload.doc.data()
          const id = a.payload.doc.id
          return { id, ...data }
        }),
      ),
    )
  }

  getBoard(id: string): Observable<any> {
    return this.boardCollection.doc(id).valueChanges()
  }

  postBoard(board: Board) {
    return from(this.boardCollection.add(board).then(data => data.id))
  }

  updateBoards(id: string, board: Board) {
    const doc = this.boardCollection.doc(id)
    return from(doc.update(board))
  }

  deleteBoards(id: string) {
    const doc = this.boardCollection.doc(id)
    return from(doc.delete())
  }
}
