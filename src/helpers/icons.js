import { Library, library } from "@fortawesome/fontawesome-svg-core";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrash, faSignOutAlt, faEdit, faSpinner, faPlusSquare} from "@fortawesome/free-solid-svg-icons";


const Icons = () => {
return library.add(faTrash, faSignOutAlt, faEdit, faSpinner, faPlusSquare);
}

export default Icons;