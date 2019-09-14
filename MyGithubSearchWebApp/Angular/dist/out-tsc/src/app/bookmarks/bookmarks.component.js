import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { ApiService } from '../api.service';
var BookmarksComponent = /** @class */ (function () {
    function BookmarksComponent(apiService) {
        this.apiService = apiService;
        this.githubRepos = [];
    }
    BookmarksComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.apiService.getBookmakrsGithubRepos().subscribe(function (result) {
            _this.githubRepos = result;
        });
    };
    BookmarksComponent = tslib_1.__decorate([
        Component({
            selector: 'app-bookmarks',
            templateUrl: './bookmarks.component.html',
            styleUrls: ['./bookmarks.component.scss']
        }),
        tslib_1.__metadata("design:paramtypes", [ApiService])
    ], BookmarksComponent);
    return BookmarksComponent;
}());
export { BookmarksComponent };
//# sourceMappingURL=bookmarks.component.js.map