System.register(['@angular/core', '@angular/http', '../const/store-helpers', '../const/store-names', '../pipes/description-picker.pipe', 'ng-lightning/ng-lightning'], function(exports_1, context_1) {
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
    var core_1, http_1, store_helpers_1, store_names_1, description_picker_pipe_1, ng_lightning_1;
    var GistsComponent;
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
            function (description_picker_pipe_1_1) {
                description_picker_pipe_1 = description_picker_pipe_1_1;
            },
            function (ng_lightning_1_1) {
                ng_lightning_1 = ng_lightning_1_1;
            }],
        execute: function() {
            GistsComponent = (function () {
                function GistsComponent(http, storeHelpers) {
                    this.http = http;
                    this.storeHelpers = storeHelpers;
                }
                Object.defineProperty(GistsComponent.prototype, "gistsUrl", {
                    set: function (gistsUrl) {
                        this._gistsUrl = gistsUrl;
                        this.GetGists(this._gistsUrl);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(GistsComponent.prototype, "followersUrl", {
                    get: function () {
                        return this._gistsUrl;
                    },
                    enumerable: true,
                    configurable: true
                });
                ;
                GistsComponent.prototype.GetGists = function (gistsUrl) {
                    var _this = this;
                    this.http.get(gistsUrl).subscribe(function (res) {
                        _this.storeHelpers.SetStore(res.json(), store_names_1.GISTSSTORENAME);
                    }, function (err) {
                        console.error(err);
                    });
                };
                GistsComponent.prototype.ngOnInit = function () {
                    this.gists = this.storeHelpers.StoreFactory(store_names_1.GISTSSTORENAME, []);
                };
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', String), 
                    __metadata('design:paramtypes', [String])
                ], GistsComponent.prototype, "gistsUrl", null);
                GistsComponent = __decorate([
                    core_1.Component({
                        directives: [ng_lightning_1.NGL_DIRECTIVES],
                        pipes: [description_picker_pipe_1.DescriptionPickerPipe],
                        selector: 'gh-gists',
                        styleUrls: ['src/gists/gists-component.css'],
                        templateUrl: 'src/gists/gists-component.html',
                    }), 
                    __metadata('design:paramtypes', [http_1.Http, store_helpers_1.StoreHelpers])
                ], GistsComponent);
                return GistsComponent;
            }());
            exports_1("GistsComponent", GistsComponent);
        }
    }
});
//# sourceMappingURL=gists-component.js.map