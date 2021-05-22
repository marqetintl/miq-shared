import "./scss/main.scss";

// FORM
export { default as Form } from "./form/";
export { default as FormCtx, FormProvider } from "./form/FormCtx";
export { default as useForm } from "./form/useForm";

// COMPONENTS
export { Portal } from "./components/Modal";
export { default as Modal } from "./components/Modal";
export { default as Calendar } from "./calendar/";

// INPUTS
export { default as TextareaX } from "./components/inputs/TextareaX";

// BUTTONS
export { IconButton, IconNavLink } from "./components/buttons";

// UTILS

export { HTTP } from "./utils";
export { IS_DEV, DOMAIN } from "./utils";
export { formatDate, formatDateToStr, formatTime } from "./utils";
export { addForwardSlash, isRequired, getClassName } from "./utils";

// CONTEXTS

export { SharedDataCtx, SharedDataProvider } from "./contexts";
