import {AiFillExclamationCircle} from "react-icons/ai"
import { CiCircleCheck } from "react-icons/ci";
export function formatDate(date) {
    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'long' });
    const year = date.getFullYear();
    const suffix = getDaySuffix(day);
  
    return `${day}${suffix} ${month}, ${year}`;
  }
function getDaySuffix(day) {
    switch (day) {
      case 1:
      case 21:
      case 31:
        return 'st';
      case 2:
      case 22:
        return 'nd';
      case 3:
      case 23:
        return 'rd';
      default:
        return 'th';
    }
  }

 export const CustomToastIcon = () => <AiFillExclamationCircle style={{ color: 'white' }} />;
export const SuccessToastIcon=()=><CiCircleCheck style={{ color: 'white' ,fontSize:"25px"}} />