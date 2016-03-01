import {ALERT_PROVIDERS, Alert} from "./Alert/Alert";
import {CAROUSEL_PROVIDERS, Carousel, CarouselItem} from "./Carousel/Carousel";
import {DATE_PICKER_PROVIDERS, DatePickerCalendar, DatePicker, DateRangePicker} from "./DatePicker/DatePickerProviders";
import {MODAL_PROVIDERS, Modal} from "./Modal/Modal";
import {PAGINATION_PROVIDERS, Pagination} from "./Pagination/Pagination";
import {INFINITE_SCROLLER_PROVIDERS, InfiniteScroller, ScrollItem} from "./InfiniteScroller/InfiniteScroller";

export var FUELUI_COMPONENT_PROVIDERS = [
	ALERT_PROVIDERS,
	CAROUSEL_PROVIDERS,
	DATE_PICKER_PROVIDERS,
	MODAL_PROVIDERS,
	PAGINATION_PROVIDERS,
	INFINITE_SCROLLER_PROVIDERS
];

export * from "./Alert/Alert";
export * from "./Carousel/Carousel";
export * from "./DatePicker/DatePickerProviders";
export * from "./Modal/Modal";
export * from "./Pagination/Pagination";
export * from "./InfiniteScroller/InfiniteScroller";