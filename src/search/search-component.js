System.register(['@angular/core', '@angular/http', 'tiny-ng-store/tiny-ng-store', 'rxjs/add/operator/map', 'rxjs/add/operator/take', 'rxjs/add/operator/reduce', './search-count', '../const/store-names', '../followers/followers-component', '../pipes/display-user-prop.pipe', '../const/store-helpers'], function(exports_1, context_1) {
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
    var core_1, http_1, tiny_ng_store_1, search_count_1, store_names_1, followers_component_1, display_user_prop_pipe_1, store_helpers_1;
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
            },
            function (store_names_1_1) {
                store_names_1 = store_names_1_1;
            },
            function (followers_component_1_1) {
                followers_component_1 = followers_component_1_1;
            },
            function (display_user_prop_pipe_1_1) {
                display_user_prop_pipe_1 = display_user_prop_pipe_1_1;
            },
            function (store_helpers_1_1) {
                store_helpers_1 = store_helpers_1_1;
            }],
        execute: function() {
            SearchComponent = (function () {
                function SearchComponent(http, tinyStore, storeHelpers) {
                    this.http = http;
                    this.tinyStore = tinyStore;
                    this.storeHelpers = storeHelpers;
                    this.displayFollowers = 'false';
                    this.displaySearch = 'true';
                    this.displayUser = false;
                }
                SearchComponent.prototype.Search = function (username) {
                    var _this = this;
                    this.http.get('https://api.github.com/users/' + username)
                        .subscribe(function (res) {
                        _this.storeHelpers.SetStore(res.json(), store_names_1.CURRENTUSERSTORENAME);
                        _this.displayUser = true;
                        _this.user.take(1).subscribe(function (s) { return _this.followersUrl = s.followers_url; });
                        _this.updateNumberStore(store_names_1.SUCCESSSTORENAME, search_count_1.INCREMENT, _this.successObs);
                    }, function (err) {
                        console.error(err.json().message);
                        _this.displayUser = false;
                        _this.updateNumberStore(store_names_1.FAILSTORENAME, search_count_1.INCREMENT, _this.failObs);
                    });
                };
                SearchComponent.prototype.Reset = function () {
                    // these are setting each store to 0 again
                    this.storeHelpers.SetStore(0, store_names_1.FAILSTORENAME);
                    this.storeHelpers.SetStore(0, store_names_1.SUCCESSSTORENAME);
                };
                SearchComponent.prototype.ngOnInit = function () {
                    // create two stores to track the fails or successes of a search
                    this.failObs = this.storeHelpers.StoreFactory(store_names_1.FAILSTORENAME, 0);
                    this.successObs = this.storeHelpers.StoreFactory(store_names_1.SUCCESSSTORENAME, 0);
                    this.user = this.storeHelpers.StoreFactory(store_names_1.CURRENTUSERSTORENAME, {});
                };
                // this funciton takes an observable, applies a transforming function to the data (searchCount in this case),
                // and updates the store with the new data
                SearchComponent.prototype.updateNumberStore = function (storeName, action, obs) {
                    var _this = this;
                    obs
                        .take(1)
                        .map(function (s) { return search_count_1.searchCount(s, action); })
                        .subscribe(function (num) {
                        _this.storeHelpers.SetStore(num, storeName);
                    });
                };
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', String)
                ], SearchComponent.prototype, "displayFollowers", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', String)
                ], SearchComponent.prototype, "displaySearch", void 0);
                SearchComponent = __decorate([
                    core_1.Component({
                        directives: [followers_component_1.Followers],
                        pipes: [display_user_prop_pipe_1.DisplayUserPropPipe],
                        providers: [],
                        selector: 'gh-search',
                        templateUrl: 'src/search/search-component.html',
                    }), 
                    __metadata('design:paramtypes', [http_1.Http, tiny_ng_store_1.TinyNgStore, store_helpers_1.StoreHelpers])
                ], SearchComponent);
                return SearchComponent;
            }());
            exports_1("SearchComponent", SearchComponent);
        }
    }
});
//# sourceMappingURL=search-component.js.map