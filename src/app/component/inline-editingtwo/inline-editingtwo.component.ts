import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-inline-editingtwo',
  templateUrl: './inline-editingtwo.component.html',
  styleUrls: ['./inline-editingtwo.component.css']
})

export class InlineEditingtwoComponent implements OnInit {

  items: Item[] = [
    {
      "id": 1,
      "name": "Leanne Graham",
      "itemname": "Bret",
      "email": "Sincere@april.biz",
      "phone": "1-770-736-8031 x56442",
      "website": "hildegard.org",
      "editFieldName": ''
    },
    {
      "id": 2,
      "name": "Ervin Howell",
      "itemname": "Antonette",
      "email": "Shanna@melissa.tv",
      "phone": "010-692-6593 x09125",
      "website": "anastasia.net", 
      "editFieldName": ''
    },
    {
      "id": 3,
      "name": "Clementine Bauch",
      "itemname": "Samantha",
      "email": "Nathan@yesenia.net",
      "phone": "1-463-123-4447",
      "website": "ramiro.info",
      "editFieldName": ''
    },
    {
      "id": 4,
      "name": "Patricia Lebsack",
      "itemname": "Karianne",
      "email": "Julianne.OConner@kory.org",
      "phone": "493-170-9623 x156",
      "website": "kale.biz",
      "editFieldName": ''
    },
    {
      "id": 5,
      "name": "Chelsey Dietrich",
      "itemname": "Kamren",
      "email": "Lucio_Hettinger@annie.ca",
      "phone": "(254)954-1289",
      "website": "demarco.info",
      "editFieldName": ''
    },
    {
      "id": 6,
      "name": "Mrs. Dennis Schulist",
      "itemname": "Leopoldo_Corkery",
      "email": "Karley_Dach@jasper.info",
      "phone": "1-477-935-8478 x6430",
      "website": "ola.org",
      "editFieldName": ''
    },
    {
      "id": 7,
      "name": "Kurtis Weissnat",
      "itemname": "Elwyn.Skiles",
      "email": "Telly.Hoeger@billy.biz",
      "phone": "210.067.6132",
      "website": "elvis.io",
      "editFieldName": ''
    },
    {
      "id": 8,
      "name": "Nicholas Runolfsdottir V",
      "itemname": "Maxime_Nienow",
      "email": "Sherwood@rosamond.me",
      "phone": "586.493.6943 x140",
      "website": "jacynthe.com",
      "editFieldName": ''
    },
    {
      "id": 9,
      "name": "Glenna Reichert",
      "itemname": "Delphine",
      "email": "Chaim_McDermott@dana.io",
      "phone": "(775)976-6794 x41206",
      "website": "conrad.com",
      "editFieldName": ''
    },
    {
      "id": 10,
      "name": "Clementina DuBuque",
      "itemname": "Moriah.Stanton",
      "email": "Rey.Padberg@karina.biz",
      "phone": "024-648-3804",
      "website": "ambrose.net",
      "editFieldName": ''
    }
  ]

  constructor() {
  }


 // export interface item {
 //  [index: string]: string;
 //  }

  tColumns: string[] = Object.keys(this.items[0]);


  ngOnInit(): void {
  }
  onEdit(item: any,field: string) {
    debugger; 
    item.editFieldName = field;
  }
  close(item: any) {
    item.editFieldName = '';
  }
}

export interface Item {
  [key: string]: unknown;
  id: number;
  itemname: string;
  name: string;
  email: string;
  phone: string;
  website: string;
  editFieldName: string;
}