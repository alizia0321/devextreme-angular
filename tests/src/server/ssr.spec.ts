/* tslint:disable:component-selector */

import {
    Component
} from '@angular/core';

import {
    TestBed
} from '@angular/core/testing';

import {
    DxButtonModule,
    DxPopupModule
} from '../../../dist';

import * as windowUtils from 'devextreme/core/utils/window'

@Component({
    selector: 'test-container-component',
    template: ''
})
class TestContainerComponent {
}

describe('Universal', () => {

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [TestContainerComponent],
            imports: [DxButtonModule, DxPopupModule]
        });

        windowUtils.hasWindow = function() {
            return false;
        };

        var windowMock = {};
        windowMock['window'] = windowMock;

        windowUtils.getWindow = function() {
            return windowMock;
        };
    });

    // spec
    it('should render button', () => {
        TestBed.overrideComponent(TestContainerComponent, {
            set: {
                template: `<dx-button></dx-button>`
            }
        });

        let fixture = TestBed.createComponent(TestContainerComponent);
        expect(fixture.detectChanges.bind(fixture)).not.toThrow();
    });

    it('should render popup', () => {
        TestBed.overrideComponent(TestContainerComponent, {
            set: {
                template: `<dx-popup></dx-popup>`
            }
        });

        let fixture = TestBed.createComponent(TestContainerComponent);
        expect(fixture.detectChanges.bind(fixture)).not.toThrow();
    });
});
