// ❌ remove these from _app.js (top-level):
import { useEffect, useRef } from "react";
import ModalService from "@/utils/ModalService";
const [toast, setToast] = useState(null);
const showToast = (message = '', type = "success") => {
    setToast({ message, type });
};
