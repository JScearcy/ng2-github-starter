System.register(['@angular/core', '@angular/http', '../const/store-helpers', '../const/store-names'], function(exports_1, context_1) {
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
    var core_1, http_1, store_helpers_1, store_names_1;
    var Followers;
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
            }],
        execute: function() {
            Followers = (function () {
                function Followers(http, storeHelpers) {
                    this.http = http;
                    this.storeHelpers = storeHelpers;
                    this.width = '100%';
                }
                Object.defineProperty(Followers.prototype, "followersUrl", {
                    get: function () {
                        return this._followersUrl;
                    },
                    set: function (followersUrl) {
                        this._followersUrl = followersUrl;
                        this.GetFollowers(this._followersUrl);
                    },
                    enumerable: true,
                    configurable: true
                });
                ;
                Followers.prototype.GetFollowers = function (followersUrl) {
                    var _this = this;
                    this.storeHelpers.SetStore([], store_names_1.FOLLOWERSSTORENAME);
                    this.http.get(followersUrl)
                        .subscribe(function (res) {
                        _this.storeHelpers.SetStore(res.json(), store_names_1.FOLLOWERSSTORENAME);
                    }, function (err) {
                        console.log(err.json().message);
                    });
                };
                Followers.prototype.ngOnInit = function () {
                    // create a store for the list of followers for the current user
                    this.followers = this.storeHelpers.StoreFactory(store_names_1.FOLLOWERSSTORENAME, []);
                };
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', String), 
                    __metadata('design:paramtypes', [String])
                ], Followers.prototype, "followersUrl", null);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', String)
                ], Followers.prototype, "width", void 0);
                Followers = __decorate([
                    core_1.Component({
                        directives: [],
                        providers: [],
                        selector: 'gh-followers',
                        styleUrls: ['src/followers/followers-component.css'],
                        templateUrl: 'src/followers/followers-component.html',
                    }), 
                    __metadata('design:paramtypes', [http_1.Http, store_helpers_1.StoreHelpers])
                ], Followers);
                return Followers;
            }());
            exports_1("Followers", Followers);
        }
    }
});
//# sourceMappingURL=followers-component.js.map