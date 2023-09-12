import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})
export class ManageComponent implements OnInit {


  videoOrder = "1"
  //1 = decending
  //2 = ascending
  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) { }


  sort(event: Event) {
    const { value } = (event.target as HTMLSelectElement)
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        sort: value
      }
    })
  }

  ngOnInit(): void {
    this.route.data.subscribe((params: Params) => {
      this.videoOrder = params['sort'] == '2' ? params['sort'] : 1
    })
  }



}
