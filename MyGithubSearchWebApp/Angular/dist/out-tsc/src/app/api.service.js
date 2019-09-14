import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
var ApiService = /** @class */ (function () {
    function ApiService(httpClient) {
        this.httpClient = httpClient;
    }
    ApiService.prototype.getGithubRepo = function (searchKeyword) {
        return this.httpClient.get("GithubRepo/Search?searchKeyword=" + searchKeyword);
    };
    ApiService.prototype.bookmarkGithubRepo = function (githubRepo) {
        return this.httpClient.post("GithubRepo/bookmark", githubRepo);
    };
    ApiService.prototype.getBookmakrsGithubRepos = function () {
        return this.httpClient.get("GithubRepo/bookmarks");
    };
    ApiService = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        }),
        tslib_1.__metadata("design:paramtypes", [HttpClient])
    ], ApiService);
    return ApiService;
}());
export { ApiService };
//# sourceMappingURL=api.service.js.map