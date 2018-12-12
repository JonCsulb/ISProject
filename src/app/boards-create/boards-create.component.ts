import { Component, OnInit, APP_BOOTSTRAP_LISTENER } from '@angular/core'

import { Router } from '@angular/router'
import { Board, FirestoreService } from '../firestore.service'
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms'
import { componentFactoryName } from '@angular/compiler';
import { HttpClientModule, HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-boards-create',
  templateUrl: './boards-create.component.html',
  styleUrls: ['./boards-create.component.css'],
})

export class BoardsCreateComponent implements OnInit {
  boardsForm: FormGroup
  Name = ''
  Email = ''
  Phone = ''

  constructor(
    private router: Router,
    private fs: FirestoreService,
    private formBuilder: FormBuilder,
  ) {}

  ngOnInit() {
    this.boardsForm = this.formBuilder.group(
      {
      Name: [null, Validators.required],
      Email: [null, [Validators.required, Validators.email]],
      Phone: [null, [Validators.required, Validators.maxLength(10), Validators.minLength(10)], Validators.pattern('/^\d*$/')] /** Need to figure out how to do form validators for numbers */
      }
      )
  }

  onFormSubmit() {
    const board = this.boardsForm.value
    console.log(board)
    this.fs.postBoard(board).subscribe(
      id => {
        this.router.navigate(['/boards-details', id])
      },
      err => {
        console.log(err)
      },
    )
  }
  
}




/**
 * What is a constructor
the relation ship between app module, app html, app component
what is ngmodule for, declarations, imports, providers, booststrap,
HttpClientModule (import http client module in app module,
                   import into ngmodule 
                   import http client to app component toString
                   constructor private httpclient :HttpClient
                   )
  */
