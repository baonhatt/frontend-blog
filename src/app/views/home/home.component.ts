import { AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { Blog } from '../../model/blog.model';
import { City } from 'src/app/model/city.model';
import { Movie } from 'src/app/model/movie.model';
import { ServicesService } from 'src/app/shared/services.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  inputString: string = 'Hello';
  searchResult: Movie[] = [];
  DisplayMovie: Movie[] = [];
  name: any = '';
  car = ["Ferrari", "Lamborghini", "Koenigsegg"];
  city: City[] = [];
  selectedCity: any;
  blog: Blog[] = [];
  constructor(private service: ServicesService) {

  }


  ngOnInit(): void {



    this.service.getmovie().subscribe(res => {
      this.searchResult = res
      this.DisplayMovie = this.searchResult;
    })

    this.service.getCity().subscribe(res => {
      this.city = res;

      this.selectedCity = this.city[0]
    })





  }

  reverse(inputString: string) {
    this.inputString = inputString.split('').reverse().join('');
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
