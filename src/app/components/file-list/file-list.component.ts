import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Storage, ref, listAll, getDownloadURL } from '@angular/fire/storage';


@Component({
  selector: 'app-file-list',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './file-list.component.html',
  styleUrl: './file-list.component.scss'
})
export class FileListComponent implements OnInit {
  files: { name: string, url: string }[] = [];

  constructor(private storage: Storage) {}

  ngOnInit() {
    this.listFiles();
  }

  listFiles() {
    const storageRef = ref(this.storage, 'uploads/'); // Змініть 'some-folder/' на ім'я вашої папки
    listAll(storageRef)
      .then(async result => {
        for (const item of result.items) {
          const url = await getDownloadURL(item);
          this.files.push({
            name: item.name,
            url: url
          });
        }
      })
      .catch(error => {
        console.error('Error fetching files', error);
      });
  }
}
