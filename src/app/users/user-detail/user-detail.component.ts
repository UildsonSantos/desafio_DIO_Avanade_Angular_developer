import { UserService } from './../../core/user.service';
import { User } from './../../shared/models/user';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'uss-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {

  user: User | undefined;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private location: Location,

  ) { }

  ngOnInit(): void {
    this.getUserById();
  }

  getUserById(): void {
    const id =  parseInt(this.route.snapshot.paramMap.get('id'));
    console.log("meu iid:");
    console.log(id);

    console.log(this.user);
    this.userService.getUser(id)
    .subscribe(user => this.user = user);
    console.log(this.user);
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    if (this.user) {
      this.userService.salvar(this.user)
        .subscribe(() => this.goBack());
    }
  }

}

