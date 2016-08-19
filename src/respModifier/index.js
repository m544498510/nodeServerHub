/**
 *
 * @author :    Mei XinLin
 * @version :   1.0
 */
'use strict';

import respModifier from 'resp-modifier';

import rewriteLinks from './rewriteLinksRule';

export default respModifier({
    rules: [rewriteLinks]
});