import { Component, OnInit } from '@angular/core';
import { ApiService } from './api.service';
import { GithubRepo } from './GithubRepo';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Github Search';
  searchKeyword = ""
  githubRepos = []

  constructor(private apiService: ApiService) { }

  handleSearch() {
    this.apiService.getGithubRepo(this.searchKeyword).subscribe((response) => {
      this.githubRepos = response
    })
  }

  bookmarkGithubRepo(githubRepo: GithubRepo) {
    this.apiService.bookmarkGithubRepo(githubRepo).subscribe(response => {
      alert("bookmark succeded!")
    },
    error => alert(error.message))
  }

  ngOnInit() {
  }
}
