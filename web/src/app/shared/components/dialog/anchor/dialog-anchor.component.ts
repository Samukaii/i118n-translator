import { output } from '@angular/core';
import { Component, viewChild, ViewContainerRef } from '@angular/core';

@Component({
    selector: 'app-dialog-host',
    template: `
        <div class="backdrop" (click)="backdropClick.emit()"></div>
        <div class="container">
            <ng-template #container></ng-template>
        </div>
    `,
    styles: `
        :host {
            position: absolute;
            width: 100%;
            height: 100%;
            top: 0;
            display: flex;
            justify-content: center;
            align-items: center;
        }

        .backdrop {
            background-color: #0005;
            width: 100%;
            height: 100%;
            position: absolute;
            top: 0;
        }

        .container {
            border-radius: 5px;
            padding: 1rem;
            width: 100%;
            height: 100%;
            max-width: 1200px;
            max-height: 90vh;
            background-color: white;
            overflow: hidden;
            z-index: 1;
        }
    `,
    standalone: true,
})
export class DialogAnchorComponent {
    backdropClick = output();
    container = viewChild.required('container', { read: ViewContainerRef });
}
