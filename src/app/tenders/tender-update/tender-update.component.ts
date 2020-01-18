import {Component, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {TenderInterface} from '../../core/models/tender.model';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {TenderService} from '../tender.service';
import {ToastrService} from 'ngx-toastr';

@Component({
    selector: 'app-tender-update',
    templateUrl: './tender-update.component.html',
})

export class TenderUpdateComponent {
    @Input() tender: TenderInterface;
    @Input() tenders: TenderInterface[];
    @ViewChild('frame', {static: true}) private frame;
    validatingForm: FormGroup;
    @Output() tenderUpdate = new EventEmitter<TenderInterface[]>();

    constructor(
        private tenderService: TenderService,
        private toastrService: ToastrService
    ) {
        this.tender = this.tenderService.newObject();
    }

    ngOnInit(): void {
        this.validatingForm = new FormGroup({
            formTitle: new FormControl(this.tender.title, Validators.required),
            formDescription: new FormControl(this.tender.description, Validators.required)
        });
    }

    get formTitle() {
        return this.validatingForm.get('formTitle');
    }

    get formDescription() {
        return this.validatingForm.get('formDescription');
    }

    setFormTitle() {
        if (this.tender.title !== this.formTitle.value) {
            this.tender.title = this.formTitle.value;
        }
    }

    setFormDescription() {
        if (this.tender.description !== this.formDescription.value) {
            this.tender.description = this.formDescription.value;
        }
    }

    setFormValues() {
        this.setFormDescription();
        this.setFormTitle();
    }

    submit() {
        this.setFormValues();
        if (this.tender.id) {
            this.tenderService.update(this.tender).subscribe((data) => {
                this.toastrService.success('Tender updated successfully!');
                this.frame.hide();
                this.tender.updatedAtTimestamp = data.data.updatedAtTimestamp;
            }, err => {
                this.toastrService.error('Something went wrong');
            });
        } else {
            this.tenderService.create(this.tender).subscribe((data) => {
                this.toastrService.success('Tender created successfully!');
                this.frame.hide();
                this.tender.id = data.data.id;
                this.tender.createdAtTimestamp = data.data.createdAtTimestamp;
                this.tender.updatedAtTimestamp = data.data.updatedAtTimestamp;
                this.tenders = [this.tender].concat(this.tenders);
                this.tenderUpdate.emit(this.tenders);
                this.tender = this.tenderService.newObject();
            }, err => {
                this.toastrService.error('Something went wrong');
            });
        }
    }
}
