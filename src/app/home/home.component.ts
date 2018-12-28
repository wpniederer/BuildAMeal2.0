import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
    private ingredientList = [];
    private myInput: '';

  constructor() { }


  ngOnInit() {
  }

    addToCheckBox(input: string) {
        // if (!/^[a-zA-Z\s-]*$/.test(input) || input === '') {
        //
        // }
        console.log('Ingredient: ' + input);
    }

    processSearchInput(ingredient: string) {
    }
}

