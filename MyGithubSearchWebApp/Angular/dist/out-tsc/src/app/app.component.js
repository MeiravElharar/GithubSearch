import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { ApiService } from './api.service';
var AppComponent = /** @class */ (function () {
    function AppComponent(apiService) {
        this.apiService = apiService;
        this.title = 'Github Search';
        this.searchKeyword = "";
        this.githubRepos = [];
    }
    AppComponent.prototype.handleSearch = function () {
        var _this = this;
        this.apiService.getGithubRepo(this.searchKeyword).subscribe(function (response) {
            _this.githubRepos = response;
        });
    };
    AppComponent.prototype.bookmarkGithubRepo = function (githubRepo) {
        this.apiService.bookmarkGithubRepo(githubRepo).subscribe(function (response) {
            alert("bookmark succeded!");
        }, function (error) { return alert(error.message); });
    };
    AppComponent.prototype.ngOnInit = function () {
    };
    AppComponent = tslib_1.__decorate([
        Component({
            selector: 'app-root',
            templateUrl: './app.component.html',
            styleUrls: ['./app.component.scss']
        }),
        tslib_1.__metadata("design:paramtypes", [ApiService])
    ], AppComponent);
    return AppComponent;
}());
export { AppComponent };
//# sourceMappingURL=app.component.js.map