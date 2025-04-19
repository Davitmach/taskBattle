'use client'

import { PageConfig } from "../types/pages";
import { useRouter } from "next/navigation";

export const useCustomRouter = () => {

  const { push } = useRouter();
  const Router = (url: PageConfig, link?: { id: number }) => {
    if(url !== '/user/:id' && link ) return
    if (url === '/user/:id') {
      if (link) {
        push(url.replace(':id', link.id.toString()));
      }
    } else {
      push(url);
    }
  };

  return Router;
};
