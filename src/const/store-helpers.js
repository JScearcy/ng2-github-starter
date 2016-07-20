System.register(['@angular/core', 'tiny-ng-store/tiny-ng-store', 'rxjs/add/operator/map'], function(exports_1, context_1) {
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
    var core_1, tiny_ng_store_1;
    var StoreHelpers;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (tiny_ng_store_1_1) {
                tiny_ng_store_1 = tiny_ng_store_1_1;
            },
            function (_1) {}],
        execute: function() {
            StoreHelpers = (function () {
                function StoreHelpers(tinyStore) {
                    this.tinyStore = tinyStore;
                }
                ;
                StoreHelpers.prototype.SetStore = function (val, storeName) {
                    this.tinyStore.UpdateItem({ data: val, name: storeName });
                };
                // this function will create a new StoreItem, then map the observable returned to utilize only the needed data
                StoreHelpers.prototype.StoreFactory = function (storeName, initState) {
                    return this.tinyStore
                        .InsertItem({ data: initState, name: storeName })
                        .map(function (s) { return s && s.data; });
                };
                StoreHelpers.prototype.GetStoreData = function (storeName) {
                    return this.tinyStore
                        .GetItem(storeName)
                        .map(function (s) { return s && s.data; });
                };
                StoreHelpers = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [tiny_ng_store_1.TinyNgStore])
                ], StoreHelpers);
                return StoreHelpers;
            }());
            exports_1("StoreHelpers", StoreHelpers);
        }
    }
});
//# sourceMappingURL=store-helpers.js.map