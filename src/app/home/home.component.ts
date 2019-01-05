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
    filtersMap = new Map();

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

    // TODO: Change filters list to map where key is id and value is the actual filter for the yummlyAPI
    addToFiltersBox(filter) {
        // console.log('Ingredient: ' + ingredient);
        this.filtersMap.set(filter, 1);
    }

    removeIngredient(ingredient) {
        const index = this.ingredientList.indexOf(ingredient);
        this.ingredientList.splice(index, 1);
    }

    removeFilter(filter) {
        // const index = this.filtersMap.indexOf(filter);
        // this.filtersMap.splice(index, 1);

        this.filtersMap.delete(filter);
    }

    addIngredientToggle(event) {
        const target = event.target || event.srcElement || event.currentTarget;
        const idAttr = target.attributes.id;
        const value = idAttr.nodeValue;

        this.addToCheckBox(value);
    }

    addFilterToggle(event) {
        const target = event.target || event.srcElement || event.currentTarget;
        const idAttr = target.attributes.id;
        const value = idAttr.nodeValue;

        if (!this.filtersMap.has(value)) {
            this.addToFiltersBox(value);
        } else {
            alert('Cannot add more than one filter');
        }
    }

    getKeys(map) {
        return Array.from(map.keys());
    }
}

