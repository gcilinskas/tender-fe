import {Component, EventEmitter, Output, ViewChild} from '@angular/core';
import {TenderInterface} from '../../core/models/tender.model';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {TenderService} from '../tender.service';
import {ToastrService} from 'ngx-toastr';

@Component({
    selector: 'app-tender-create',
    templateUrl: './tender-create.component.html',
})

export class TenderCreateComponent {
    tender: TenderInterface;
    @ViewChild('frame', {static: true}) private frame;
    validatingForm: FormGroup;
    @Output() tenderCreate = new EventEmitter<TenderInterface>();

    constructor(
        private tenderService: TenderService,
        private toastrService: ToastrService
    ) {
    }

    ngOnInit(): void {
        this.validatingForm = new FormGroup({
            formTitle: new FormControl('', Validators.required),
            formDescription: new FormControl('', Validators.required)
        });
    }

    get formTitle() {
        return this.validatingForm.get('formTitle');
    }

    get formDescription() {
        return this.validatingForm.get('formDescription');
    }

    submit() {
        this.tenderService.create({title: this.formTitle.value, description: this.formDescription.value}).subscribe((data) => {
            this.toastrService.success('Tender created successfully!');
            this.tender = data.data;
            this.tenderCreate.emit(this.tender);
            this.frame.hide();
            this.validatingForm.reset();
        }, err => {
            this.toastrService.error('Something went wrong');
        });
    }
}
