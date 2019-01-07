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
        this.currentTimeFilter.clear();
        this.currentDietaryFilter.clear();
    }

    removeAllIngredients() {
        this.ingredientList = [];
    }

    displayResults() {

        const ing = ('\xa0\xa0\xa0Showing results for: \xa0').bold();
        const filter = ('\xa0\xa0\xa0Filters applied: \xa0').bold();
        // let ingList = ing + resultIngredients.join(', ');
        // let filterList = filter + resultFilter.join(', ');
        // createFinalResultFilter();
        // document.getElementById('bannerIngredients').innerHTML = ingList;
        // document.getElementById('bannerFilters').innerHTML = filterList;
        // document.getElementById('sortByList').selectedIndex = '0';
        document.getElementById('finalRecipes').innerHTML = ''; // Clears recipes from last generation
        const horz = document.createElement('HR');
        horz.style.width = '97%';
        horz.style.color = '#D0D0D0';
        document.getElementById('finalRecipes').appendChild(horz);

        const container = document.getElementById('finalRecipes');
        let div, table, row, left, a, pic, right;
        let row1, linkText, p, row2, italicize, row2P, bold, boldText, row2Data, row3;

        for (let i = 0; i < 10; i++) {
            // White rectangle
            div = document.createElement('div');
            div.style.background = 'white';
            div.style.color = 'black';
            div.style.margin = '1vw';
            div.style.width = '97%';
            div.style.overflow = 'hidden';
            div.style.border = '2px solid #b3cccc';

            table = document.createElement('table');
            table.style.background = 'white';
            table.style.height = '18vh';
            table.style.tableLayout = 'fixed';
            table.style.width = '100%';
            table.style.borderCollapse = 'collapse';
            table.style.margin = '0px 1vh 0px 0px';
            row = document.createElement('TR');

            // Left food image
            left = document.createElement('TD');
            left.style.width = '20%';
            a = document.createElement('a');
            a.setAttribute('href', 'https://coderanch.com/t/120597/languages/javascript-open-window');
            a.setAttribute('target', '_blank');
            pic = document.createElement('img');
            pic.setAttribute('src', 'https://lh3.googleusercontent.com/VT-PqxMMsA2wPy7kzmuKGDIzaA3AGuXKExqnfOfwTEy5AvLIMTranbfNGheRr457RD4=s180');
            pic.style.objectFit = 'cover';
            pic.style.margin = '1vh';
            pic.style.height = '16vh';
            pic.style.width = '16vh';
            pic.style.maxWidth = '100%';
            pic.style.maxHeight = '100%';
            left.style.textAlign = 'center';
            a.append(pic);
            left.append(a);

            // Right pane
            right = document.createElement('TD');
            right.style.width = '80%';

            row1 = document.createElement('div');
            row1.style.marginTop = '-3vh';
            row1.style.fontWeight = 'bold';
            row1.style.fontSize = '3vh';
            row1.style.height = '4vh';
            row1.style.borderLeft = '5px dotted orange';
            row1.style.paddingLeft = '5px';
            linkText = document.createTextNode('Recipe Ncipe ipe Ncipe Namee Recipe Ncippe Name');
            a = document.createElement('a');
            a.setAttribute('href', 'https://coderanch.com/t/120597/languages/javascript-open-window');
            a.setAttribute('target', '_blank');
            a.appendChild(linkText);
            a.title = 'Recipe Name';
            a.style.textDecoration = 'none';
            a.style.color = 'black';
            p = document.createElement('p');
            pic = document.createElement('img');
            pic.setAttribute('src', 'https://image.freepik.com/free-icon/information-circular-button-ios-7-interface-symbol_318-36183.jpg');
            pic.setAttribute('title', 'INSERT RECIPE URL');
            pic.style.cursor = 'help';
            pic.style.marginLeft = '1vh';
            pic.style.height = '2vh';
            pic.style.width = '2vh';
            p.style.height = '4vh';
            p.append(a);
            p.append(pic);
            row1.append(p);
            p.style.textOverflow = 'ellipsis';
            p.style.overflow = 'hidden';

            row2 = document.createElement('div');
            row2.style.marginTop = '1vh';
            row2.style.height = '5vh';
            italicize = document.createElement('I');
            row2P = document.createElement('span');
            row2P.style.display = 'block';
            row2P.style.height = '2vh';
            bold = document.createElement('strong');
            boldText = document.createTextNode('INGREDIENTS: ');
            row2Data = document.createTextNode('HElHEll oHElloHEll oHElloHElloHEl loHElloHEl loHElloH ElloHElHE lloHElloHEllo HElloH ElloH ElloHElloH  loHElloH ElloHElHE lloHElloHEllo HElloH ElloH ElloHElloH  loHElloHEl loHElloH ElloHElHE lloHElloHEllo  loHElloHEl loHElloH ElloHElHE lloHElloHEllo  loHElloHEl loHElloH ElloHElHE lloHElloHEllo  loHElloHEl loHElloH ElloHElHE lloHElloHEllo  loHElloHEl loHElloH ElloHElHE lloHElloHEllo  loHElloHEl loHElloH ElloHElHE lloHElloHEllo ');
            row2P.style.marginRight = '10px';
            row2P.style.verticalAlign = 'middle';
            row2P.style.color = 'grey';
            row2.style.textOverflow = 'ellipsis';
            row2.style.overflow = 'hidden';
            row2.style.fontSize = '2vh';
            bold.append(boldText);
            row2P.append(row2Data);
            italicize.append(row2P);
            row2.append(bold);
            row2.append(italicize);

            row3 = document.createElement('div');
            row3.style.marginTop = '1vh';
            row3.style.width = '100%';
            row3.style.height = '3vh';
            row3.style.display = 'flex';

            let row3A;
            row3A = document.createElement('div');
            bold = document.createElement('strong');
            boldText = document.createTextNode('COOKING TIME: ');
            let row3AData;
            row3AData = document.createTextNode('min');
            row3A.style.padding = '0vh 10vh 0px 0px';
            row3A.style.height = '3vh';
            row3A.style.width = '50%';
            bold.append(boldText);
            row3A.append(bold);
            row3A.append(row3AData);
            row3A.style.fontSize = '2vh';
            row3A.style.textOverflow = 'ellipsis';
            row3A.style.overflow = 'hidden';

            let row3B;
            row3B = document.createElement('div');
            bold = document.createElement('strong');
            boldText = document.createTextNode('RATING: ');
            let row3BData;
            row3BData = document.createTextNode('3.5');
            row3B.style.height = '3vh';
            row3B.style.padding = '0vh 10vh 0px 10px';
            row3B.style.width = '50%';
            bold.append(boldText);
            row3B.append(bold);
            row3B.append(row3BData);
            row3B.style.fontSize = '2vh';
            row3B.style.textOverflow = 'ellipsis';
            row3B.style.overflow = 'hidden';
            row3.append(row3A);
            row3.append(row3B);

            right.append(row1);
            right.append(row2);
            right.append(row3);
            row.appendChild(left);
            row.appendChild(right);
            table.appendChild(row);
            div.appendChild(table);
            container.appendChild(div);
        }
    }

    // Displays a button to allow user to scroll up
    showTopButton() {
        if (document.getElementById('rightID').scrollTop > 20 || document.documentElement.scrollTop > 20) {
            document.getElementById('upButton').style.display = 'block';
        } else {
            document.getElementById('upButton').style.display = 'none';
        }
    }

    // Scrolls to top of right scroll pane
    scrollToTop() {
        document.getElementById('rightID').scrollTop = 0;
    }
}

