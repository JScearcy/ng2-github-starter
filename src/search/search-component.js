System.register(['@angular/core', '@angular/http', 'tiny-ng-store/tiny-ng-store', 'rxjs/add/operator/map', 'rxjs/add/operator/take', 'rxjs/add/operator/reduce', './search-count'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, http_1, tiny_ng_store_1, search_count_1;
    var SearchComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (tiny_ng_store_1_1) {
                tiny_ng_store_1 = tiny_ng_store_1_1;
            },
            function (_1) {},
            function (_2) {},
            function (_3) {},
            function (search_count_1_1) {
                search_count_1 = search_count_1_1;
            }],
        execute: function() {
            SearchComponent = (function () {
                function SearchComponent(http, tinyStore) {
                    this.http = http;
                    this.tinyStore = tinyStore;
                    this.displayUser = false;
                }
                SearchComponent.prototype.Search = function (username) {
                    var _this = this;
                    this.http.get('https://api.github.com/users/' + username)
                        .map(function (res) { return res.json(); })
                        .subscribe(function (user) {
                        _this.user = user;
                        _this.displayUser = true;
                    });
                    // any time the search is performed, increment the store data
                    this.changeStore(search_count_1.INCREMENT);
                };
                Object.defineProperty(SearchComponent.prototype, "SearchCount", {
                    get: function () {
                        // the async pipe can be applied to an observable to subscribe and sync with the current value
                        return this.storeObs;
                    },
                    enumerable: true,
                    configurable: true
                });
                SearchComponent.prototype.changeStore = function (action) {
                    var _this = this;
                    // take latest item, apply the value function, and update the data
                    this.storeObs
                        .take(1)
                        .map(function (s) { return search_count_1.searchCount(s, action); })
                        .subscribe(function (num) {
                        _this.tinyStore.UpdateItem({ data: num, name: 'githubUsers' });
                    });
                };
                SearchComponent.prototype.ngOnInit = function () {
                    // insert a new store item and retrieve it, returning an observable 
                    this.tinyStore.InsertItem({ data: 0, name: 'githubUsers' });
                    // map storeObs to automatically return the pertinent data
                    this.storeObs =
                        this.tinyStore.GetItem('githubUsers')
                            .map(function (s) { return s && s.data; });
                };
                SearchComponent = __decorate([
                    core_1.Component({
                        directives: [],
                        providers: [],
                        selector: 'gh-search',
                        templateUrl: 'src/search/search-component.html',
                    }), 
                    __metadata('design:paramtypes', [http_1.Http, tiny_ng_store_1.TinyNgStore])
                ], SearchComponent);
                return SearchComponent;
            }());
            exports_1("SearchComponent", SearchComponent);
        }
    }
});
//# sourceMappingURL=search-component.js.map