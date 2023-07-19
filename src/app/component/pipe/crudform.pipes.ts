import {Pipe, PipeTransform,  Renderer2 } from "@angular/core";
import {DatePipe} from "@angular/common";
import {DomSanitizer, SafeHtml} from "@angular/platform-browser";

// import linkifyStr from 'linkifyjs/string';

const datepipe: DatePipe = new DatePipe('en-US')

let cellTypes = {
    id:  '_num',
    ext_id: '_num',
    company_name: '_editable',
    date_start: 'date',
    _s: '_string',
    date_end: 'picker',
    site: '_link',
    "Действия": 'action',
}

console.log("@@ cellTypes", cellTypes['id'])


@Pipe({ name: 'bycolumn' })
export class ByColumnPipe implements PipeTransform {

    constructor(
        private sanitize: DomSanitizer,
        private renderer : Renderer2) {}

    transform(
        value: string,
        column_name: string = '_s',
        maxLength: number = 10,
        ...args:string[]
    ): string {



        const _type = column_name in cellTypes ? cellTypes[column_name as keyof typeof cellTypes] : '_string';

        switch(_type) {
            case '_num':
                return value
            case '_link':
                return  value ? `<a href='${value}'>${value}</a>` : ''
            case 'action':
                    return `<button mat-raised-button type="button" [mat-dialog-close]="false">Cancel</button>`
            case '_editable':
                return value
            case 'date':
                let formattedDate = datepipe.transform(value,'dd-MM-YYYY');
                return <string>formattedDate;

            default: value
        }

        if (value === null || value === undefined) value = '';

        if (value.length > maxLength)
            return `${value.substring(0, maxLength)}...`;
        else return value;
    }

    // textToLinks(value: string): SafeHtml {
    //     const linkRegex = /https?:\/\/\S+/gm;
    //     return this.sanitize
    //         .bypassSecurityTrustHtml(value.replace(linkRegex, (m, $1) => `<a href="${m}">${m}</a>`));
    // }
}



@Pipe({ name: 'cutText' })
export class CutTextPipe implements PipeTransform {
    transform(
        value: string,
        maxLength: number = 10,
        format: string = '_',
    ): string {
        if (value === null || value === undefined) value = '';

        if (value.length > maxLength)
            return `${value.substring(0, maxLength)}...`;
        else return value + format;
    }
}