System.register(['@angular/core', '@angular/http', '../const/store-helpers', '../const/store-names', 'ng-lightning/ng-lightning'], function(exports_1, context_1) {
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
    var core_1, http_1, store_helpers_1, store_names_1, ng_lightning_1;
    var Following;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (store_helpers_1_1) {
                store_helpers_1 = store_helpers_1_1;
            },
            function (store_names_1_1) {
                store_names_1 = store_names_1_1;
            },
            function (ng_lightning_1_1) {
                ng_lightning_1 = ng_lightning_1_1;
            }],
        execute: function() {
            Following = (function () {
                function Following(http, storeHelpers) {
                    this.http = http;
                    this.storeHelpers = storeHelpers;
                }
                Object.defineProperty(Following.prototype, "followingUrl", {
                    set: function (followingUrl) {
                        this._followingUrl = followingUrl;
                        this.GetFollowing(this._followingUrl);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Following.prototype, "followersUrl", {
                    get: function () {
                        return this._followingUrl;
                    },
                    enumerable: true,
                    configurable: true
                });
                ;
                Following.prototype.GetFollowing = function (followingUrl) {
                    var _this = this;
                    this.storeHelpers.SetStore([], store_names_1.FOLLOWINGSTORENAME);
                    this.http.get(followingUrl)
                        .subscribe(function (res) {
                        _this.storeHelpers.SetStore(res.json(), store_names_1.FOLLOWINGSTORENAME);
                    }, function (err) {
                        console.log(err.json().message);
                    });
                };
                Following.prototype.ngOnInit = function () {
                    // create a store for the list of followers for the current user
                    this.following = this.storeHelpers.StoreFactory(store_names_1.FOLLOWINGSTORENAME, []);
                };
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', String), 
                    __metadata('design:paramtypes', [String])
                ], Following.prototype, "followingUrl", null);
                Following = __decorate([
                    core_1.Component({
                        directives: [ng_lightning_1.NGL_DIRECTIVES],
                        providers: [],
                        selector: 'gh-following',
                        styleUrls: ['src/following/following-component.css'],
                        templateUrl: 'src/following/following-component.html',
                    }), 
                    __metadata('design:paramtypes', [http_1.Http, store_helpers_1.StoreHelpers])
                ], Following);
                return Following;
            }());
            exports_1("Following", Following);
        }
    }
});
//# sourceMappingURL=following-component.js.map