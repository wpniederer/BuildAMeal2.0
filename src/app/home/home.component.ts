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
    dietaryMap = new Map([['lacto', '1'], ['ovo', '1'], ['pesc', '1'], ['vegan', '1'], ['latco-ovo', '1']]);
    timeMap = new Map([['30mins', '1'], ['1hr', '1'], ['1.5hr', '1'], ['2hr', '1']]);
    currentDietaryFilter = new Map();
    currentTimeFilter = new Map();

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

        if (!this.filtersMap.has(value) && !this.hasDietaryFilter(value) && !this.hasTimeFilter(value)) {
            this.addToFiltersBox(value);
        } else {
            alert('Cannot add more than one filter');
        }


        // an array with all the restricted
    }

    hasDietaryFilter(dietaryFilter) {
        if (this.dietaryMap.has(dietaryFilter)) {
            // console.log('dMap has value ' + dietaryFilter);
            if (this.currentDietaryFilter.size === 0) {
                // console.log('value set');
                this.currentDietaryFilter.set(dietaryFilter, 1);
                return false;
            } else {
                // console.log('dietary error');
                return true;
            }
        }
    }

    hasTimeFilter(timeFilter) {
        if (this.timeMap.has(timeFilter)) {
            // console.log('dMap has value ' + dietaryFilter);
            if (this.currentTimeFilter.size === 0) {
                // console.log('value set');
                this.currentTimeFilter.set(timeFilter, 1);
                return false;
            } else {
                // console.log('dietary error');
                return true;
            }
        }
    }

    getKeys(map) {
        return Array.from(map.keys());
    }
}

