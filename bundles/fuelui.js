var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var angular2_1 = require('angular2/angular2');
var Alert = (function () {
    function Alert(el) {
        this.displayed = false;
        this.closeButton = true;
        this.type = 'success';
        this.alertDisplayedChange = new angular2_1.EventEmitter();
        this._el = el.nativeElement;
    }
    Alert.prototype.getElement = function () {
        return this._el;
    };
    Alert.prototype.close = function () {
        this.displayed = false;
        this.alertDisplayedChange.next(null);
    };
    __decorate([
        angular2_1.Input(), 
        __metadata('design:type', Boolean)
    ], Alert.prototype, "displayed");
    __decorate([
        angular2_1.Input(), 
        __metadata('design:type', Boolean)
    ], Alert.prototype, "closeButton");
    __decorate([
        angular2_1.Input(), 
        __metadata('design:type', String)
    ], Alert.prototype, "type");
    __decorate([
        angular2_1.Output(), 
        __metadata('design:type', angular2_1.EventEmitter)
    ], Alert.prototype, "alertDisplayedChange");
    Alert = __decorate([
        angular2_1.Component({
            selector: 'alert'
        }),
        angular2_1.View({
            styles: ["\n      .alertFadeIn {\n        -webkit-animation-name: fadeIn;\n        -moz-animation-name: fadeIn;\n        animation-name: fadeIn;\n        -webkit-animation-duration: 1s;\n        -moz-animation-duration: 1s;\n        animation-duration: 1s;\n        -webkit-animation-timing-function: ease;\n        -moz-animation-timing-function: ease;\n        animation-timing-function: ease; }\n    "],
            template: "\n      <div\n          *ng-if=\"displayed\"\n          role=\"alert\"\n          class=\"alert alertFadeIn\"\n          [ng-class]=\"{'alert-success': type === 'success', 'alert-info': type === 'info', 'alert-warning': type === 'warning', 'alert-danger': type === 'danger' }\" >\n          <button *ng-if=\"closeButton\" (click)=\"close()\" type=\"button\" class=\"close\" aria-label=\"Close\">\n              <span aria-hidden=\"true\">&times;</span>\n              <span class=\"sr-only\">Close</span>\n          </button>\n          <ng-content></ng-content>\n      </div>\n    ",
            directives: [angular2_1.CORE_DIRECTIVES]
        }), 
        __metadata('design:paramtypes', [angular2_1.ElementRef])
    ], Alert);
    return Alert;
})();
exports.Alert = Alert;
exports.ALERT_PROVIDERS = [
    Alert
];

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var angular2_1 = require('angular2/angular2');
var angular2_2 = require('angular2/angular2');
var CarouselItem = (function () {
    function CarouselItem() {
        this.resetStatus();
    }
    CarouselItem.prototype.resetStatus = function () {
        this.isActive = false;
        this.exiting = false;
        this.resetAnimation();
    };
    CarouselItem.prototype.resetAnimation = function () {
        //this.outLeft = this.inLeft = this.outRight = this.inRight = false;
        this.left = this.right = this.next = this.prev = false;
    };
    CarouselItem.prototype.animationStart = function () {
    };
    CarouselItem.prototype.animationEnd = function () {
        if (this.exiting)
            this.resetStatus();
        else
            this.resetAnimation();
    };
    CarouselItem.prototype.moveLeft = function () {
        if (this.isActive) {
            this.exiting = true;
            this.left = true;
        }
        else {
            this.isActive = true;
            this.prev = true;
        }
    };
    CarouselItem.prototype.moveRight = function () {
        if (this.isActive) {
            this.exiting = true;
            this.right = true;
        }
        else {
            this.isActive = true;
            this.next = true;
        }
    };
    CarouselItem.prototype.checkIfAnimating = function () {
        return this.left || this.right || this.next || this.prev;
    };
    CarouselItem = __decorate([
        angular2_1.Directive({
            selector: '.carousel-item',
            host: {
                '[class.active]': 'isActive',
                '[class.slide-out-left]': 'left',
                '[class.slide-out-right]': 'right',
                '[class.slide-in-right]': 'next',
                '[class.slide-in-left]': 'prev',
                '(animationstart)': 'animationStart()',
                '(webkitAnimationStart)': 'animationStart()',
                '(oanimationstart)': 'animationStart()',
                '(MSAnimationStart)': 'animationStart()',
                '(animationend)': 'animationEnd()',
                '(webkitAnimationEnd)': 'animationEnd()',
                '(oanimationend)': 'animationEnd()',
                '(MSAnimationEnd)': 'animationEnd()',
            },
        }), 
        __metadata('design:paramtypes', [])
    ], CarouselItem);
    return CarouselItem;
})();
exports.CarouselItem = CarouselItem;
var Carousel = (function () {
    function Carousel() {
        this.images = [];
    }
    Carousel.prototype.afterContentInit = function () {
        var _this = this;
        this.imageQuery.changes.toRx()
            .subscribe(function () { return _this.registerImages(); });
        this.registerImages();
    };
    Carousel.prototype.registerImages = function () {
        var _this = this;
        this.images = [];
        this.imageQuery.map(function (i) { return _this.images.push(i); });
        var activeImage = this.getActiveImage();
        if (this.images.length > 0 && activeImage == null)
            this.images[0].isActive = true;
    };
    Carousel.prototype.setAllInactive = function () {
        this.images.map(function (i) { return i.resetStatus(); });
    };
    Carousel.prototype.switchTo = function (image) {
        var activeImage = this.getActiveImage();
        if (this.images.indexOf(image) < this.images.indexOf(activeImage)) {
            image.moveLeft();
            activeImage.moveLeft();
        }
        else {
            image.moveRight();
            activeImage.moveRight();
        }
    };
    Carousel.prototype.nextImage = function () {
        if (this.checkIfAnimating())
            return;
        var activeImage = this.getActiveImage();
        var index = this.getActiveIndex() + 1;
        index = index >= this.images.length ? 0 : index;
        activeImage.moveLeft();
        this.images[index].moveLeft();
    };
    Carousel.prototype.prevImage = function () {
        if (this.checkIfAnimating())
            return;
        var activeImage = this.getActiveImage();
        var index = this.getActiveIndex() - 1;
        index = index < 0 ? this.images.length - 1 : index;
        activeImage.moveRight();
        this.images[index].moveRight();
    };
    Carousel.prototype.checkIfAnimating = function () {
        return this.images.reduce(function (prev, curr) { return curr.checkIfAnimating() || prev; }, false);
    };
    Carousel.prototype.getActiveIndex = function () {
        var activeImage = this.getActiveImage();
        if (activeImage == null)
            return -1;
        return this.images.indexOf(activeImage);
    };
    Carousel.prototype.getActiveImage = function () {
        return this.images.reduce(function (prev, curr) { return curr.isActive ? curr : prev; }, null);
    };
    __decorate([
        angular2_2.ContentChildren(CarouselItem), 
        __metadata('design:type', angular2_2.QueryList)
    ], Carousel.prototype, "imageQuery");
    Carousel = __decorate([
        angular2_1.Component({
            selector: 'carousel'
        }),
        angular2_1.View({
            styles: ["\n   .carousel-item {\n     width: 100%; }\n\n   .carousel-item.slide-in-left {\n     display: block;\n     position: absolute;\n     top: 0;\n     left: -100%;\n     -webkit-animation-name: slideInLeft;\n     -moz-animation-name: slideInLeft;\n     animation-name: slideInLeft;\n     -webkit-animation-duration: 0.5s;\n     -moz-animation-duration: 0.5s;\n     animation-duration: 0.5s;\n     -webkit-animation-timing-function: ease;\n     -moz-animation-timing-function: ease;\n     animation-timing-function: ease; }\n\n   .carousel-item.slide-in-right {\n     display: block;\n     position: absolute;\n     top: 0;\n     left: 100%;\n     -webkit-animation-name: slideInRight;\n     -moz-animation-name: slideInRight;\n     animation-name: slideInRight;\n     -webkit-animation-duration: 0.5s;\n     -moz-animation-duration: 0.5s;\n     animation-duration: 0.5s;\n     -webkit-animation-timing-function: ease;\n     -moz-animation-timing-function: ease;\n     animation-timing-function: ease; }\n\n   .carousel-item.slide-out-left {\n     -webkit-animation-name: slideOutLeft;\n     -moz-animation-name: slideOutLeft;\n     animation-name: slideOutLeft;\n     -webkit-animation-duration: 0.5s;\n     -moz-animation-duration: 0.5s;\n     animation-duration: 0.5s;\n     -webkit-animation-timing-function: ease;\n     -moz-animation-timing-function: ease;\n     animation-timing-function: ease; }\n\n   .carousel-item.slide-out-right {\n     -webkit-animation-name: slideOutRight;\n     -moz-animation-name: slideOutRight;\n     animation-name: slideOutRight;\n     -webkit-animation-duration: 0.5s;\n     -moz-animation-duration: 0.5s;\n     animation-duration: 0.5s;\n     -webkit-animation-timing-function: ease;\n     -moz-animation-timing-function: ease;\n     animation-timing-function: ease; }\n\t"],
            template: "\n   <div class=\"carousel slide\">\n     <ol class=\"carousel-indicators\">\n       <li *ng-for=\"#image of images\"\n         (click)=\"switchTo(image)\" [class.active]=\"image.isActive && !image.checkIfAnimating()\"></li> \n     </ol>\n     <div class=\"carousel-inner\" role=\"listbox\">\n         <ng-content></ng-content>\n     </div>\n     <a class=\"left carousel-control\" role=\"button\" (click)=\"prevImage()\">\n       <span class=\"icon-prev\" aria-hidden=\"true\"></span>\n       <span class=\"sr-only\">Previous</span>\n     </a>\n     <a class=\"right carousel-control\" role=\"button\" (click)=\"nextImage()\">\n       <span class=\"icon-next\" aria-hidden=\"true\"></span>\n       <span class=\"sr-only\">Next</span>\n     </a>\n   </div>\n\t",
            directives: [angular2_1.CORE_DIRECTIVES, CarouselItem],
            encapsulation: angular2_1.ViewEncapsulation.None
        }), 
        __metadata('design:paramtypes', [])
    ], Carousel);
    return Carousel;
})();
exports.Carousel = Carousel;
exports.CAROUSEL_PROVIDERS = [
    Carousel, CarouselItem
];

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var angular2_1 = require('angular2/angular2');
var angular2_2 = require('angular2/angular2');
//import {AnimationListener} from '../../directives/AnimationListener/AnimationListener';
var DatePickerCalendar = (function () {
    function DatePickerCalendar() {
        this.selectedDateChange = new angular2_2.EventEmitter();
    }
    DatePickerCalendar.prototype.onInit = function () {
        this.buildWeeks(this.currentMonth || new Date());
    };
    DatePickerCalendar.prototype.checkSelectable = function (date) {
        var dateNumber = parseInt(date);
        if (isNaN(dateNumber))
            return false;
        var compareDate = new Date(this.currentMonth.getFullYear(), this.currentMonth.getMonth(), dateNumber);
        return compareDate >= this.minDate && compareDate <= this.maxDate;
    };
    DatePickerCalendar.prototype.checkSelectedDate = function (date) {
        if (typeof this.selectedDate == undefined || this.selectedDate == null)
            return false;
        return this.selectedDate.getFullYear() == this.currentMonth.getFullYear()
            && this.selectedDate.getMonth() == this.currentMonth.getMonth()
            && this.selectedDate.getDate().toString() == date;
    };
    DatePickerCalendar.prototype.selectDate = function (date) {
        if (!this.checkSelectable(date))
            return;
        var dateNumber = parseInt(date);
        this.selectedDate = new Date(this.currentMonth.getFullYear(), this.currentMonth.getMonth(), dateNumber);
        this.selectedDateChange.next(this.selectedDate);
    };
    DatePickerCalendar.prototype.buildWeeks = function (date) {
        this.currentMonth = date;
        var currentDay = new Date(this.currentMonth.toDateString());
        currentDay.setDate(1);
        currentDay.setDate(currentDay.getDate() - currentDay.getDay());
        var lastDay = new Date(this.currentMonth.getFullYear(), this.currentMonth.getMonth() + 1, 0);
        lastDay.setDate(lastDay.getDate() + (6 - lastDay.getDay()));
        this.weeks = [];
        var currentWeek = [];
        while (currentDay <= lastDay) {
            if (currentDay.getMonth() == this.currentMonth.getMonth())
                currentWeek.push(currentDay.getDate().toLocaleString());
            else
                currentWeek.push("");
            currentDay.setDate(currentDay.getDate() + 1);
            if (currentDay.getDay() == 0) {
                this.weeks.push(currentWeek);
                currentWeek = [];
            }
        }
        if (this.weeks.length > 5)
            return;
        var emptyWeek = ['', '', '', '', '', '', ''];
        var firstWeekCount = this.weeks[0]
            .filter(function (i) { return i.length > 0; }).length;
        var lastWeekCount = this.weeks[this.weeks.length - 1]
            .filter(function (i) { return i.length > 0; }).length;
        if (firstWeekCount > lastWeekCount)
            this.weeks.unshift(emptyWeek);
        else
            this.weeks.push(emptyWeek);
        if (this.weeks.length < 6)
            this.weeks.unshift(emptyWeek);
    };
    __decorate([
        angular2_2.Input(), 
        __metadata('design:type', Date)
    ], DatePickerCalendar.prototype, "currentMonth");
    __decorate([
        angular2_2.Input(), 
        __metadata('design:type', Date)
    ], DatePickerCalendar.prototype, "selectedDate");
    __decorate([
        angular2_2.Output(), 
        __metadata('design:type', Object)
    ], DatePickerCalendar.prototype, "selectedDateChange");
    __decorate([
        angular2_2.Input(), 
        __metadata('design:type', Date)
    ], DatePickerCalendar.prototype, "minDate");
    __decorate([
        angular2_2.Input(), 
        __metadata('design:type', Date)
    ], DatePickerCalendar.prototype, "maxDate");
    DatePickerCalendar = __decorate([
        angular2_1.Component({
            selector: 'date-picker-calendar'
        }),
        angular2_1.View({
            styles: ["\n   .slide-in-right {\n     -webkit-animation: slideInRight 0.5s ease;\n     -moz-animation: slideInRight 0.5s ease;\n     animation: slideInRight 0.5s ease; }\n\n   .slide-in-left {\n     -webkit-animation: slideInLeft 0.5s ease;\n     -moz-animation: slideInLeft 0.5s ease;\n     animation: slideInLeft 0.5s ease; }\n\n   .slide-in-right {\n     -webkit-animation: slideInRight 0.5s ease;\n     -moz-animation: slideInRight 0.5s ease;\n     animation: slideInRight 0.5s ease; }\n\n   .slide-in-right {\n     -webkit-animation: slideInRight 0.5s ease;\n     -moz-animation: slideInRight 0.5s ease;\n     animation: slideInRight 0.5s ease; }\n\n   .table {\n     font-size: .75rem;\n     border: 1px solid #eceeef; }\n\n   tr {\n     border: none; }\n\n   th, td {\n     text-align: center;\n     vertical-align: center;\n     padding: .1rem;\n     height: 1.75rem;\n     border: none; }\n\n   td.selectable {\n     cursor: pointer !important;\n     border: 1px solid #eceeef; }\n\n   td.selectable:hover {\n     background-color: #0275d8;\n     color: #fff; }\n\n   td.selected {\n     background-color: #71b1e9;\n     color: #fff; }\n\n   td.disabled {\n     background-color: #fafafb;\n     color: #818a91; }\n\t"],
            template: "\n   <div class=\"text-center py\"> \n   \t<strong>{{currentMonth | date:'MMMM yyyy'}}</strong>\n   \t<table class=\"table\">\n   \t\t<thead>\t\n   \t\t\t<tr>\n   \t\t\t\t<th>S</th>\n   \t\t\t\t<th>M</th>\n   \t\t\t\t<th>T</th>\n   \t\t\t\t<th>W</th>\n   \t\t\t\t<th>T</th>\n   \t\t\t\t<th>F</th>\n   \t\t\t\t<th>S</th>\n   \t\t\t</tr>\n   \t\t</thead>\n   \t\t<tbody>\n   \t\t\t<tr *ng-for=\"#week of weeks\">\n   \t\t\t\t<td *ng-for=\"#day of week\"\n   \t\t\t\t\t[class.selectable]=\"checkSelectable(day)\" \n   \t\t\t\t\t[class.disabled]=\"!checkSelectable(day)\"\n   \t\t\t\t\t[class.selected]=\"checkSelectedDate(day)\" \n   \t\t\t\t\t(click)=\"selectDate(day)\">\n   \t\t\t\t\t{{day}}\n   \t\t\t\t</td> \n   \t\t\t</tr>\n   \t\t</tbody>\n   \t</table>\n   </div>\n\t",
            directives: [angular2_1.CORE_DIRECTIVES, angular2_1.FORM_DIRECTIVES]
        }), 
        __metadata('design:paramtypes', [])
    ], DatePickerCalendar);
    return DatePickerCalendar;
})();
exports.DatePickerCalendar = DatePickerCalendar;

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var angular2_1 = require('angular2/angular2');
var Animation = (function () {
    function Animation(element) {
        this.onAnimationStart = new angular2_1.EventEmitter();
        this.onAnimationEnd = new angular2_1.EventEmitter();
        this.animationClasses = '';
        this.play = false;
        this.id = ''; // use for query filtering
        this.group = ''; // use for query filtering
        this._animationQueue = [];
        this._callbacks = [];
        this.element = element.nativeElement;
    }
    Animation.prototype.onChange = function () {
        this.setup();
    };
    Animation.prototype.onInit = function () {
        this.setup();
    };
    Animation.prototype.addAnimation = function (animationClasses) {
        var _this = this;
        animationClasses.split(' ')
            .map(function (c) { return _this._animationQueue.push(c); });
        this.animationClasses += " " + animationClasses;
        return this;
    };
    Animation.prototype.setup = function () {
        this._animationQueue = this.animationClasses
            .split(" ")
            .filter(function (c) { return c.length > 0; });
        if (this.play && this._animationQueue.length > 0)
            this.startAnimation();
        return this;
    };
    Animation.prototype.startAnimation = function (callback) {
        var _this = this;
        if (callback === void 0) { callback = null; }
        if (callback != null)
            this._callbacks.push(callback);
        this._animationQueue.shift()
            .split('.')
            .filter(function (c) { return c.length > 0; })
            .map(function (c) { return _this.element.classList.add(c); });
        return this;
    };
    Animation.prototype.cleanAnimation = function () {
        var _this = this;
        this.animationClasses
            .replace('.', ' ')
            .split(' ')
            .filter(function (c) { return c.length > 0; })
            .map(function (c) {
            _this.element.classList.remove(c);
        });
        return this;
    };
    Animation.prototype.animationStarted = function (event) {
        this.onAnimationStart.next(null);
    };
    Animation.prototype.animationEnded = function (event) {
        this.cleanAnimation();
        if (this._animationQueue.length > 0) {
            this.startAnimation();
            return;
        }
        while (this._callbacks.length > 0)
            this._callbacks.shift()();
        this.onAnimationEnd.next(null);
    };
    __decorate([
        angular2_1.Output(), 
        __metadata('design:type', angular2_1.EventEmitter)
    ], Animation.prototype, "onAnimationStart");
    __decorate([
        angular2_1.Output(), 
        __metadata('design:type', angular2_1.EventEmitter)
    ], Animation.prototype, "onAnimationEnd");
    __decorate([
        angular2_1.Input('animation'), 
        __metadata('design:type', String)
    ], Animation.prototype, "animationClasses");
    __decorate([
        angular2_1.Input(), 
        __metadata('design:type', Boolean)
    ], Animation.prototype, "play");
    __decorate([
        angular2_1.Input(), 
        __metadata('design:type', String)
    ], Animation.prototype, "id");
    __decorate([
        // use for query filtering
        angular2_1.Input(), 
        __metadata('design:type', String)
    ], Animation.prototype, "group");
    Animation = __decorate([
        angular2_1.Directive({
            selector: '[animation]',
            host: {
                '(animationstart)': 'animationStarted($event)',
                '(webkitAnimationStart)': 'animationStarted($event)',
                '(oanimationstart)': 'animationStarted($event)',
                '(MSAnimationStart)': 'animationStarted($event)',
                '(animationend)': 'animationEnded($event)',
                '(webkitAnimationEnd)': 'animationEnded($event)',
                '(oanimationend)': 'animationEnded($event)',
                '(MSAnimationEnd)': 'animationEnded($event)'
            }
        }), 
        __metadata('design:paramtypes', [angular2_1.ElementRef])
    ], Animation);
    return Animation;
})();
exports.Animation = Animation;

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var angular2_1 = require('angular2/angular2');
var angular2_2 = require('angular2/angular2');
var DatePickerCalendar_1 = require('./DatePickerCalendar');
var Animation_1 = require('../../Directives/Animation/Animation');
var DatePickerBase = (function () {
    function DatePickerBase(modal) {
        this._minDate = new Date(1900, 0, 1);
        this._maxDate = new Date(2200, 0, 1);
        this.months = 1;
        this.calendarMonths = [];
        this.calendarDisplayed = true;
        this.calendarX = 1;
        this.calendarY = 1;
        this.direction = "";
        this.isAnimating = false;
        this.modal = modal.nativeElement;
    }
    Object.defineProperty(DatePickerBase.prototype, "minDate", {
        get: function () { return this._minDate; },
        set: function (value) {
            this._minDate = this.handleDateInput(value);
        },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(DatePickerBase.prototype, "maxDate", {
        get: function () { return this._maxDate; },
        set: function (value) {
            this._maxDate = this.handleDateInput(value);
        },
        enumerable: true,
        configurable: true
    });
    DatePickerBase.prototype.onInit = function () {
        this.calendarMonths = [];
        for (var i = 0; i < this.months; i++)
            this.calendarMonths
                .push(new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + i));
        this.currentDate = this.currentDate;
    };
    DatePickerBase.prototype.afterViewInit = function () {
        var _this = this;
        this.modal.addEventListener('click', function (e) {
            if (e.srcElement.className.indexOf('modal') != -1)
                _this.hideCalendar();
        });
        this.calendarQuery.changes.toRx()
            .subscribe(function (calendars) { return _this.updateCalendars(calendars); });
    };
    DatePickerBase.prototype.handleDateInput = function (value) {
        if (value instanceof Date && !isNaN(value.valueOf()))
            return value;
        else
            return new Date(value);
    };
    DatePickerBase.prototype.showCalendar = function (event) {
        if (event != null) {
            var clickedRect = event.srcElement.parentElement.getBoundingClientRect();
            this.calendarX = clickedRect.left;
            if (screen.height - clickedRect.bottom <= 400) {
                this.calendarY = (clickedRect.top - 290 + clickedRect.height);
            }
            else {
                this.calendarY = (clickedRect.top + clickedRect.height);
            }
        }
        this.onInit();
        this.calendarDisplayed = true;
        this.direction = '';
    };
    DatePickerBase.prototype.hideCalendar = function () {
        this.calendarDisplayed = false;
        this.direction = '';
    };
    DatePickerBase.prototype.canPrevMonth = function () {
        var prevDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() - 1);
        var compareDate = new Date(this._minDate.getFullYear(), this._minDate.getMonth());
        return prevDate >= compareDate;
    };
    DatePickerBase.prototype.prevMonth = function () {
        if (!this.canPrevMonth() || this.isAnimating)
            return;
        var firstMonth = this.calendarMonths[0];
        this.calendarMonths.unshift(new Date(firstMonth.getFullYear(), firstMonth.getMonth() - 1));
        this.direction = 'right';
    };
    DatePickerBase.prototype.canNextMonth = function () {
        var nextDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + 1);
        var compareDate = new Date(this._maxDate.getFullYear(), this._maxDate.getMonth() - 1);
        return nextDate <= compareDate;
    };
    DatePickerBase.prototype.nextMonth = function () {
        if (!this.canNextMonth() || this.isAnimating)
            return;
        var lastMonth = this.calendarMonths[this.calendarMonths.length - 1];
        this.calendarMonths.push(new Date(lastMonth.getFullYear(), lastMonth.getMonth() + 1));
        this.direction = 'left';
    };
    DatePickerBase.prototype.updateCalendars = function (calendars) {
        var _this = this;
        if (this.direction.length == 0 || this.isAnimating)
            return;
        this.isAnimating = true;
        var direction = this.direction;
        var cleanAction;
        if (direction == 'right') {
            calendars.first
                .addAnimation(direction + '.enter')
                .startAnimation(function () {
                _this.direction = '';
                _this.isAnimating = false;
                _this.calendarMonths.pop();
            });
            calendars.last
                .addAnimation(direction + '.leave')
                .startAnimation();
        }
        else {
            calendars.first
                .addAnimation(direction + '.leave')
                .startAnimation();
            calendars.last
                .addAnimation(direction + '.enter')
                .startAnimation(function () {
                _this.direction = '';
                _this.isAnimating = false;
                _this.calendarMonths.shift();
            });
        }
        calendars
            .filter(function (c) {
            return c !== calendars.first && c !== calendars.last;
        })
            .map(function (c) {
            c.addAnimation(direction + '.enter')
                .startAnimation();
        });
    };
    DatePickerBase = __decorate([
        angular2_1.Component({
            selector: 'date-picker'
        }),
        angular2_1.View({
            styles: ["\n   .input-group-addon {\n     background-color: #fff;\n     border-left: none; }\n\n   .modal {\n     display: block;\n     -webkit-transition: all 0.1s ease;\n     -moz-transition: all 0.1s ease;\n     transition: all 0.1s ease; }\n\n   .modal.ng-enter {\n     opacity: 0;\n     -webkit-transform: rotateX(-90deg);\n     -moz-transform: rotateX(-90deg);\n     -ms-transform: rotateX(-90deg);\n     -o-transform: rotateX(-90deg);\n     transform: rotateX(-90deg); }\n\n   .modal.ng-enter-active {\n     opacity: 1;\n     -webkit-transform: rotateX(0deg);\n     -moz-transform: rotateX(0deg);\n     -ms-transform: rotateX(0deg);\n     -o-transform: rotateX(0deg);\n     transform: rotateX(0deg); }\n\n   .modal.ng-leave {\n     opacity: 1;\n     -webkit-transform: rotateX(0deg);\n     -moz-transform: rotateX(0deg);\n     -ms-transform: rotateX(0deg);\n     -o-transform: rotateX(0deg);\n     transform: rotateX(0deg); }\n\n   .modal.ng-leave-active {\n     opacity: 0;\n     -webkit-transform: rotateX(90deg);\n     -moz-transform: rotateX(90deg);\n     -ms-transform: rotateX(90deg);\n     -o-transform: rotateX(90deg);\n     transform: rotateX(90deg); }\n\n   .modal-dialog {\n     display: inline-block;\n     width: 400px;\n     height: 300px;\n     margin: 0;\n     position: relative; }\n\n   .calendar-container {\n     overflow: hidden;\n     border: 1px solid transparent;\n     white-space: nowrap; }\n\n   date-picker-calendar {\n     padding-top: .5rem !important; }\n\n   date-picker-calendar.left.enter {\n     -webkit-animation: slideInLeft 0.2s ease;\n     -moz-animation: slideInLeft 0.2s ease;\n     animation: slideInLeft 0.2s ease; }\n\n   date-picker-calendar.left.leave {\n     margin-right: -100%;\n     -webkit-animation: slideOutLeft 0.2s ease;\n     -moz-animation: slideOutLeft 0.2s ease;\n     animation: slideOutLeft 0.2s ease; }\n\n   date-picker-calendar.right.enter {\n     -webkit-animation: slideInRight 0.2s ease;\n     -moz-animation: slideInRight 0.2s ease;\n     animation: slideInRight 0.2s ease; }\n\n   date-picker-calendar.right.leave {\n     margin-left: -50%;\n     -webkit-animation: slideOutRight 0.2s ease;\n     -moz-animation: slideOutRight 0.2s ease;\n     animation: slideOutRight 0.2s ease; }\n\n   .input-group-addon {\n     background-color: #fff;\n     border-left: none; }\n\n   header {\n     position: relative;\n     top: 0;\n     left: 0; }\n\n   .prev-month, .next-month {\n     position: absolute;\n     top: 0;\n     display: inline-block;\n     z-index: 100;\n     margin-top: .2rem; }\n     .prev-month .btn-sm, .next-month .btn-sm {\n       padding: .1rem .7rem; }\n\n   .prev-month {\n     left: 0;\n     margin-left: 4%; }\n\n   .next-month {\n     right: 0;\n     margin-right: 4%; }\n\t"],
            template: "\n   <div class=\"input-group\" (click)=\"showCalendar($event)\">\n   \t<input type=\"text\" class=\"form-control\"\n   \t\t[(ng-model)]=\"inputDate\" \n   \t\t #date-field\n   \t\t />\n   \t<span class=\"input-group-addon\" [class.input-group-addon-focus]=\"dateField.focus\">\n   \t\t<i class=\"fa fa-calendar\"></i>\n   \t</span>\n   </div>\n\n   <section class=\"modal ng-animate\" *ng-if=\"calendarDisplayed\">\n   <div class=\"modal-dialog\" role=\"document\"\n   \t[style.top.px]=\"calendarY\"\n   \t[style.left.px]=\"calendarX\">\n   <div class=\"modal-content container p-a-0\">\n   \t<header class=\"row\">\n   \t\t<div class=\"prev-month\">\n   \t\t\t<button class=\"btn btn-primary btn-sm\" role=\"prev\"\n   \t\t\t\t[class.disabled]=\"!canPrevMonth()\"\t\t\t \n   \t\t\t\t(click)=\"prevMonth()\">\n   \t\t\t\t<i class=\"fa fa-chevron-circle-left\"></i>\n   \t\t\t</button>\n   \t\t</div>\n   \t\t<div class=\"next-month\">\n   \t\t\t<button class=\"btn btn-primary btn-sm\" role=\"next\"\n   \t\t\t\t[class.disabled]=\"!canNextMonth()\"\n   \t\t\t\t(click)=\"nextMonth()\">\n   \t\t\t\t<i class=\"fa fa-chevron-circle-right\"></i>\n   \t\t\t</button>\n   \t\t</div>\n   \t</header>\n   \t<section class=\"calendar-container\">\n   \t\t<date-picker-calendar animation\n   \t\t\t*ng-for=\"#month of calendarMonths #i=index\"\n   \t\t\tclass=\"col-md-{{12/months}} p-a-0\"\n   \t\t\t[style.margin-left]=\"(i!=months||direction!='right'?0:-100/months)+'%'\" \n   \t\t\t[id]=\"i\"\n   \t\t\t[min-date]=\"minDate\" [max-date]=\"maxDate\"\n   \t\t\t[current-month]=\"month\" \n   \t\t\t[(selected-date)]=\"selectedDate\" \n   \t\t\t(selected-date)=\"hideCalendar()\"\n   \t\t\t />\n   \t</section>\n   </div>\n   </div>\n   </section>\n\t",
            directives: [DatePickerCalendar_1.DatePickerCalendar, angular2_1.CORE_DIRECTIVES, angular2_1.FORM_DIRECTIVES, Animation_1.Animation]
        }), 
        __metadata('design:paramtypes', [angular2_2.ElementRef])
    ], DatePickerBase);
    return DatePickerBase;
})();
exports.DatePickerBase = DatePickerBase;

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var angular2_1 = require('angular2/angular2');
var angular2_2 = require('angular2/angular2');
var DatePickerBase_1 = require('./DatePickerBase');
var DatePickerCalendar_1 = require('./DatePickerCalendar');
var Animation_1 = require('../../Directives/Animation/Animation');
var DatePicker = (function (_super) {
    __extends(DatePicker, _super);
    function DatePicker(modal) {
        _super.call(this, modal);
        this.valueChange = new angular2_2.EventEmitter();
        this._inputDate = "";
        this.selectedDate = new Date();
    }
    Object.defineProperty(DatePicker.prototype, "value", {
        set: function (value) {
            this._selectedDate = this.handleDateInput(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DatePicker.prototype, "selectedDate", {
        get: function () { return this._selectedDate; },
        set: function (value) {
            this._selectedDate = value;
            this._inputDate = value.toLocaleDateString();
            this.currentDate = value;
            this.valueChange.next(this.selectedDate);
            this.hideCalendar();
        },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(DatePicker.prototype, "inputDate", {
        get: function () { return this._inputDate; },
        set: function (value) {
            this._inputDate = value;
            this._selectedDate = new Date(value);
        },
        enumerable: true,
        configurable: true
    });
    ;
    DatePicker.prototype.onInit = function () {
        if (this.selectedDate < this._minDate)
            this.selectedDate = this._minDate;
        _super.prototype.onInit.call(this);
    };
    DatePicker.prototype.onChanges = function (changes) {
        this.onInit();
    };
    __decorate([
        angular2_2.Output(), 
        __metadata('design:type', Object)
    ], DatePicker.prototype, "valueChange");
    Object.defineProperty(DatePicker.prototype, "value",
        __decorate([
            angular2_2.Input(), 
            __metadata('design:type', Object), 
            __metadata('design:paramtypes', [Object])
        ], DatePicker.prototype, "value", Object.getOwnPropertyDescriptor(DatePicker.prototype, "value")));
    __decorate([
        angular2_2.ViewChildren(Animation_1.Animation), 
        __metadata('design:type', angular2_2.QueryList)
    ], DatePicker.prototype, "calendarQuery");
    DatePicker = __decorate([
        angular2_1.Component({
            selector: 'date-picker',
            inputs: [
                'minDate: min-date',
                'maxDate: max-date',
                'months: months'
            ]
        }),
        angular2_1.View({
            styles: ["\n   .input-group-addon {\n     background-color: #fff;\n     border-left: none; }\n\n   .modal {\n     display: block;\n     -webkit-transition: all 0.1s ease;\n     -moz-transition: all 0.1s ease;\n     transition: all 0.1s ease; }\n\n   .modal.ng-enter {\n     opacity: 0;\n     -webkit-transform: rotateX(-90deg);\n     -moz-transform: rotateX(-90deg);\n     -ms-transform: rotateX(-90deg);\n     -o-transform: rotateX(-90deg);\n     transform: rotateX(-90deg); }\n\n   .modal.ng-enter-active {\n     opacity: 1;\n     -webkit-transform: rotateX(0deg);\n     -moz-transform: rotateX(0deg);\n     -ms-transform: rotateX(0deg);\n     -o-transform: rotateX(0deg);\n     transform: rotateX(0deg); }\n\n   .modal.ng-leave {\n     opacity: 1;\n     -webkit-transform: rotateX(0deg);\n     -moz-transform: rotateX(0deg);\n     -ms-transform: rotateX(0deg);\n     -o-transform: rotateX(0deg);\n     transform: rotateX(0deg); }\n\n   .modal.ng-leave-active {\n     opacity: 0;\n     -webkit-transform: rotateX(90deg);\n     -moz-transform: rotateX(90deg);\n     -ms-transform: rotateX(90deg);\n     -o-transform: rotateX(90deg);\n     transform: rotateX(90deg); }\n\n   .modal-dialog {\n     display: inline-block;\n     width: 400px;\n     height: 300px;\n     margin: 0;\n     position: relative; }\n\n   .calendar-container {\n     overflow: hidden;\n     border: 1px solid transparent;\n     white-space: nowrap; }\n\n   date-picker-calendar {\n     padding-top: .5rem !important; }\n\n   date-picker-calendar.left.enter {\n     -webkit-animation: slideInLeft 0.2s ease;\n     -moz-animation: slideInLeft 0.2s ease;\n     animation: slideInLeft 0.2s ease; }\n\n   date-picker-calendar.left.leave {\n     margin-right: -100%;\n     -webkit-animation: slideOutLeft 0.2s ease;\n     -moz-animation: slideOutLeft 0.2s ease;\n     animation: slideOutLeft 0.2s ease; }\n\n   date-picker-calendar.right.enter {\n     -webkit-animation: slideInRight 0.2s ease;\n     -moz-animation: slideInRight 0.2s ease;\n     animation: slideInRight 0.2s ease; }\n\n   date-picker-calendar.right.leave {\n     margin-left: -50%;\n     -webkit-animation: slideOutRight 0.2s ease;\n     -moz-animation: slideOutRight 0.2s ease;\n     animation: slideOutRight 0.2s ease; }\n\n   .input-group-addon {\n     background-color: #fff;\n     border-left: none; }\n\n   header {\n     position: relative;\n     top: 0;\n     left: 0; }\n\n   .prev-month, .next-month {\n     position: absolute;\n     top: 0;\n     display: inline-block;\n     z-index: 100;\n     margin-top: .2rem; }\n     .prev-month .btn-sm, .next-month .btn-sm {\n       padding: .1rem .7rem; }\n\n   .prev-month {\n     left: 0;\n     margin-left: 4%; }\n\n   .next-month {\n     right: 0;\n     margin-right: 4%; }\n\t"],
            template: "\n   <div class=\"input-group\" (click)=\"showCalendar($event)\">\n   \t<input type=\"text\" class=\"form-control\"\n   \t\t[(ng-model)]=\"inputDate\" \n   \t\t #date-field\n   \t\t />\n   \t<span class=\"input-group-addon\" [class.input-group-addon-focus]=\"dateField.focus\">\n   \t\t<i class=\"fa fa-calendar\"></i>\n   \t</span>\n   </div>\n\n   <section class=\"modal ng-animate\" *ng-if=\"calendarDisplayed\">\n   <div class=\"modal-dialog\" role=\"document\"\n   \t[style.top.px]=\"calendarY\"\n   \t[style.left.px]=\"calendarX\">\n   <div class=\"modal-content container p-a-0\">\n   \t<header class=\"row\">\n   \t\t<div class=\"prev-month\">\n   \t\t\t<button class=\"btn btn-primary btn-sm\" role=\"prev\"\n   \t\t\t\t[class.disabled]=\"!canPrevMonth()\"\t\t\t \n   \t\t\t\t(click)=\"prevMonth()\">\n   \t\t\t\t<i class=\"fa fa-chevron-circle-left\"></i>\n   \t\t\t</button>\n   \t\t</div>\n   \t\t<div class=\"next-month\">\n   \t\t\t<button class=\"btn btn-primary btn-sm\" role=\"next\"\n   \t\t\t\t[class.disabled]=\"!canNextMonth()\"\n   \t\t\t\t(click)=\"nextMonth()\">\n   \t\t\t\t<i class=\"fa fa-chevron-circle-right\"></i>\n   \t\t\t</button>\n   \t\t</div>\n   \t</header>\n   \t<section class=\"calendar-container\">\n   \t\t<date-picker-calendar animation\n   \t\t\t*ng-for=\"#month of calendarMonths #i=index\"\n   \t\t\tclass=\"col-md-{{12/months}} p-a-0\"\n   \t\t\t[style.margin-left]=\"(i!=months||direction!='right'?0:-100/months)+'%'\" \n   \t\t\t[id]=\"i\"\n   \t\t\t[min-date]=\"minDate\" [max-date]=\"maxDate\"\n   \t\t\t[current-month]=\"month\" \n   \t\t\t[(selected-date)]=\"selectedDate\" \n   \t\t\t(selected-date)=\"hideCalendar()\"\n   \t\t\t />\n   \t</section>\n   </div>\n   </div>\n   </section>\n\t",
            directives: [DatePickerCalendar_1.DatePickerCalendar, angular2_1.CORE_DIRECTIVES, angular2_1.FORM_DIRECTIVES, Animation_1.Animation]
        }), 
        __metadata('design:paramtypes', [angular2_2.ElementRef])
    ], DatePicker);
    return DatePicker;
})(DatePickerBase_1.DatePickerBase);
exports.DatePicker = DatePicker;

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var angular2_1 = require('angular2/angular2');
var AnimationListener = (function () {
    function AnimationListener() {
        this.animationStart = new angular2_1.EventEmitter();
        this.animationEnd = new angular2_1.EventEmitter();
    }
    AnimationListener.prototype.animationStarted = function ($event) {
        this.animationStart.next($event);
    };
    AnimationListener.prototype.animationEnded = function ($event) {
        this.animationEnd.next($event);
    };
    __decorate([
        angular2_1.Output(), 
        __metadata('design:type', angular2_1.EventEmitter)
    ], AnimationListener.prototype, "animationStart");
    __decorate([
        angular2_1.Output(), 
        __metadata('design:type', angular2_1.EventEmitter)
    ], AnimationListener.prototype, "animationEnd");
    AnimationListener = __decorate([
        angular2_1.Directive({
            selector: '[.animated]',
            host: {
                '(animationstart)': 'animationStarted($event)',
                '(webkitAnimationStart)': 'animationStarted($event)',
                '(oanimationstart)': 'animationStarted($event)',
                '(MSAnimationStart)': 'animationStarted($event)',
                '(animationend)': 'animationEnded($event)',
                '(webkitAnimationEnd)': 'animationEnded($event)',
                '(oanimationend)': 'animationEnded($event)',
                '(MSAnimationEnd)': 'animationEnded($event)'
            }
        }), 
        __metadata('design:paramtypes', [])
    ], AnimationListener);
    return AnimationListener;
})();
exports.AnimationListener = AnimationListener;
exports.ANIMATION_LISTENER_PROVIDERS = [
    AnimationListener
];

/*
 * Example use
 *		Basic Array of single type: *ng-for="#n of someBlankArray | 0 : 9"
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var angular2_1 = require("angular2/angular2");
var Range = (function () {
    function Range() {
    }
    Range.prototype.transform = function (value, config) {
        if (config === void 0) { config = [0, 4]; }
        var newValue = [];
        var min = parseInt(config[0]);
        var max = parseInt(config[1]);
        for (var i = min; i <= max; i++)
            newValue.push(i);
        return newValue;
    };
    Range = __decorate([
        angular2_1.Pipe({
            name: 'range',
            pure: false
        }), 
        __metadata('design:paramtypes', [])
    ], Range);
    return Range;
})();
exports.Range = Range;
exports.RANGE_PROVIDERS = [
    Range
];

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var angular2_1 = require('angular2/angular2');
var AnimationListener_1 = require("../../directives/Animation/AnimationListener");
var Range_1 = require("../../pipes/Range/Range");
var Modal = (function () {
    function Modal(el) {
        this.displayed = false;
        this.closeOnUnfocus = true;
        this.closeButton = true;
        this.modalTitle = '';
        this._el = el.nativeElement;
    }
    Modal.prototype.clickElement = function (e) {
        if (this.closeOnUnfocus) {
            if (e.srcElement.className == 'modal customFadeIn' || e.srcElement.className == 'modal-dialog')
                this.showModal(false);
        }
    };
    Modal.prototype.getElement = function () {
        return this._el;
    };
    Modal.prototype.showModal = function (isDisplayed) {
        var _this = this;
        var body = document.body;
        if (isDisplayed === undefined) {
            this.displayed = !this.displayed;
        }
        else {
            this.displayed = isDisplayed;
        }
        if (this.displayed) {
            body.classList.add('modal-open');
        }
        else {
            body.classList.remove('modal-open');
            if (this.closeOnUnfocus) {
                this._el.childNodes[0].removeEventListener('click', function (e) {
                    if (e.srcElement.className == 'modal customFadeIn' || e.srcElement.className == 'modal-dialog')
                        _this.showModal(false);
                });
            }
        }
        return false;
    };
    __decorate([
        angular2_1.Input(), 
        __metadata('design:type', Boolean)
    ], Modal.prototype, "closeOnUnfocus");
    __decorate([
        angular2_1.Input(), 
        __metadata('design:type', Boolean)
    ], Modal.prototype, "closeButton");
    __decorate([
        angular2_1.Input(), 
        __metadata('design:type', String)
    ], Modal.prototype, "modalTitle");
    Modal = __decorate([
        angular2_1.Component({
            selector: 'modal',
            host: {
                '(click)': 'clickElement($event)'
            }
        }),
        angular2_1.View({
            styles: ["\n   .customFadeIn {\n     -webkit-animation-name: fadeInDown;\n     -moz-animation-name: fadeInDown;\n     animation-name: fadeInDown;\n     -webkit-animation-duration: 1s;\n     -moz-animation-duration: 1s;\n     animation-duration: 1s;\n     -webkit-animation-timing-function: ease;\n     -moz-animation-timing-function: ease;\n     animation-timing-function: ease; }\n\t"],
            template: "\n   <div class=\"modal\" [ng-class]=\"{customFadeIn: displayed}\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"myModalLabel\" aria-hidden=\"true\" [style.display]=\"displayed ? 'block' : 'none'\">\n       <div class=\"modal-dialog\" role=\"document\">\n           <div class=\"modal-content\">\n               <div class=\"modal-header\">\n                   <button *ng-if=\"closeButton\" type=\"button\" class=\"close\" aria-label=\"Close\" (click)=\"showModal(false)\">\n                       <span aria-hidden=\"true\">&times;</span>\n                       <span class=\"sr-only\">Close</span>\n                   </button>\n                   <h4 class=\"modal-title\" id=\"myModalLabel\">{{modalTitle}}</h4>\n               </div>\n               <ng-content></ng-content>\n           </div>\n       </div>\n   </div>\n   <div class=\"modal-backdrop\" [ng-class]=\"{fade: displayed, in: displayed}\" [style.display]=\"displayed ? 'block' : 'none'\"></div>\n\t",
            directives: [angular2_1.CORE_DIRECTIVES, AnimationListener_1.AnimationListener],
            pipes: [Range_1.Range]
        }), 
        __metadata('design:paramtypes', [angular2_1.ElementRef])
    ], Modal);
    return Modal;
})();
exports.Modal = Modal;
exports.MODAL_PROVIDERS = [
    Modal
];

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var angular2_1 = require('angular2/angular2');
var Range_1 = require('../../pipes/Range/Range');
var Pagination = (function () {
    function Pagination(el) {
        this.currentPageChange = new angular2_1.EventEmitter();
        this.pagesBlank = [];
        this._el = el.nativeElement;
    }
    Pagination.prototype.onChanges = function (changes) {
        this.setPage(this.currentPage);
    };
    Pagination.prototype.getElement = function () {
        return this._el;
    };
    Pagination.prototype.setPage = function (newPage) {
        if (newPage < 1 || newPage > this.totalPages)
            return;
        this.currentPage = newPage;
        //Shift pagination stuffs
        if (this.currentPage - Math.ceil(this.pagesAtOnce / 2) < 0 || this.totalPages - this.pagesAtOnce <= 0) {
            this.startingIndex = 0;
            this.endingIndex = this.pagesAtOnce;
            console.log('start', this.startingIndex, this.endingIndex);
        }
        else if (this.totalPages - this.currentPage <= this.pagesAtOnce - Math.ceil(this.pagesAtOnce / 2)) {
            this.startingIndex = this.totalPages - this.pagesAtOnce;
            this.endingIndex = this.totalPages;
            console.log('end', this.startingIndex, this.endingIndex);
        }
        else {
            this.startingIndex = this.currentPage - Math.ceil(this.pagesAtOnce / 2);
            this.endingIndex = this.startingIndex + this.pagesAtOnce < this.totalPages
                ? this.startingIndex + this.pagesAtOnce
                : this.totalPages;
            console.log('maths', this.startingIndex, this.endingIndex);
        }
        this.currentPageChange.next(this.currentPage);
    };
    __decorate([
        angular2_1.Input(), 
        __metadata('design:type', Number)
    ], Pagination.prototype, "currentPage");
    __decorate([
        angular2_1.Input(), 
        __metadata('design:type', Number)
    ], Pagination.prototype, "pagesAtOnce");
    __decorate([
        angular2_1.Input(), 
        __metadata('design:type', Number)
    ], Pagination.prototype, "totalPages");
    __decorate([
        angular2_1.Output(), 
        __metadata('design:type', angular2_1.EventEmitter)
    ], Pagination.prototype, "currentPageChange");
    Pagination = __decorate([
        angular2_1.Component({
            selector: 'pagination',
            properties: [
                "totalPages: total-pages",
                "pagesAtOnce: pages-at-once"
            ]
        }),
        angular2_1.View({
            styles: ["\n      a {\n        cursor: pointer; }\n    "],
            template: "\n      <nav>\n          <ul class=\"pagination\">\n              <li [class.disabled]=\"currentPage == 1\">\n                  <a [attr.disabled]=\"currentPage == 1\" (click)=\"setPage(1)\" aria-label=\"First\">\n                      <span aria-hidden=\"true\">First</span>\n                      <span class=\"sr-only\">First</span>\n                  </a>\n              </li>\n              <li [class.disabled]=\"currentPage == 1\">\n                  <a [attr.disabled]=\"currentPage == 1\" (click)=\"setPage(currentPage - 1)\" aria-label=\"Previous\">\n                      <span aria-hidden=\"true\">&laquo;</span>\n                      <span class=\"sr-only\">Previous</span>\n                  </a>\n              </li>\n              <li *ng-for=\"#page of pagesBlank | range : 1 : totalPages | slice: startingIndex : endingIndex\" [class.active]=\"currentPage == page\">\n                  <a (click)=\"setPage(page)\">{{page}}</a>\n              </li>\n              <li [class.disabled]=\"currentPage == totalPages\">\n                  <a [attr.disabled]=\"currentPage == totalPages\" (click)=\"setPage(currentPage + 1)\" aria-label=\"Next\">\n                      <span aria-hidden=\"true\">&raquo;</span>\n                      <span class=\"sr-only\">Next</span>\n                  </a>\n              </li>\n              <li [class.disabled]=\"currentPage == totalPages\">\n                  <a [attr.disabled]=\"currentPage == totalPages\" (click)=\"setPage(totalPages)\" aria-label=\"Last\">\n                      <span aria-hidden=\"true\">Last</span>\n                      <span class=\"sr-only\">Last</span>\n                  </a>\n              </li>\n          </ul>\n      </nav>\n\n      <div class=\"input-group col-md-3\">\n          <span class=\"input-group-addon\">Jump to:</span>\n          <select class=\"form-control\" (change)=\"setPage($event.target.value)\">\n              <option *ng-for=\"#page of pagesBlank | range : 1 : totalPages\" [value]=\"page\" [selected]=\"page == currentPage\">{{page}}</option>\n          </select>\n      </div>\n    ",
            directives: [angular2_1.CORE_DIRECTIVES],
            pipes: [angular2_1.SlicePipe, Range_1.Range]
        }), 
        __metadata('design:paramtypes', [angular2_1.ElementRef])
    ], Pagination);
    return Pagination;
})();
exports.Pagination = Pagination;
exports.PAGINATION_PROVIDERS = [
    Pagination
];

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
var Alert_1 = require("./Alert/Alert");
var Carousel_1 = require("./Carousel/Carousel");
var DatePicker_1 = require("./DatePicker/DatePicker");
var Modal_1 = require("./Modal/Modal");
var Pagination_1 = require("./Pagination/Pagination");
exports.FUELUI_COMPONENT_PROVIDERS = [
    Alert_1.ALERT_PROVIDERS,
    Carousel_1.CAROUSEL_PROVIDERS,
    DatePicker_1.DatePicker,
    Modal_1.MODAL_PROVIDERS,
    Pagination_1.PAGINATION_PROVIDERS
];
__export(require("./Alert/Alert"));
__export(require("./Carousel/Carousel"));
__export(require("./DatePicker/DatePicker"));
__export(require("./Modal/Modal"));
__export(require("./Pagination/Pagination"));

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var angular2_1 = require('angular2/angular2');
var Tooltip = (function () {
    function Tooltip(el) {
        this._el = el.nativeElement;
    }
    Tooltip.prototype.getElement = function () {
        return this._el;
    };
    Tooltip.prototype.show = function () {
        this.hide();
        var html = "\n        <div class=\"tooltip top customFadeIn\" role=\"tooltip\">\n          <div class=\"tooltip-arrow\"></div>\n          <div class=\"tooltip-inner\">\n          " + this.text + "\n          </div>\n        </div>\n        ";
        var newEl = document.createElement('div');
        newEl.setAttribute('role', 'tooltip');
        newEl.className = 'tooltip top customFadeIn';
        newEl.innerHTML = "\n        <div class=\"tooltip-arrow\"></div>\n          <div class=\"tooltip-inner\">\n          " + this.text + "\n          </div>";
        newEl.style.visibility = "hidden";
        this.getElement().appendChild(newEl);
        var bodyRect = document.body.getBoundingClientRect(), elemRect = this.getElement().getBoundingClientRect(), offset = (elemRect.top - bodyRect.top) - newEl.offsetHeight;
        this.hide();
        newEl.style.visibility = "";
        newEl.style.top = offset + 'px';
        newEl.style.left = elemRect.left + 'px';
        this.getElement().appendChild(newEl);
    };
    Tooltip.prototype.hide = function () {
        var tooltips = this.getElement().getElementsByClassName('tooltip');
        for (var i = 0; i < tooltips.length; i++) {
            tooltips[i].remove();
        }
    };
    Tooltip = __decorate([
        angular2_1.Directive({
            selector: '[tooltip]',
            properties: [
                'text: tooltip'
            ],
            host: {
                '(mouseover)': 'show()',
                '(mouseout)': 'hide()'
            }
        }), 
        __metadata('design:paramtypes', [angular2_1.ElementRef])
    ], Tooltip);
    return Tooltip;
})();
exports.Tooltip = Tooltip;
exports.TOOLTIP_PROVIDERS = [
    Tooltip
];

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
var AnimationListener_1 = require("./Animation/AnimationListener");
var Animation_1 = require('./Animation/Animation');
var Tooltip_1 = require("./Tooltip/Tooltip");
exports.FUELUI_DIRECTIVE_PROVIDERS = [
    Tooltip_1.TOOLTIP_PROVIDERS,
    Animation_1.Animation,
    AnimationListener_1.AnimationListener
];
__export(require("./Animation/AnimationListener"));
__export(require('./Animation/Animation'));
__export(require("./Tooltip/Tooltip"));

/*
 * Example use
 *		Basic Array of single type: *ng-for="#todo of todoService.todos | orderBy : 'desc'"
 *		Multidimensional Array Sort on single column: *ng-for="#todo of todoService.todos | orderBy : 'asc' : 'status'"
 *		Multidimensional Array Sort on multiple columns: *ng-for="#todo of todoService.todos | orderBy : 'asc' : ['status', 'title']"
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var angular2_1 = require("angular2/angular2");
var OrderBy = (function () {
    function OrderBy() {
    }
    OrderBy.prototype.transform = function (value, config) {
        if (config === void 0) { config = ['asc', null]; }
        if (!Array.isArray(value))
            return value;
        var newValue = [];
        var sort = config[0];
        var property = config[1];
        if (property == null || property == '') {
            //Basic array
            newValue = sort == 'asc' ? value.sort() : value.sort().reverse();
        }
        else if (!Array.isArray(property)) {
            //Single property to sort by, only look for that
            newValue = value.sort(function (a, b) {
                if (a[property] === b[property]) {
                    return 0;
                }
                else {
                    //Lowercase strings and parse numbers
                    if ((isNaN(parseFloat(a[property])) || isFinite(a[property]))
                        || (isNaN(parseFloat(b[property])) || isFinite(b[property]))) {
                        a[property] = a[property].toLowerCase();
                        b[property] = b[property].toLowerCase();
                    }
                    else {
                        a[property] = parseFloat(a[property]);
                        b[property] = parseFloat(b[property]);
                    }
                    if (sort == 'asc') {
                        return (a[property] < b[property]) ? -1 : 1;
                    }
                    else {
                        return (a[property] > b[property]) ? -1 : 1;
                    }
                }
            });
        }
        else {
            //Loop over property array in order and sort
            newValue = value.sort(function (a, b) {
                for (var i = 0; i < property.length; i++) {
                    //Lowercase strings and parse numbers
                    if ((isNaN(parseFloat(a[property[i]])) || isFinite(a[property[i]]))
                        || (isNaN(parseFloat(b[property[i]])) || isFinite(b[property[i]]))) {
                        a[property[i]] = a[property[i]].toLowerCase();
                        b[property[i]] = b[property[i]].toLowerCase();
                    }
                    else {
                        a[property[i]] = parseFloat(a[property[i]]);
                        b[property[i]] = parseFloat(b[property[i]]);
                    }
                    if (sort == 'asc') {
                        if (a[property[i]] < b[property[i]])
                            return -1;
                        if (a[property[i]] > b[property[i]])
                            return 1;
                    }
                    else {
                        if (a[property[i]] > b[property[i]])
                            return -1;
                        if (a[property[i]] < b[property[i]])
                            return 1;
                    }
                }
                return 0; //equal each other
            });
        }
        return newValue;
    };
    OrderBy = __decorate([
        angular2_1.Pipe({
            name: 'orderBy',
            pure: false
        }), 
        __metadata('design:paramtypes', [])
    ], OrderBy);
    return OrderBy;
})();
exports.OrderBy = OrderBy;
exports.ORDERBY_PROVIDERS = [
    OrderBy
];

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
var OrderBy_1 = require("./OrderBy/OrderBy");
var Range_1 = require("./Range/Range");
exports.FUELUI_PIPE_PROVIDERS = [
    OrderBy_1.ORDERBY_PROVIDERS,
    Range_1.RANGE_PROVIDERS
];
__export(require("./OrderBy/OrderBy"));
__export(require("./Range/Range"));

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var angular2_1 = require('angular2/angular2');
var components_1 = require('./components/components');
var directives_1 = require('./directives/directives');
var pipes_1 = require('./pipes/pipes');
var DemoComponent = (function () {
    function DemoComponent() {
        this.modalTitle = 'TEST EST TESTSETSETTESET';
        this.closeText = 'Cancel';
        this.closeButton = true;
        this.closeOnUnfocus = true;
        this.showAlert = false;
        this.alertType = 'success';
        this.alertBody = '<strong>Some alert</strong> success message or something';
        this.progress = 25;
        this.totalPages = 10;
        this.pagesAtOnce = 5;
        this.currentPage = 1;
        this.selectedDate = new Date();
        this.minDate = new Date(new Date().setFullYear(new Date().getFullYear() - 1));
        this.maxDate = new Date(new Date().setFullYear(new Date().getFullYear() + 1));
        this.maxGuests = 5;
        this.maxChildren = 3;
        this.maxNumRooms = 15;
        this.numGuests = 2;
        this.numChildren = 1;
        this.numRooms = 1;
        this.checkInDate = new Date();
        this.checkOutDate = new Date();
    }
    DemoComponent.prototype.pageChange = function (page) {
        this.currentPage = page;
    };
    DemoComponent.prototype.saveFunc = function (modal, error) {
        //do validations
        if (!error) {
            this.alertType = 'success';
            this.alertBody = '<strong>Some alert</strong> success message or something';
            this.showAlert = true;
        }
        else {
            this.alertType = 'danger';
            this.alertBody = '<strong>Something went wrong</strong> error message or something';
            this.showAlert = true;
        }
        modal.showModal(false);
    };
    DemoComponent.prototype.logStart = function ($event) {
        console.log('AT THE START!', $event);
    };
    DemoComponent.prototype.logEnd = function ($event) {
        console.log('AT THE END!', $event);
    };
    DemoComponent = __decorate([
        angular2_1.Component({
            selector: 'fuel-ui'
        }),
        angular2_1.View({
            template: "\n\t<main class=\"container\">\n\t\t<h2>Animation Helper</h2>\n\t\t<div class=\"row m-a\">\n\t\t\t<div class=\"test-box\"\n\t\t\t\tanimation=\"test-animation-a test-animation-b\"\n\t\t\t\tplay=\"true\"\n\t\t\t\t(on-animation-end)=\"logEnd()\"></div>\n\t\t</div>\n\t\t<h2>DatePicker</h3>\n\t\t<section class=\"row m-a\">\n\t\t\t<div class=\"col-md-3\">\n\t\t\t\t<date-picker \n\t\t\t\t\tmin-date=\"11/1/2015\"\n\t\t\t\t\tmax-date=\"11/1/2016\" months=\"2\" />\n\t\t\t</div>\n\t\t</section>\n\t\t<h2>Carousel</h2>\n\t\t<section class=\"row m-a\">\n\t\t\t<carousel class=\"col-md-6\">\n\t\t\t\t<img class=\"carousel-item\" \n\t\t\t\t\tsrc=\"/images/carouselImages/beach.png\" alt=\"Beach\" />\n\t\t\t\t<img class=\"carousel-item\" \n\t\t\t\t\tsrc=\"/images/carouselImages/river.jpg\" alt=\"River\" />\n\t\t\t\t<img class=\"carousel-item\" \n\t\t\t\t\tsrc=\"/images/carouselImages/windmill.jpg\" alt=\"Windmill\" />\n\t\t\t</carousel>\n\t\t</section>\n\t\t<h2>Alert</h2>\n\t\t<section class=\"row m-a\">\n\t\t\t<alert\n\t\t\t\t[(displayed)]=\"showAlert\"\n\t\t\t\t[type]=\"alertType\">\n\t\t\t\t<span [inner-html]=\"alertBody\"></span>\n\t\t\t</alert>\n\t\t\t<button (click)=\"saveFunc(modal, false)\">Toggle Alert Success</button>\n\t\t\t<button (click)=\"saveFunc(modal, true)\">Toggle Alert Error</button>\n\t\t</section>\n\t\t<h2>Modal</h2>\n\t\t<section class=\"row m-a\">\n\t\t\t<button (click)=\"modal.showModal()\">Toggle Modal</button>\n\t\t\t<modal #modal\n\t\t\t\tclass=\"animated\"\n\t\t\t\t[modal-title]=\"modalTitle\"\n\t\t\t\t[close-button]=\"closeButton\"\n\t\t\t\t[close-on-unfocus]=\"closeOnUnfocus\"\n\t\t\t\t(animation-start)=\"logStart($event)\"\n\t\t\t\t(animation-end)=\"logEnd($event)\">\n\t\t\t\t<div class=\"modal-body\">\n\t\t\t\t\t<carousel>\n\t\t\t\t\t\t<img class=\"carousel-item\"\n\t\t\t\t\t\t\tsrc=\"/images/carouselImages/beach.png\" alt=\"Beach\" />\n\t\t\t\t\t\t<img class=\"carousel-item\"\n\t\t\t\t\t\t\tsrc=\"/images/carouselImages/river.jpg\" alt=\"River\" />\n\t\t\t\t\t\t<img class=\"carousel-item\"\n\t\t\t\t\t\t\tsrc=\"/images/carouselImages/windmill.jpg\" alt=\"Windmill\" />\n\t\t\t\t\t</carousel>\n\t\t\t\t\t<ul>\n\t\t\t\t\t\t<li>Testing 1</li>\n\t\t\t\t\t\t<li>Testing 2</li>\n\t\t\t\t\t\t<li>Testing 3</li>\n\t\t\t\t\t\t<li>&hellip;</li>\n\t\t\t\t\t</ul>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"modal-footer\">\n\t\t\t\t\t<button type=\"button\" class=\"btn btn-primary\" (click)=\"modal.showModal(false)\">\n\t\t\t\t\t\t<i class=\"fa fa-chevron-left\"></i> Go Back\n\t\t\t\t\t</button>\n\t\t\t\t\t<button type=\"button\" class=\"btn btn-danger\" (click)=\"saveFunc(modal, true)\">Error!</button>\n\t\t\t\t\t<button type=\"button\" class=\"btn btn-success\" (click)=\"saveFunc(modal, false)\">Success!</button>\n\t\t\t\t</div>\n\t\t\t</modal>\n\t\t</section>\n\t\t<h2>Tooltip</h2>\n\t\t<section class=\"row m-a\">\n\t\t\t<div tooltip=\"Tooltip text goes here.\">Some text here.</div>\n\t\t\t<div tooltip=\"Example data binding: {{test}}!\">Hover me with input value</div> <input [(ng-model)]=\"test\" type=\"text\" class=\"form-control\">\n\t\t</section>\n\t\t<section class=\"row m-a\">\n\t\t\t<h2>Pagination Example</h2>\n\t\t\t<form>\n\t\t\t\t<div class=\"form-group row\">\n\t\t\t\t\t<label for=\"totalPages\" class=\"col-sm-2 form-control-label\">Total Pages</label>\n\t\t\t\t\t<div class=\"col-sm-2\">\n\t\t\t\t\t\t<input class=\"form-control\" [(ng-model)]=\"totalPages\" min=\"1\" type=\"number\" name=\"totalPages\">\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"form-group row\">\n\t\t\t\t\t<label for=\"pagesAtOnce\" class=\"col-sm-2 form-control-label\">Pages At Once</label>\n\t\t\t\t\t<div class=\"col-sm-2\">\n\t\t\t\t\t\t<input class=\"form-control\" [(ng-model)]=\"pagesAtOnce\" min=\"1\" [max]=\"totalPages\" type=\"number\" name=\"pagesAtOnce\">\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"form-group row\">\n\t\t\t\t\t<label for=\"currentPage\" class=\"col-sm-2 form-control-label\">Current Page</label>\n\t\t\t\t\t<div class=\"col-sm-2\">\n\t\t\t\t\t\t<input class=\"form-control\" [(ng-model)]=\"currentPage\" min=\"1\" [max]=\"totalPages\" type=\"number\" name=\"currentPage\">\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</form>\n\t\t\t<pagination\n\t\t\t\t[(current-page)]=\"currentPage\"\n\t\t\t\t[total-pages]=\"totalPages\"\n\t\t\t\t[pages-at-once]=\"pagesAtOnce\">\n\t\t\t</pagination>\n\t\t</section>\n\t\t<section class=\"row m-a\">\n\t\t\t<h2>Progress Example</h2>\n\t\t\t<form>\n\t\t\t\t<div class=\"form-group row\">\n\t\t\t\t\t<label for=\"progress\" class=\"col-sm-2 form-control-label\">Progress %</label>\n\t\t\t\t\t<div class=\"col-sm-2\">\n\t\t\t\t\t\t<input class=\"form-control\" [(ng-model)]=\"progress\" min=\"0\" max=\"100\" type=\"number\" name=\"progress\">\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</form>\n\t\t\t<progress class=\"progress progress-striped progress-animated\" [value]=\"progress\" max=\"100\">{{progress}}%</progress>\n\t\t</section>\n\t</main>",
            directives: [angular2_1.CORE_DIRECTIVES, components_1.FUELUI_COMPONENT_PROVIDERS, directives_1.FUELUI_DIRECTIVE_PROVIDERS, angular2_1.FORM_DIRECTIVES],
            encapsulation: angular2_1.ViewEncapsulation.None,
            styles: ["\n   @-webkit-keyframes fadeIn {\n     0% {\n       opacity: 0; }\n     100% {\n       opacity: 1; } }\n\n   @-moz-keyframes fadeIn {\n     0% {\n       opacity: 0; }\n     100% {\n       opacity: 1; } }\n\n   @-ms-keyframes fadeIn {\n     0% {\n       opacity: 0; }\n     100% {\n       opacity: 1; } }\n\n   @-o-keyframes fadeIn {\n     0% {\n       opacity: 0; }\n     100% {\n       opacity: 1; } }\n\n   @keyframes fadeIn {\n     0% {\n       opacity: 0; }\n     100% {\n       opacity: 1; } }\n\n   @-webkit-keyframes fadeInDown {\n     0% {\n       opacity: 0;\n       -webkit-transform: translateY(-20px);\n       -moz-transform: translateY(-20px);\n       -ms-transform: translateY(-20px);\n       -o-transform: translateY(-20px);\n       transform: translateY(-20px); }\n     100% {\n       opacity: 1;\n       -webkit-transform: translateY(0);\n       -moz-transform: translateY(0);\n       -ms-transform: translateY(0);\n       -o-transform: translateY(0);\n       transform: translateY(0); } }\n\n   @-moz-keyframes fadeInDown {\n     0% {\n       opacity: 0;\n       -webkit-transform: translateY(-20px);\n       -moz-transform: translateY(-20px);\n       -ms-transform: translateY(-20px);\n       -o-transform: translateY(-20px);\n       transform: translateY(-20px); }\n     100% {\n       opacity: 1;\n       -webkit-transform: translateY(0);\n       -moz-transform: translateY(0);\n       -ms-transform: translateY(0);\n       -o-transform: translateY(0);\n       transform: translateY(0); } }\n\n   @-ms-keyframes fadeInDown {\n     0% {\n       opacity: 0;\n       -webkit-transform: translateY(-20px);\n       -moz-transform: translateY(-20px);\n       -ms-transform: translateY(-20px);\n       -o-transform: translateY(-20px);\n       transform: translateY(-20px); }\n     100% {\n       opacity: 1;\n       -webkit-transform: translateY(0);\n       -moz-transform: translateY(0);\n       -ms-transform: translateY(0);\n       -o-transform: translateY(0);\n       transform: translateY(0); } }\n\n   @-o-keyframes fadeInDown {\n     0% {\n       opacity: 0;\n       -webkit-transform: translateY(-20px);\n       -moz-transform: translateY(-20px);\n       -ms-transform: translateY(-20px);\n       -o-transform: translateY(-20px);\n       transform: translateY(-20px); }\n     100% {\n       opacity: 1;\n       -webkit-transform: translateY(0);\n       -moz-transform: translateY(0);\n       -ms-transform: translateY(0);\n       -o-transform: translateY(0);\n       transform: translateY(0); } }\n\n   @keyframes fadeInDown {\n     0% {\n       opacity: 0;\n       -webkit-transform: translateY(-20px);\n       -moz-transform: translateY(-20px);\n       -ms-transform: translateY(-20px);\n       -o-transform: translateY(-20px);\n       transform: translateY(-20px); }\n     100% {\n       opacity: 1;\n       -webkit-transform: translateY(0);\n       -moz-transform: translateY(0);\n       -ms-transform: translateY(0);\n       -o-transform: translateY(0);\n       transform: translateY(0); } }\n\n   @-webkit-keyframes fadeInDownBig {\n     0% {\n       opacity: 0;\n       -webkit-transform: translateY(-2000px);\n       -moz-transform: translateY(-2000px);\n       -ms-transform: translateY(-2000px);\n       -o-transform: translateY(-2000px);\n       transform: translateY(-2000px); }\n     100% {\n       opacity: 1;\n       -webkit-transform: translateY(0);\n       -moz-transform: translateY(0);\n       -ms-transform: translateY(0);\n       -o-transform: translateY(0);\n       transform: translateY(0); } }\n\n   @-moz-keyframes fadeInDownBig {\n     0% {\n       opacity: 0;\n       -webkit-transform: translateY(-2000px);\n       -moz-transform: translateY(-2000px);\n       -ms-transform: translateY(-2000px);\n       -o-transform: translateY(-2000px);\n       transform: translateY(-2000px); }\n     100% {\n       opacity: 1;\n       -webkit-transform: translateY(0);\n       -moz-transform: translateY(0);\n       -ms-transform: translateY(0);\n       -o-transform: translateY(0);\n       transform: translateY(0); } }\n\n   @-ms-keyframes fadeInDownBig {\n     0% {\n       opacity: 0;\n       -webkit-transform: translateY(-2000px);\n       -moz-transform: translateY(-2000px);\n       -ms-transform: translateY(-2000px);\n       -o-transform: translateY(-2000px);\n       transform: translateY(-2000px); }\n     100% {\n       opacity: 1;\n       -webkit-transform: translateY(0);\n       -moz-transform: translateY(0);\n       -ms-transform: translateY(0);\n       -o-transform: translateY(0);\n       transform: translateY(0); } }\n\n   @-o-keyframes fadeInDownBig {\n     0% {\n       opacity: 0;\n       -webkit-transform: translateY(-2000px);\n       -moz-transform: translateY(-2000px);\n       -ms-transform: translateY(-2000px);\n       -o-transform: translateY(-2000px);\n       transform: translateY(-2000px); }\n     100% {\n       opacity: 1;\n       -webkit-transform: translateY(0);\n       -moz-transform: translateY(0);\n       -ms-transform: translateY(0);\n       -o-transform: translateY(0);\n       transform: translateY(0); } }\n\n   @keyframes fadeInDownBig {\n     0% {\n       opacity: 0;\n       -webkit-transform: translateY(-2000px);\n       -moz-transform: translateY(-2000px);\n       -ms-transform: translateY(-2000px);\n       -o-transform: translateY(-2000px);\n       transform: translateY(-2000px); }\n     100% {\n       opacity: 1;\n       -webkit-transform: translateY(0);\n       -moz-transform: translateY(0);\n       -ms-transform: translateY(0);\n       -o-transform: translateY(0);\n       transform: translateY(0); } }\n\n   @-webkit-keyframes fadeInLeft {\n     0% {\n       opacity: 0;\n       -webkit-transform: translateX(-20px);\n       -moz-transform: translateX(-20px);\n       -ms-transform: translateX(-20px);\n       -o-transform: translateX(-20px);\n       transform: translateX(-20px); }\n     100% {\n       opacity: 1;\n       -webkit-transform: translateX(0);\n       -moz-transform: translateX(0);\n       -ms-transform: translateX(0);\n       -o-transform: translateX(0);\n       transform: translateX(0); } }\n\n   @-moz-keyframes fadeInLeft {\n     0% {\n       opacity: 0;\n       -webkit-transform: translateX(-20px);\n       -moz-transform: translateX(-20px);\n       -ms-transform: translateX(-20px);\n       -o-transform: translateX(-20px);\n       transform: translateX(-20px); }\n     100% {\n       opacity: 1;\n       -webkit-transform: translateX(0);\n       -moz-transform: translateX(0);\n       -ms-transform: translateX(0);\n       -o-transform: translateX(0);\n       transform: translateX(0); } }\n\n   @-ms-keyframes fadeInLeft {\n     0% {\n       opacity: 0;\n       -webkit-transform: translateX(-20px);\n       -moz-transform: translateX(-20px);\n       -ms-transform: translateX(-20px);\n       -o-transform: translateX(-20px);\n       transform: translateX(-20px); }\n     100% {\n       opacity: 1;\n       -webkit-transform: translateX(0);\n       -moz-transform: translateX(0);\n       -ms-transform: translateX(0);\n       -o-transform: translateX(0);\n       transform: translateX(0); } }\n\n   @-o-keyframes fadeInLeft {\n     0% {\n       opacity: 0;\n       -webkit-transform: translateX(-20px);\n       -moz-transform: translateX(-20px);\n       -ms-transform: translateX(-20px);\n       -o-transform: translateX(-20px);\n       transform: translateX(-20px); }\n     100% {\n       opacity: 1;\n       -webkit-transform: translateX(0);\n       -moz-transform: translateX(0);\n       -ms-transform: translateX(0);\n       -o-transform: translateX(0);\n       transform: translateX(0); } }\n\n   @keyframes fadeInLeft {\n     0% {\n       opacity: 0;\n       -webkit-transform: translateX(-20px);\n       -moz-transform: translateX(-20px);\n       -ms-transform: translateX(-20px);\n       -o-transform: translateX(-20px);\n       transform: translateX(-20px); }\n     100% {\n       opacity: 1;\n       -webkit-transform: translateX(0);\n       -moz-transform: translateX(0);\n       -ms-transform: translateX(0);\n       -o-transform: translateX(0);\n       transform: translateX(0); } }\n\n   @-webkit-keyframes fadeInLeftBig {\n     0% {\n       opacity: 0;\n       -webkit-transform: translateX(-2000px);\n       -moz-transform: translateX(-2000px);\n       -ms-transform: translateX(-2000px);\n       -o-transform: translateX(-2000px);\n       transform: translateX(-2000px); }\n     100% {\n       opacity: 1;\n       -webkit-transform: translateX(0);\n       -moz-transform: translateX(0);\n       -ms-transform: translateX(0);\n       -o-transform: translateX(0);\n       transform: translateX(0); } }\n\n   @-moz-keyframes fadeInLeftBig {\n     0% {\n       opacity: 0;\n       -webkit-transform: translateX(-2000px);\n       -moz-transform: translateX(-2000px);\n       -ms-transform: translateX(-2000px);\n       -o-transform: translateX(-2000px);\n       transform: translateX(-2000px); }\n     100% {\n       opacity: 1;\n       -webkit-transform: translateX(0);\n       -moz-transform: translateX(0);\n       -ms-transform: translateX(0);\n       -o-transform: translateX(0);\n       transform: translateX(0); } }\n\n   @-ms-keyframes fadeInLeftBig {\n     0% {\n       opacity: 0;\n       -webkit-transform: translateX(-2000px);\n       -moz-transform: translateX(-2000px);\n       -ms-transform: translateX(-2000px);\n       -o-transform: translateX(-2000px);\n       transform: translateX(-2000px); }\n     100% {\n       opacity: 1;\n       -webkit-transform: translateX(0);\n       -moz-transform: translateX(0);\n       -ms-transform: translateX(0);\n       -o-transform: translateX(0);\n       transform: translateX(0); } }\n\n   @-o-keyframes fadeInLeftBig {\n     0% {\n       opacity: 0;\n       -webkit-transform: translateX(-2000px);\n       -moz-transform: translateX(-2000px);\n       -ms-transform: translateX(-2000px);\n       -o-transform: translateX(-2000px);\n       transform: translateX(-2000px); }\n     100% {\n       opacity: 1;\n       -webkit-transform: translateX(0);\n       -moz-transform: translateX(0);\n       -ms-transform: translateX(0);\n       -o-transform: translateX(0);\n       transform: translateX(0); } }\n\n   @keyframes fadeInLeftBig {\n     0% {\n       opacity: 0;\n       -webkit-transform: translateX(-2000px);\n       -moz-transform: translateX(-2000px);\n       -ms-transform: translateX(-2000px);\n       -o-transform: translateX(-2000px);\n       transform: translateX(-2000px); }\n     100% {\n       opacity: 1;\n       -webkit-transform: translateX(0);\n       -moz-transform: translateX(0);\n       -ms-transform: translateX(0);\n       -o-transform: translateX(0);\n       transform: translateX(0); } }\n\n   @-webkit-keyframes fadeInRight {\n     0% {\n       opacity: 0;\n       -webkit-transform: translateX(20px);\n       -moz-transform: translateX(20px);\n       -ms-transform: translateX(20px);\n       -o-transform: translateX(20px);\n       transform: translateX(20px); }\n     100% {\n       opacity: 1;\n       -webkit-transform: translateX(0);\n       -moz-transform: translateX(0);\n       -ms-transform: translateX(0);\n       -o-transform: translateX(0);\n       transform: translateX(0); } }\n\n   @-moz-keyframes fadeInRight {\n     0% {\n       opacity: 0;\n       -webkit-transform: translateX(20px);\n       -moz-transform: translateX(20px);\n       -ms-transform: translateX(20px);\n       -o-transform: translateX(20px);\n       transform: translateX(20px); }\n     100% {\n       opacity: 1;\n       -webkit-transform: translateX(0);\n       -moz-transform: translateX(0);\n       -ms-transform: translateX(0);\n       -o-transform: translateX(0);\n       transform: translateX(0); } }\n\n   @-ms-keyframes fadeInRight {\n     0% {\n       opacity: 0;\n       -webkit-transform: translateX(20px);\n       -moz-transform: translateX(20px);\n       -ms-transform: translateX(20px);\n       -o-transform: translateX(20px);\n       transform: translateX(20px); }\n     100% {\n       opacity: 1;\n       -webkit-transform: translateX(0);\n       -moz-transform: translateX(0);\n       -ms-transform: translateX(0);\n       -o-transform: translateX(0);\n       transform: translateX(0); } }\n\n   @-o-keyframes fadeInRight {\n     0% {\n       opacity: 0;\n       -webkit-transform: translateX(20px);\n       -moz-transform: translateX(20px);\n       -ms-transform: translateX(20px);\n       -o-transform: translateX(20px);\n       transform: translateX(20px); }\n     100% {\n       opacity: 1;\n       -webkit-transform: translateX(0);\n       -moz-transform: translateX(0);\n       -ms-transform: translateX(0);\n       -o-transform: translateX(0);\n       transform: translateX(0); } }\n\n   @keyframes fadeInRight {\n     0% {\n       opacity: 0;\n       -webkit-transform: translateX(20px);\n       -moz-transform: translateX(20px);\n       -ms-transform: translateX(20px);\n       -o-transform: translateX(20px);\n       transform: translateX(20px); }\n     100% {\n       opacity: 1;\n       -webkit-transform: translateX(0);\n       -moz-transform: translateX(0);\n       -ms-transform: translateX(0);\n       -o-transform: translateX(0);\n       transform: translateX(0); } }\n\n   @-webkit-keyframes fadeInRightBig {\n     0% {\n       opacity: 0;\n       -webkit-transform: translateX(2000px);\n       -moz-transform: translateX(2000px);\n       -ms-transform: translateX(2000px);\n       -o-transform: translateX(2000px);\n       transform: translateX(2000px); }\n     100% {\n       opacity: 1;\n       -webkit-transform: translateX(0);\n       -moz-transform: translateX(0);\n       -ms-transform: translateX(0);\n       -o-transform: translateX(0);\n       transform: translateX(0); } }\n\n   @-moz-keyframes fadeInRightBig {\n     0% {\n       opacity: 0;\n       -webkit-transform: translateX(2000px);\n       -moz-transform: translateX(2000px);\n       -ms-transform: translateX(2000px);\n       -o-transform: translateX(2000px);\n       transform: translateX(2000px); }\n     100% {\n       opacity: 1;\n       -webkit-transform: translateX(0);\n       -moz-transform: translateX(0);\n       -ms-transform: translateX(0);\n       -o-transform: translateX(0);\n       transform: translateX(0); } }\n\n   @-ms-keyframes fadeInRightBig {\n     0% {\n       opacity: 0;\n       -webkit-transform: translateX(2000px);\n       -moz-transform: translateX(2000px);\n       -ms-transform: translateX(2000px);\n       -o-transform: translateX(2000px);\n       transform: translateX(2000px); }\n     100% {\n       opacity: 1;\n       -webkit-transform: translateX(0);\n       -moz-transform: translateX(0);\n       -ms-transform: translateX(0);\n       -o-transform: translateX(0);\n       transform: translateX(0); } }\n\n   @-o-keyframes fadeInRightBig {\n     0% {\n       opacity: 0;\n       -webkit-transform: translateX(2000px);\n       -moz-transform: translateX(2000px);\n       -ms-transform: translateX(2000px);\n       -o-transform: translateX(2000px);\n       transform: translateX(2000px); }\n     100% {\n       opacity: 1;\n       -webkit-transform: translateX(0);\n       -moz-transform: translateX(0);\n       -ms-transform: translateX(0);\n       -o-transform: translateX(0);\n       transform: translateX(0); } }\n\n   @keyframes fadeInRightBig {\n     0% {\n       opacity: 0;\n       -webkit-transform: translateX(2000px);\n       -moz-transform: translateX(2000px);\n       -ms-transform: translateX(2000px);\n       -o-transform: translateX(2000px);\n       transform: translateX(2000px); }\n     100% {\n       opacity: 1;\n       -webkit-transform: translateX(0);\n       -moz-transform: translateX(0);\n       -ms-transform: translateX(0);\n       -o-transform: translateX(0);\n       transform: translateX(0); } }\n\n   @-webkit-keyframes fadeInUp {\n     0% {\n       opacity: 0;\n       -webkit-transform: translateY(20px);\n       -moz-transform: translateY(20px);\n       -ms-transform: translateY(20px);\n       -o-transform: translateY(20px);\n       transform: translateY(20px); }\n     100% {\n       opacity: 1;\n       -webkit-transform: translateY(0);\n       -moz-transform: translateY(0);\n       -ms-transform: translateY(0);\n       -o-transform: translateY(0);\n       transform: translateY(0); } }\n\n   @-moz-keyframes fadeInUp {\n     0% {\n       opacity: 0;\n       -webkit-transform: translateY(20px);\n       -moz-transform: translateY(20px);\n       -ms-transform: translateY(20px);\n       -o-transform: translateY(20px);\n       transform: translateY(20px); }\n     100% {\n       opacity: 1;\n       -webkit-transform: translateY(0);\n       -moz-transform: translateY(0);\n       -ms-transform: translateY(0);\n       -o-transform: translateY(0);\n       transform: translateY(0); } }\n\n   @-ms-keyframes fadeInUp {\n     0% {\n       opacity: 0;\n       -webkit-transform: translateY(20px);\n       -moz-transform: translateY(20px);\n       -ms-transform: translateY(20px);\n       -o-transform: translateY(20px);\n       transform: translateY(20px); }\n     100% {\n       opacity: 1;\n       -webkit-transform: translateY(0);\n       -moz-transform: translateY(0);\n       -ms-transform: translateY(0);\n       -o-transform: translateY(0);\n       transform: translateY(0); } }\n\n   @-o-keyframes fadeInUp {\n     0% {\n       opacity: 0;\n       -webkit-transform: translateY(20px);\n       -moz-transform: translateY(20px);\n       -ms-transform: translateY(20px);\n       -o-transform: translateY(20px);\n       transform: translateY(20px); }\n     100% {\n       opacity: 1;\n       -webkit-transform: translateY(0);\n       -moz-transform: translateY(0);\n       -ms-transform: translateY(0);\n       -o-transform: translateY(0);\n       transform: translateY(0); } }\n\n   @keyframes fadeInUp {\n     0% {\n       opacity: 0;\n       -webkit-transform: translateY(20px);\n       -moz-transform: translateY(20px);\n       -ms-transform: translateY(20px);\n       -o-transform: translateY(20px);\n       transform: translateY(20px); }\n     100% {\n       opacity: 1;\n       -webkit-transform: translateY(0);\n       -moz-transform: translateY(0);\n       -ms-transform: translateY(0);\n       -o-transform: translateY(0);\n       transform: translateY(0); } }\n\n   @-webkit-keyframes fadeInUpBig {\n     0% {\n       opacity: 0;\n       -webkit-transform: translateY(2000px);\n       -moz-transform: translateY(2000px);\n       -ms-transform: translateY(2000px);\n       -o-transform: translateY(2000px);\n       transform: translateY(2000px); }\n     100% {\n       opacity: 1;\n       -webkit-transform: translateY(0);\n       -moz-transform: translateY(0);\n       -ms-transform: translateY(0);\n       -o-transform: translateY(0);\n       transform: translateY(0); } }\n\n   @-moz-keyframes fadeInUpBig {\n     0% {\n       opacity: 0;\n       -webkit-transform: translateY(2000px);\n       -moz-transform: translateY(2000px);\n       -ms-transform: translateY(2000px);\n       -o-transform: translateY(2000px);\n       transform: translateY(2000px); }\n     100% {\n       opacity: 1;\n       -webkit-transform: translateY(0);\n       -moz-transform: translateY(0);\n       -ms-transform: translateY(0);\n       -o-transform: translateY(0);\n       transform: translateY(0); } }\n\n   @-ms-keyframes fadeInUpBig {\n     0% {\n       opacity: 0;\n       -webkit-transform: translateY(2000px);\n       -moz-transform: translateY(2000px);\n       -ms-transform: translateY(2000px);\n       -o-transform: translateY(2000px);\n       transform: translateY(2000px); }\n     100% {\n       opacity: 1;\n       -webkit-transform: translateY(0);\n       -moz-transform: translateY(0);\n       -ms-transform: translateY(0);\n       -o-transform: translateY(0);\n       transform: translateY(0); } }\n\n   @-o-keyframes fadeInUpBig {\n     0% {\n       opacity: 0;\n       -webkit-transform: translateY(2000px);\n       -moz-transform: translateY(2000px);\n       -ms-transform: translateY(2000px);\n       -o-transform: translateY(2000px);\n       transform: translateY(2000px); }\n     100% {\n       opacity: 1;\n       -webkit-transform: translateY(0);\n       -moz-transform: translateY(0);\n       -ms-transform: translateY(0);\n       -o-transform: translateY(0);\n       transform: translateY(0); } }\n\n   @keyframes fadeInUpBig {\n     0% {\n       opacity: 0;\n       -webkit-transform: translateY(2000px);\n       -moz-transform: translateY(2000px);\n       -ms-transform: translateY(2000px);\n       -o-transform: translateY(2000px);\n       transform: translateY(2000px); }\n     100% {\n       opacity: 1;\n       -webkit-transform: translateY(0);\n       -moz-transform: translateY(0);\n       -ms-transform: translateY(0);\n       -o-transform: translateY(0);\n       transform: translateY(0); } }\n\n   .customFadeIn {\n     cursor: pointer;\n     opacity: 1 !important;\n     -webkit-animation-name: fadeIn;\n     -moz-animation-name: fadeIn;\n     -ms-animation-name: fadeIn;\n     -o-animation-name: fadeIn;\n     animation-name: fadeIn;\n     -webkit-animation-iteration-count: 1s;\n     -moz-animation-iteration-count: 1s;\n     -ms-animation-iteration-count: 1s;\n     -o-animation-iteration-count: 1s;\n     animation-iteration-count: 1s;\n     -webkit-animation-duration: 0.5s;\n     -moz-animation-duration: 0.5s;\n     -ms-animation-duration: 0.5s;\n     -o-animation-duration: 0.5s;\n     animation-duration: 0.5s;\n     -webkit-animation-delay: 0s;\n     -moz-animation-delay: 0s;\n     -ms-animation-delay: 0s;\n     -o-animation-delay: 0s;\n     animation-delay: 0s;\n     -webkit-animation-timing-function: ease;\n     -moz-animation-timing-function: ease;\n     -ms-animation-timing-function: ease;\n     -o-animation-timing-function: ease;\n     animation-timing-function: ease;\n     -webkit-animation-fill-mode: both;\n     -moz-animation-fill-mode: both;\n     -ms-animation-fill-mode: both;\n     -o-animation-fill-mode: both;\n     animation-fill-mode: both;\n     -webkit-backface-visibility: hidden;\n     -moz-backface-visibility: hidden;\n     -ms-backface-visibility: hidden;\n     -o-backface-visibility: hidden;\n     backface-visibility: hidden; }\n\t"],
            pipes: [pipes_1.FUELUI_PIPE_PROVIDERS]
        }), 
        __metadata('design:paramtypes', [])
    ], DemoComponent);
    return DemoComponent;
})();
exports.DemoComponent = DemoComponent;

require("es6-shim");
require("zone.js");
require("reflect-metadata/Reflect");
require("core-js");
var angular2_1 = require("angular2/angular2");
var router_1 = require("angular2/router");
var components_1 = require("./components/components");
var DemoComponent_1 = require("./DemoComponent");
angular2_1.bootstrap(DemoComponent_1.DemoComponent, [
    router_1.ROUTER_PROVIDERS,
    angular2_1.FORM_PROVIDERS,
    angular2_1.provide(router_1.LocationStrategy, { useClass: router_1.HashLocationStrategy }),
    components_1.FUELUI_COMPONENT_PROVIDERS
]);

var DateRange = (function () {
    function DateRange(start, end) {
        this.start = start;
        this.end = end;
    }
    DateRange.prototype.containsDate = function (date) {
        return date >= this.start && date <= this.end;
    };
    DateRange.prototype.numberOfNights = function () {
        return Math.ceil(Math.abs(this.start.getTime() - this.end.getTime()) / (1000 * 3600 * 24));
    };
    DateRange.prototype.dateArray = function () {
        if (this.end < this.start)
            return [];
        var dateArr = [];
        var currDate = new Date(this.start.toDateString());
        while (currDate <= this.end) {
            dateArr.push(currDate);
            currDate = new Date(currDate.getTime() + 24 * 60 * 60 * 1000);
        }
        return dateArr;
    };
    DateRange.prototype.weekArray = function () {
        if (this.end < this.start)
            return [];
        var weekArr = [];
        var currDate = new Date(this.start.toDateString());
        while (currDate <= this.end) {
            var dateArr = [];
            var dowNumber = currDate.getDay();
            do {
                dateArr.push(currDate);
                ++dowNumber;
                currDate = new Date(currDate.toDateString());
                currDate.setDate(currDate.getDate() + 1);
            } while (currDate <= this.end && dowNumber < 7);
            weekArr.push(dateArr);
        }
        return weekArr;
    };
    return DateRange;
})();
exports.DateRange = DateRange;

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require('./DateUtils'));

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require("./components/components"));
__export(require("./directives/directives"));
__export(require("./pipes/pipes"));
__export(require('./utilities/utilities'));

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var angular2_1 = require('angular2/angular2');
var angular2_2 = require('angular2/angular2');
var DatePickerCalendar_1 = require('./DatePickerCalendar');
var DatePickerOld = (function () {
    function DatePickerOld(modal) {
        this.valueChange = new angular2_1.EventEmitter();
        this._inputDate = "";
        this._minDate = new Date(1900, 0, 1);
        this._maxDate = new Date(2200, 0, 1);
        this.months = 1;
        this.calendars = [];
        this.currentDate = new Date();
        this.calendarDisplayed = false;
        this.modal = modal.nativeElement;
    }
    Object.defineProperty(DatePickerOld.prototype, "value", {
        set: function (value) {
            if (value instanceof Date && !isNaN(value.valueOf()))
                this.selectedDate = value;
            else
                this.selectedDate = new Date(value);
        },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(DatePickerOld.prototype, "selectedDate", {
        get: function () { return this._selectedDate; },
        set: function (value) {
            this._selectedDate = value;
            this._inputDate = value.toLocaleDateString();
            this.valueChange.next(this.selectedDate);
        },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(DatePickerOld.prototype, "inputDate", {
        get: function () { return this._inputDate; },
        set: function (value) {
            this._inputDate = value;
            this._selectedDate = new Date(value);
        },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(DatePickerOld.prototype, "minDate", {
        get: function () { return this._minDate; },
        set: function (value) {
            if (value instanceof Date && !isNaN(value.valueOf()))
                this._minDate = value;
            else
                this._minDate = new Date(value);
        },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(DatePickerOld.prototype, "maxDate", {
        get: function () { return this._maxDate; },
        set: function (value) {
            if (value instanceof Date && !isNaN(value.valueOf()))
                this._maxDate = value;
            else
                this._maxDate = new Date(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DatePickerOld.prototype, "monthList", {
        get: function () {
            var monthList = [];
            for (var i = 0; i < this.months; i++) {
                monthList.push(new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + i));
            }
            return monthList;
        },
        enumerable: true,
        configurable: true
    });
    DatePickerOld.prototype.onInit = function () {
        if (this.currentDate < this._minDate)
            this.currentDate = this._minDate;
    };
    DatePickerOld.prototype.afterViewInit = function () {
        var _this = this;
        this.calendarQuery.changes.toRx()
            .subscribe(function () {
            _this.calendars = [];
            _this.calendarQuery.map(function (c) { return _this.calendars.push(c); });
        });
        this.modal.addEventListener('click', function (e) {
            if (e.srcElement.className.indexOf('modal') != -1)
                _this.hideCalendar();
        });
    };
    DatePickerOld.prototype.onChanges = function (changes) {
        this.hideCalendar();
    };
    DatePickerOld.prototype.showCalendar = function () {
        console.log("showCalendar");
        if (this.selectedDate instanceof Date && !isNaN(this.selectedDate.valueOf()))
            this.currentDate = this.selectedDate;
        this.calendarDisplayed = true;
    };
    DatePickerOld.prototype.hideCalendar = function () {
        this.calendarDisplayed = false;
    };
    DatePickerOld.prototype.canPrevMonth = function () {
        var prevDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() - 1);
        var compareDate = new Date(this._minDate.getFullYear(), this._minDate.getMonth());
        return prevDate >= compareDate;
    };
    DatePickerOld.prototype.prevMonth = function () {
        if (!this.canPrevMonth())
            return;
        var prevDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() - 1);
        this.currentDate = prevDate;
    };
    DatePickerOld.prototype.canNextMonth = function () {
        var nextDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + 1);
        var compareDate = new Date(this._maxDate.getFullYear(), this._maxDate.getMonth() - 1);
        return nextDate <= compareDate;
    };
    DatePickerOld.prototype.nextMonth = function () {
        if (!this.canNextMonth())
            return;
        var nextDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + 1);
        this.currentDate = nextDate;
    };
    __decorate([
        angular2_1.Output(), 
        __metadata('design:type', Object)
    ], DatePickerOld.prototype, "valueChange");
    Object.defineProperty(DatePickerOld.prototype, "value",
        __decorate([
            angular2_1.Input(), 
            __metadata('design:type', Object), 
            __metadata('design:paramtypes', [Object])
        ], DatePickerOld.prototype, "value", Object.getOwnPropertyDescriptor(DatePickerOld.prototype, "value")));
    __decorate([
        angular2_1.Input(), 
        __metadata('design:type', Number)
    ], DatePickerOld.prototype, "months");
    __decorate([
        angular2_2.ViewChildren(DatePickerCalendar_1.DatePickerCalendar), 
        __metadata('design:type', angular2_2.QueryList)
    ], DatePickerOld.prototype, "calendarQuery");
    DatePickerOld = __decorate([
        angular2_1.Component({
            selector: 'date-picker-old',
            properties: ['minDate: minDate', 'maxDate: maxDate']
        }),
        angular2_1.View({
            styles: ["\n   .modal {\n     display: block; }\n\n   .modal-zoom-in {\n     -webkit-animation: zoomInDown 0.5s ease;\n     -moz-animation: zoomInDown 0.5s ease;\n     animation: zoomInDown 0.5s ease; }\n\n   .modal-zoom-out {\n     -webkit-animation: zoomOutUp 0.5s ease;\n     -moz-animation: zoomOutUp 0.5s ease;\n     animation: zoomOutUp 0.5s ease; }\n\n   .modal-dialog {\n     display: inline-block; }\n\n   date-picker-calendar {\n     padding: 0; }\n\n   .input-group-addon {\n     background-color: #fff;\n     border-left: none; }\n\n   header {\n     position: relative;\n     top: 0;\n     left: 0; }\n\n   .prev-month, .next-month {\n     position: absolute;\n     top: 0;\n     margin-top: .5em;\n     display: inline-block; }\n\n   .prev-month {\n     left: 0;\n     margin-left: 1.5%; }\n\n   .next-month {\n     right: 0;\n     margin-right: 1.5%; }\n\t"],
            template: "\n\n   <div class=\"input-group\" (click)=\"showCalendar()\">\n   \t<input type=\"text\" class=\"form-control\"\n   \t\t[(ng-model)]=\"inputDate\" \n   \t\t #date-field\n   \t\t />\n   \t<span class=\"input-group-addon\" [class.input-group-addon-focus]=\"dateField.focus\">\n   \t\t<i class=\"fa fa-calendar\"></i>\n   \t</span>\n   </div>\n\n   <div class=\"modal\" *ng-if=\"calendarDisplayed\"\n   \t[class.modal-zoom-in]=\"calendarDisplayed\"\n   \t[class.modal-zoom-out]=\"!calendarDisplayed\">\n   \t<div class=\"modal-dialog\">\n   <section class=\"modal-content container m-a\">\n   \t<header class=\"row\">\n   \t\t<time *ng-for=\"#month of monthList\" \n   \t\t\tclass=\"col-xs-{{12/months}} text-center p-y\">\n   \t\t\t<h5>{{month | date:'MMMM yyyy'}}</h5>\n   \t\t</time>\n   \t\t<div class=\"prev-month\">\n   \t\t\t<button class=\"btn btn-primary\" role=\"prev\"\n   \t\t\t\t[class.disabled]=\"!canPrevMonth()\"\t\t\t \n   \t\t\t\t(click)=\"prevMonth()\">\n   \t\t\t\t<i class=\"fa fa-chevron-circle-left\"></i>\n   \t\t\t</button>\n   \t\t</div>\n   \t\t<div class=\"next-month\">\n   \t\t\t<button class=\"btn btn-primary\" role=\"next\"\n   \t\t\t\t[class.disabled]=\"!canNextMonth()\"\n   \t\t\t\t(click)=\"nextMonth()\">\n   \t\t\t\t<i class=\"fa fa-chevron-circle-right\"></i>\n   \t\t\t</button>\n   \t\t</div>\n   \t</header>\n   \t<section class=\"row\">\n   \t\t<date-picker-calendar *ng-for=\"#month of monthList\"\n   \t\t\tclass=\"col-md-{{12/months}}\" \n   \t\t\t[min-date]=\"minDate\" [max-date]=\"maxDate\"\n   \t\t\t[current-month]=\"month\" \n   \t\t\t[(selected-date)]=\"selectedDate\" />\n   \t</section>\n   \t<footer>\n   \t</footer>\n   </section>\n   \t</div>\n   </div>\n\t",
            directives: [DatePickerCalendar_1.DatePickerCalendar, angular2_1.FORM_DIRECTIVES, angular2_1.CORE_DIRECTIVES]
        }), 
        __metadata('design:paramtypes', [angular2_1.ElementRef])
    ], DatePickerOld);
    return DatePickerOld;
})();
exports.DatePickerOld = DatePickerOld;

var DatePickerCalendar_1 = require('./DatePickerCalendar');
exports.DatePickerCalendar = DatePickerCalendar_1.DatePickerCalendar;
//export * from './DatePickerOld';
var DatePicker_1 = require('./DatePicker');
exports.DatePicker = DatePicker_1.DatePicker;
var DatePickerCalendar_2 = require('./DatePickerCalendar');
var DatePicker_2 = require('./DatePicker');
exports.DATE_PICKER_PROVIDERS = [
    DatePickerCalendar_2.DatePickerCalendar,
    DatePicker_2.DatePicker
];

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var angular2_1 = require('angular2/angular2');
var angular2_2 = require('angular2/angular2');
var DateRangePicker = (function () {
    function DateRangePicker() {
        this.startDateChange = new angular2_2.EventEmitter();
    }
    __decorate([
        angular2_2.Output(), 
        __metadata('design:type', Object)
    ], DateRangePicker.prototype, "startDateChange");
    DateRangePicker = __decorate([
        angular2_1.Component({
            selector: 'date-range-picker'
        }),
        angular2_1.View({
            styles: ["\n\n\t"],
            template: "\n\n\t",
            directives: []
        }), 
        __metadata('design:paramtypes', [])
    ], DateRangePicker);
    return DateRangePicker;
})();
exports.DateRangePicker = DateRangePicker;