import { input, output } from '@angular/core';
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
            height: var(--height);
            max-width: 1200px;
            max-height: 90vh;
            background-color: white;
            overflow: hidden;
            display: flex;
            flex-direction: column;
            z-index: 20;
        }
    `,
    standalone: true,
	host: {
		'[style.--height]': 'height()'
	}
})
export class DialogAnchorComponent {
    backdropClick = output();
	height = input('100%');
	width = input('100%');
	maxHeight = input('90vh');

    container = viewChild.required('container', { read: ViewContainerRef });
}
