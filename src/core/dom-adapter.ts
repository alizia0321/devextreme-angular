import { Inject, Injectable, VERSION, Renderer2, RendererFactory2 } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import * as domAdapter from 'devextreme/core/dom_adapter';
import * as readyCallbacks from 'devextreme/core/utils/ready_callbacks';

const NG_VERSION_SUPPORTING_SSR = '5';

@Injectable()
export class NgDomAdapter {

    constructor(@Inject(DOCUMENT) document: any, rendererFactory: RendererFactory2) {
        if (VERSION.major < NG_VERSION_SUPPORTING_SSR) {
            return;
        }

        var renderer2: Renderer2 = rendererFactory.createRenderer(null, null);

        domAdapter.inject({
            _document: document,

            isElementNode: function(element) {
                return element && element.nodeType === 1;
            },

            isTextNode: function(element) {
                return element && element.nodeType === 3;
            },

            isDocument: function(element) {
                return element && element.nodeType === 9;
            },

            listen: function() {
                var args = Array.prototype.slice.call(arguments, 0);
                if(args[0].window === args[0]) {
                  args[0] = "window";
                }
                return renderer2.listen.apply(renderer2, args);
            }
        });

        readyCallbacks.fire();
    }
}
