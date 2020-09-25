import {Component , OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';

import {BookData} from './types';
import {START_BOOKS_DATA} from './consts';
import {getUniqueId} from './helpers/getUniqueId';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})

export class ListComponent implements OnInit {
  booksList: BookData[] = localStorage.bookList ?
    JSON.parse(localStorage.bookList) : START_BOOKS_DATA;
  displayedColumns: string[] = ['title', 'author', 'country', 'action'];

  buttonSubmitValue = 'Add book';

  inputTitle = '';
  inputAuthor = '';
  inputCountry = '';

  bookId = '';

  removeBook = (bookId: string) => {
    const indexBook = this.booksList.findIndex(book => book.id === bookId);
    this.booksList.splice(indexBook, 1);
    localStorage.bookList = JSON.stringify(this.booksList);
    this.booksList = JSON.parse(localStorage.bookList);
  }

  addBook = (form: NgForm) => {
    const newBook = Object.assign({ id: getUniqueId() }, form.value);
    if (this.inputTitle && this.inputAuthor && this.inputCountry) {
      this.booksList = [...this.booksList , newBook];
    }
    localStorage.bookList = JSON.stringify(this.booksList);
    form.reset();
  }

  findBookForEdit = (bookId: string) => {
    this.bookId = bookId;
    this.buttonSubmitValue = 'Edit book';
    const indexBook = this.booksList.findIndex(book => book.id === bookId);
    this.inputTitle = this.booksList[indexBook].title;
    this.inputAuthor = this.booksList[indexBook].author;
    this.inputCountry = this.booksList[indexBook].country;
  }

  editBook = (form: NgForm) => {
    const indexBook = this.booksList.findIndex(book => book.id === this.bookId);
    const newBook = Object.assign({ id: this.booksList[indexBook].id }, form.value);
    if (this.inputTitle && this.inputAuthor && this.inputCountry) {
      const newBookList = this.booksList.slice();
      newBookList[indexBook] = newBook;
      localStorage.bookList = JSON.stringify(newBookList);
      this.booksList = newBookList;
      this.buttonSubmitValue = 'Add book';
    }
    form.reset();
  }

  ngOnInit(): void {
    console.log(JSON.parse(localStorage.bookList));
    localStorage.bookList = JSON.stringify(this.booksList);
  }
}
