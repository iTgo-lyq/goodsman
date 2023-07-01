"use client";
import {
  DetailedHTMLProps,
  HTMLAttributes,
  KeyboardEvent,
  FocusEvent,
  useCallback,
} from "react";
import { useRouter } from "next/navigation";

import Input from "@arco-design/web-react/es/Input";

import style from "./search.module.css";

export default function Search(
  props: DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>
) {
  const router = useRouter();

  const handleUpdateSearchQuery = useCallback(
    (e: KeyboardEvent<HTMLInputElement> & FocusEvent<HTMLInputElement>) => {
      if (e.key && e.key !== "Enter") return;
      const searchParams = new URLSearchParams(window.location.search);
      searchParams.set("search", e.currentTarget.value);
      if (window.location.search === "?" + searchParams.toString()) return;
      router.push(
        window.location.pathname +
          window.location.hash +
          "?" +
          searchParams.toString()
      );
    },
    [router]
  );

  return (
    <div {...props}>
      <Input.Search
        className={style.search}
        placeholder={"搜索"}
        onBlur={handleUpdateSearchQuery}
        onKeyUp={handleUpdateSearchQuery}
      />
    </div>
  );
}
