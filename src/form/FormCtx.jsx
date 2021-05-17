import { createContext } from "react";

const FormCtx = createContext(null);

export const FormProvider = FormCtx.Provider;

export default FormCtx;
