import { AUTH_RETURN_PARAM, AUTH_RETURN_STORAGE_KEY } from "@/lib/pending-auth-return";

/** Runs before React paint so auth-return handling can latch without a flash. */
const AUTH_RETURN_INIT_SCRIPT = `(function(){try{var p=new URLSearchParams(window.location.search);if(p.get(${JSON.stringify(AUTH_RETURN_PARAM)})==="1"){sessionStorage.setItem(${JSON.stringify(AUTH_RETURN_STORAGE_KEY)},"1");document.documentElement.setAttribute("data-auth-return","1");}}catch(e){}})();`;

export function AuthReturnInitScript() {
  return <script dangerouslySetInnerHTML={{ __html: AUTH_RETURN_INIT_SCRIPT }} />;
}
