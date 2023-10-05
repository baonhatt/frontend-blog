import { AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { Blog } from '../../model/blog.model';
import { City } from 'src/app/model/city.model';
import { Movie } from 'src/app/model/movie.model';
import { ServicesService } from 'src/app/shared/services.service';
import { AppComponent } from 'src/app/app.component';
import { formatDistanceToNow } from 'date-fns';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  formattedCreatedAt: any[] = [];
  searchResult: Movie[] = [];
  DisplayMovie: Movie[] = [];
  name: any = '';
  i: any;
  city: City[] = [];
  selectedCity: any;
  blog: Blog[] = [];
  comment!: any;
  commentForm!: FormGroup;
  constructor(private service: ServicesService, private aComponent: AppComponent, private fb: FormBuilder) {
    this.commentForm = this.fb.group({
      user: [''],
      text: [''],
    })
  }


  ngOnInit(): void {


    this.service.getblog().subscribe( (res) =>{
      this.blog = res;


      this.blog.sort((a, b) => {
        const dateA = new Date(a.createdAt);
        const dateB = new Date(b.createdAt);
        return dateB.getTime() - dateA.getTime();
      });
      this.formattedCreatedAt = this.blog.map( post =>{
        return {
          ...post,
          formattedTime: this.formatInstagramTimestamp(post.createdAt)
        }
      });
    })





  }
  async getPostId(id: string){
    await this.service.getBlogDetail(id).subscribe(res =>{
      console.log(res);

    })
    return
  }
  commentPost(blogId: string, commentForm: FormGroup){
    return this.service.comment(blogId, this.commentForm.value).subscribe( (res: any) =>{
    })
  }

  formatInstagramTimestamp(timestamp: Date): string {
    const parsedTimestamp = new Date(timestamp);
    return formatDistanceToNow(parsedTimestamp, { addSuffix: true });
  }



  search(event: any) {

    let filterMovie: Movie[] = []
    if (event === '') {
      this.DisplayMovie = this.searchResult

    } else {
      filterMovie = this.DisplayMovie.filter((val) => {
        let targetKey = val.Title.toLowerCase();
        let searchKey = event.toLowerCase();
        return targetKey.includes(searchKey);
      })
      this.DisplayMovie = filterMovie
    }
  }
}
