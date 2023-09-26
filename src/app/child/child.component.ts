import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import { Calendar } from '@fullcalendar/core';
import { Emitter } from '@fullcalendar/core/internal';
import { ServicesService } from '../shared/services.service';
import { Blog } from '../model/blog.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';
@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.scss']
})
export class ChildComponent implements OnInit {
  blog: Blog[] = [];
  form!: FormGroup;
  private blogsSubject = new BehaviorSubject<Blog[]>([]);
  constructor(private service: ServicesService, private fb: FormBuilder) {
    this.form = this.fb.group({
      title: [''],
      content: [''],
      postDate: ['']
    })
  }
  @Output() sendData = new EventEmitter<string>();
  text!: string;
  send() {

    const data = 'Bin dep trai day nha!';
    this.sendData.emit(data);
    this.text = Math.random().toString(36).slice(2);
  }


  ngOnInit(): void {
    this.service.getblog().subscribe(res => {
      this.blog = res


    }

    )
  }
  getall() {
    this.service.getblog().subscribe(res => {
      this.blog = res


    })

  }

  postBlog(form: FormGroup) {
    // const requestData = {
    //   title: form.controls['title'].value,
    //   content: form.controls['content'].value,
    //   postDate: form.controls['postDate'].value,
    // }

    return this.service.createBlog(form.value).subscribe((res) => {
      console.log(res);
      this.blog.push(res as Blog)

    }, err => {
      console.log(err);

    })
  }

  delete(id: string) {
    console.log(id);

    this.service.deleteBlog(id).subscribe(res => {
      this.getall()
    }, err => {
      alert(err.message)
    })
  }
  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin],

  };
}

// Instantiate your component or class

