import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Blog } from 'src/app/model/blog.model';
import { ServicesService } from 'src/app/shared/services.service';

@Component({
  selector: 'app-blog-detail',
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.scss']
})
export class BlogDetailComponent implements OnInit{

  blog!: Blog;



  constructor(
    private apiService: ServicesService,
    private route: ActivatedRoute
  ){

  }
  ngOnInit(): void {

    this.route.params.subscribe( params =>{
      const id = params['id'];
      this.apiService.getBlogDetail(id).subscribe( (res: any) =>{
        this.blog = res
      });
    })
  }

}
