import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {TenderInterface} from '../../core/models/tender.model';
import {TenderService} from '../tender.service';
import {ToastrService} from 'ngx-toastr';
import {trigger, style, animate, transition} from '@angular/animations';

@Component({
    selector: 'app-tender',
    animations: [
        trigger(
            'fadeInOut', [
                transition(':enter', [
                    style({opacity: 0}),
                    animate('500ms', style({opacity: 1}))
                ]),
                transition(':leave', [
                    style({transform: 'translateX(0)', opacity: 1}),
                    animate('500ms', style({transform: 'translateX(100%)', opacity: 0}))
                ])
            ]
        )
    ],
    templateUrl: './tender.component.html',
    styleUrls: ['./tender.component.css']
})

export class TenderComponent implements OnInit {
    @Input() tender: TenderInterface;
    @Output() tenderRemove = new EventEmitter<number>();
    visible = true;

    constructor(
        private tenderService: TenderService,
        private toastrService: ToastrService
    ) {
    }

    ngOnInit(): void {
    }

    remove() {
        this.tenderService.delete(this.tender.id).subscribe(() => {
            this.visible = false;
            this.toastrService.success('Tender removed successfully!');
            this.tenderRemove.emit(this.tender.id);
        }, err => {
            this.toastrService.error('Something went wrong');
        });
    }
}
