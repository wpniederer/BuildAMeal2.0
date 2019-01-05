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
    dietaryMap = new Map([['lacto', '1'], ['ovo', '1'], ['pesc', '1'], ['vegan', '1'], ['lacto-ovo', '1']]);
    timeMap = new Map([['30mins', '1'], ['1hr', '1'], ['1.5hr', '1'], ['2hr', '1']]);
    currentDietaryFilter = new Map();
    currentTimeFilter = new Map();
    hasBeenTouchedDiet = false;
    hasBeenTouchedTime = false;

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
        if (this.hasBeenTouchedDiet && this.currentDietaryFilter.has(filter)) {
            // console.log('hasBeenTouchedDiet');

            // console.log('before delete diet filter');
            // this.printKeys(this.currentDietaryFilter);

            this.currentDietaryFilter.delete(filter);

            // console.log('after delete diet filter');
            // this.printKeys(this.currentDietaryFilter);
            this.hasBeenTouchedDiet = false;
        }

        if (this.hasBeenTouchedTime && this.currentTimeFilter.has(filter)) {
            // console.log('hasBeenTouchedTime');

            // console.log('before delete time filter');
            // this.printKeys(this.currentTimeFilter);

            this.currentTimeFilter.delete(filter);

            // console.log('after delete time filter');
            // this.printKeys(this.currentTimeFilter);

            this.hasBeenTouchedTime = false;
        }
        // console.log('before delete filters: ');
        // this.printKeys(this.filtersMap);
        this.filtersMap.delete(filter);
        // console.log('after delete filters: ');
        // this.printKeys(this.filtersMap);
        // console.log('deleted: ' + filter);
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
                // console.log('value set ' + dietaryFilter);
                this.currentDietaryFilter.set(dietaryFilter, 1);
                this.hasBeenTouchedDiet = true;
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
                this.hasBeenTouchedTime = true;
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

    printKeys(map) {
        const printArray = this.getKeys(map);
        for (let i = 0; i < printArray.length; i++) {
            console.log(printArray[i]);
        }
    }

    removeAllFilters() {
        this.filtersMap.clear();
    }

    removeAllIngredients() {
        this.ingredientList = [];
    }
}

