import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-bookmarks',
  templateUrl: './bookmarks.component.html',
  styleUrls: ['./bookmarks.component.scss']
})
export class BookmarksComponent implements OnInit {

  githubRepos = []

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.apiService.getBookmakrsGithubRepos().subscribe(result => {
      this.githubRepos = result
    })
  }

}
