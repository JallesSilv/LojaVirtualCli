import { Component, OnInit } from '@angular/core';
import { fileToUpload } from 'src/app/models/fileToUpload';
import { UploadService } from 'src/app/servicos/upload/upload.service';

@Component({
  selector: 'app-arquivo-banco',
  templateUrl: './arquivo-banco.component.html',
  styleUrls: ['./arquivo-banco.component.css']
})
export class ArquivoBancoComponent implements OnInit {
  public arquivoBanco : FileList;
  public ativarSpinner : boolean;

  theFile: any = null;
  theFiles: any[] = [];
  public messages : string[] = [];
  
  
  constructor(private uploadService : UploadService) { }
  
  ngOnInit(): void {
  }

  private readAndUploadFile(theFile: any) {
    let file = new fileToUpload();
    
    // Set File Information
    file.fileName = theFile.name;
    file.fileSize = theFile.size;
    file.fileType = theFile.type;
    file.lastModifiedTime = theFile.lastModified;
    file.lastModifiedDate = theFile.lastModifiedDate;    
    
    // Use FileReader() object to get file to upload
    // NOTE: FileReader only works with newer browsers
    let reader = new FileReader();
    
    // Setup onload event for reader
    reader.onload = () => {
        // Store base64 encoded representation of file
        file.fileAsBase64 = reader.result.toString();
        
        // POST to server
        // this.uploadService.enviarArquivo(file).subscribe(resp => { 
        //   this.messages.push("Upload complete"); });
        this.uploadService.uploadFile(file).subscribe(resp => { 
          this.messages.push("Upload complete"); });
    }
    
    // Read the file
    reader.readAsDataURL(theFile);
  }

  onFileChange(event) {
    this.theFiles = [];
    const MAX_SIZE: number = 1048576;
    // Any file(s) selected from the input?
    if (event.target.files && event.target.files.length > 0) {
        for (let index = 0; index < event.target.files.length; index++) {
            let file = event.target.files[index];
            // Don't allow file sizes over 1MB
            if (file.size < MAX_SIZE) {
                // Add file to list of files
                this.theFiles.push(file);
            }
            else {
                this.messages.push("File: " + file.name + " is too large to upload.");
            }
        }
    }
  }
  
  // public inputChange(event:any) {
  //   const MAX_SIZE: number = 1048576;
  //   if (event.target.files && event.target.files.length > 0) {
  //       // Don't allow file sizes over 1MB
  //       if (event.target.files[0].size < MAX_SIZE) {
  //           // Set theFile property
  //           this.arquivoBanco = event.target.files[0];
  //       }
  //       else {
  //           // Display error message
  //           this.messages.push("File: " + event.target.files[0].name + " is too large to upload.");
  //       }
  //   }
  // }

  uploadFile(): void {
    for (let index = 0; index < this.theFiles.length; index++) {
        this.readAndUploadFile(this.theFiles[index]);
    }
}
}