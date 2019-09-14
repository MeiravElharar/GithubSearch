import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GithubRepo } from './GithubRepo';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpClient: HttpClient) { }

  getGithubRepo(searchKeyword: string) {
    return this.httpClient.get<GithubRepo[]>(`GithubRepo/Search?searchKeyword=${searchKeyword}`);
  }

  bookmarkGithubRepo(githubRepo: GithubRepo) {
    return this.httpClient.post(`GithubRepo/bookmark`, githubRepo);
  }

  getBookmakrsGithubRepos() {
    return this.httpClient.get<GithubRepo[]>(`GithubRepo/bookmarks`);
  }
}
