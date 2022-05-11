import canUseDom from "@/hooks/utils/canUseDom";

export default function isDocumentVisible(): boolean {
  if (canUseDom()) {
    return document.visibilityState !== 'hidden';
  }
  return true;
}
