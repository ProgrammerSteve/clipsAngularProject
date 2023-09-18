import { Component, OnInit, OnDestroy, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { ModalService } from 'src/app/services/modal.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ClipService } from 'src/app/services/clip.service';
import IClip from 'src/app/models/clip.model';
@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit, OnDestroy, OnChanges {
  constructor(private modal: ModalService, private clipService: ClipService) { }

  @Output() update = new EventEmitter()


  @Input() activeClip: IClip | null = null
  showAlert = false
  inSubmission = false
  alertColor = "blue"
  alertMsg = "Please wait! Updating clip."

  async submit() {
    if (!this.activeClip) return
    this.inSubmission = true
    this.showAlert = true
    this.alertMsg = "Please wait! Updating clip."
    this.alertColor = "blue"

    try {
      await this.clipService.updateClip(this.clipID.value, this.title.value)
    } catch (err) {
      this.inSubmission = false
      this.alertColor = 'red'
      this.alertMsg = "Something went wrong. Try again later."
      return
    }
    this.activeClip.title = this.title.value
    this.update.emit(this.activeClip)
    this.inSubmission = false
    this.alertColor = 'green'
    this.alertMsg = "Success!"





  }


  clipID = new FormControl('', {
    nonNullable: true
  })
  title = new FormControl('', {
    validators: [
      Validators.required,
      Validators.minLength(3)
    ],
    nonNullable: true
  })

  editForm = new FormGroup({
    title: this.title,
    id: this.clipID
  })



  ngOnInit(): void {
    this.modal.register('editClip')
  }

  ngOnDestroy(): void {
    this.modal.unregister('editClip')
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (!this.activeClip) {
      return
    }
    this.inSubmission = false
    this.showAlert = false
    this.clipID.setValue(this.activeClip.docID as string)
    this.title.setValue(this.activeClip.title)
  }

}
