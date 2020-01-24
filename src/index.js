// constants
import { WIDGETS_NS } from '@/store/constants';

// global styles
import '@/styles/default.css';

// components
export { default as HelloWorld } from '@/components/HelloWorld.vue';
export { default as Metadata } from '@/components/Metadata.vue';
export { default as Paginator } from '@/components/Paginator.vue';
export { default as TextSize } from '@/components/TextSize.vue';
export { default as TextWidth } from '@/components/TextWidth.vue';
export { default as Icon } from '@/components/Icon.vue';

// widgets
export { default as TextSizeWidget } from '@/widgets/TextSizeWidget.vue';
// eslint-disable-next-line max-len
export { default as PassageAncestorsWidget } from '@/widgets/PassageAncestorsWidget.vue';
// eslint-disable-next-line max-len
export { default as PassageChildrenWidget } from '@/widgets/PassageChildrenWidget.vue';
// eslint-disable-next-line max-len
export { default as PassageReferenceWidget } from '@/widgets/PassageReferenceWidget.vue';
export { default as TextWidthWidget } from '@/widgets/TextWidthWidget.vue';

// store
export { default as scaifeWidgets } from '@/store';

// utils
export { default as URN } from '@/utils/URN';
export default WIDGETS_NS;
