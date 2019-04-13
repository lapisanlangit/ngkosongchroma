import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../shared/base/base.component';
import { Router } from '@angular/router';
import { Pesan } from '../../shared/pesan/pesan';
import { HttpClient } from '@angular/common/http';
declare var jQuery: any;


@Component({
    selector: 'app-upload', // moduleId: module.id,
    templateUrl: './upload.component.html',

})

export class UploadComponent extends BaseComponent implements OnInit {

    selectedFile: File;
    p: number = 1;
    //isikan untuk pesan
    setPesan: Pesan;

    constructor(private router: Router, private http: HttpClient) {
        super();
    }

    ngOnInit(): void {

    }

    onFileChanged(event) {
        this.selectedFile = event.target.files[0]
        console.log(this.selectedFile)
    }

    onUpload() {
        const uploadData = new FormData();
        uploadData.append('file', this.selectedFile, this.selectedFile.name);
        this.http.post('http://localhost:4000/rupload/uploadFile', uploadData)
            .subscribe(result => {
                console.log(result)
            });

    }




}