import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { FirebaseModule } from './firebase.module';
import { Storage, ref, uploadBytes, getDownloadURL } from '@angular/fire/storage';
import { FileListComponent } from './components/file-list/file-list.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    FirebaseModule,
    FileListComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'storage-test';
  constructor(private storage: Storage) {}

  async uploadFile(event: any) {
    const file = event.target.files[0];
    const filePath = `uploads/${file.name}`;
    const storageRef = ref(this.storage, filePath);
    const uploadTask = await uploadBytes(storageRef, file);

    const downloadURL = await getDownloadURL(storageRef);
    console.log('Download URL:', downloadURL);
  }
}
