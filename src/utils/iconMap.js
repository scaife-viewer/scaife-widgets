import { faChevronDown } from '@fortawesome/free-solid-svg-icons/faChevronDown';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons/faChevronLeft';
// eslint-disable-next-line max-len
import { faChevronRight } from '@fortawesome/free-solid-svg-icons/faChevronRight';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons/faArrowLeft';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons/faArrowRight';
import { faCog } from '@fortawesome/free-solid-svg-icons/faCog';
import { faPlusSquare } from '@fortawesome/free-solid-svg-icons/faPlusSquare';
import { faCheckSquare } from '@fortawesome/free-solid-svg-icons/faCheckSquare';
import { faSquare } from '@fortawesome/free-solid-svg-icons/faSquare';
import { faMinusCircle } from '@fortawesome/free-solid-svg-icons/faMinusCircle';
import { faExpand } from '@fortawesome/free-solid-svg-icons/faExpand';
import { faCompress } from '@fortawesome/free-solid-svg-icons/faCompress';

const iconMap = [
  faChevronDown,
  faChevronLeft,
  faChevronRight,
  faArrowLeft,
  faArrowRight,
  faCog,
  faPlusSquare,
  faCheckSquare,
  faSquare,
  faMinusCircle,
  faExpand,
  faCompress,
].reduce((map, obj) => {
  map[obj.iconName] = obj;
  return map;
}, {});

export default iconMap;
