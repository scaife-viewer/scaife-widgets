// constants
import { WIDGETS_NS } from '@/store/constants';

// components
export { default as HelloWorld } from '@/components/HelloWorld.vue';
export { default as Icon } from '@/components/Icon.vue';
export { default as Metadata } from '@/components/Metadata.vue';
export { default as NewAlexandria } from '@/components/NewAlexandria.vue';
export { default as Paginator } from '@/components/Paginator.vue';
export { default as TextSize } from '@/components/TextSize.vue';
export { default as TextWidth } from '@/components/TextWidth.vue';
export { default as TOC } from '@/components/TOC.vue';
export { default as WordList } from '@/components/WordList.vue';
export { default as Lookahead } from '@/components/Lookahead.vue';

// widgets
export { default as LibraryWidget } from '@/widgets/LibraryWidget.vue';
export { default as MetadataWidget } from '@/widgets/MetadataWidget.vue';
// eslint-disable-next-line max-len
export { default as NewAlexandriaWidget } from '@/widgets/NewAlexandriaWidget.vue';
// eslint-disable-next-line max-len
export { default as PassageAncestorsWidget } from '@/widgets/PassageAncestorsWidget.vue';
// eslint-disable-next-line max-len
export { default as PassageChildrenWidget } from '@/widgets/PassageChildrenWidget.vue';
// eslint-disable-next-line max-len
export { default as PassageReferenceWidget } from '@/widgets/PassageReferenceWidget.vue';
export { default as TextSizeWidget } from '@/widgets/TextSizeWidget.vue';
export { default as TextWidthWidget } from '@/widgets/TextWidthWidget.vue';
export { default as TOCWidget } from '@/widgets/TOCWidget.vue';
export { default as TOCViewWidget } from '@/widgets/TOCViewWidget.vue';
export { default as WordListWidget } from '@/widgets/WordListWidget.vue';

// store
export { default as scaifeWidgets } from '@/store';

// utils
export { default as URN } from '@/utils/URN';
export default WIDGETS_NS;

// endpoints
export { default as EndpointsPlugin } from '@/endpoints/plugin';

// reducers
export { default as tocReducer } from '@/utils/reducers';
