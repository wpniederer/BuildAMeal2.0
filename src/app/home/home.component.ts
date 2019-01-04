import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {
    ingredient = '';
    ingredientList = [];

    ingredientForm: FormGroup;

    ngOnInit(): void {
        this.ingredientForm = new FormGroup({
            'ingredientName': new FormControl(this.ingredient, [
                Validators.required,
                Validators.minLength(3),
                Validators.pattern(/^[^-\s][a-zA-Z\s-]*$/)
            ]),
        });
    }

    get ingredientName() { return this.ingredientForm.get('ingredientName'); }

    constructor() { }



    addToCheckBox(ingredient) {
        // console.log('Ingredient: ' + ingredient);
        this.ingredientList.push(ingredient);
    }

    removeIngredient(ingredient) {
        const index = this.ingredientList.indexOf(ingredient);
        this.ingredientList.splice(index, 1);
    }
}

